using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Windows.Input;
using Microsoft.IdentityModel.Tokens;
using MobilApp_Szakdolgozat.Models;
using MobilApp_Szakdolgozat.Services;
using MobilApp_Szakdolgozat.Views;

namespace MobilApp_Szakdolgozat.ViewModels
{
    public class ProfilePageViewModel: BindableObject        
    {
        public ICommand profileUpdateCommand { get; set; }
        public ObservableCollection<ProfileModel> profiles { get; set; }
        public ProfileModel profile { get; set; }       
        public string newUserName { get; set; }
        public string newUserEmail { get; set; }
        public string newUserLocation { get; set; }
        public string newUserMobileNumber { get; set; }
        public string updateError { get; set; }
        private bool _editVisibility;

        public bool editVisibility
        {
            get => _editVisibility;
            set
            {
                if (_editVisibility != value)
                {
                    _editVisibility = value;
                    OnPropertyChanged(nameof(editVisibility));
                }
            }
        }
        private bool _editVisibilityInvers;

        public bool editVisibilityInvers
        {
            get => _editVisibilityInvers;
            set
            {
                if (_editVisibilityInvers != value)
                {
                    _editVisibilityInvers = value;
                    OnPropertyChanged(nameof(editVisibilityInvers));
                }
            }
        }        
        public bool _profileChangeVisibility { get; set; }
        public bool profileChangeVisibility
        {
            get => _profileChangeVisibility;
            set
            {
                if (_profileChangeVisibility != value)
                {
                    _profileChangeVisibility = value;
                    OnPropertyChanged(nameof(profileChangeVisibility));
                }
            }
        }
        public ObservableCollection<CountyModel> counties { get; set; }

        //public CountyModel selectedCounty { get; set; }
        private CountyModel _selectedCounty;
        public CountyModel selectedCounty
        {
            get => _selectedCounty;
            set
            {
                if (_selectedCounty != value)
                {
                    _selectedCounty = value;

                    SettlementEnabled = true;
                    getSettlements();
                    OnPropertyChanged(nameof(SettlementEnabled));
                }
            }
        }
        public ObservableCollection<string> categories { get; set; }
        private string _selectedCategory;
        public string selectedCategory
        {
            get => _selectedCategory;
            set
            {
                if (_selectedCategory != value)
                {
                    _selectedCategory = value;
                }
            }
        }
        public ObservableCollection<string> contractors { get; set; }
        private string _selectedContractor;
        public string selectedContractor
        {
            get => _selectedCategory;
            set
            {
                if (_selectedContractor != value)
                {
                    _selectedContractor = value;
                }
            }
        }
        public ObservableCollection<SettlementModel> settlements { get; set; }
        public SettlementModel selectedSettlement { get; set; }
        public bool SettlementEnabled { get; set; }
        public ICommand CountySelectionChangeCommand { get; set; }
        public ICommand profileEditCommand { get; set; }
        public ProfilePageViewModel()
        {
            profiles = new ObservableCollection<ProfileModel>();
            settlements = new ObservableCollection<SettlementModel>();
            counties = new ObservableCollection<CountyModel>();
            contractors = new ObservableCollection<string>();
            getCounties();
            getContractors();
            a();
            SettlementEnabled = false;
            editVisibility = false;
            editVisibilityInvers = !editVisibility;
            CountySelectionChangeCommand = new Command(async () =>
            {
                if (selectedCounty == null) return;
                SettlementEnabled = true;
            });
            profileEditCommand = new Command(async () =>
            {
                editVisibility = true;
                editVisibilityInvers = !editVisibility;
            });

            profileUpdateCommand = new Command(async () =>
            {
                newUserLocation = selectedSettlement.nev;
                if (!newUserName.IsNullOrEmpty())
                {
                    profile.nev = newUserName;

                    if (!newUserEmail.IsNullOrEmpty() && newUserEmail.Contains('@'))
                    {
                        profile.email = newUserEmail;
                        if (!newUserLocation.IsNullOrEmpty())
                        {
                            profile.hely = newUserLocation;
                            if (!newUserMobileNumber.IsNullOrEmpty())
                            {
                                profile.telefonszam = $"06 {selectedContractor} {newUserMobileNumber}";
                            }
                        }
                    }
                    else if (!newUserEmail.Contains('@'))
                    {
                        updateError = "Adjon meg egy érvényes email címet";
                    }
                }                           
                int UserId = Int32.Parse(await SecureStorage.GetAsync("userId"));
                string UserPic = await SecureStorage.GetAsync("userImage");
                string userFavorites = await SecureStorage.GetAsync("userFavs");
                int userRole = Int32.Parse(await SecureStorage.GetAsync("userRole"));                
                await DataService.profileUpdate(UserId, profile.nev, profile.email, profile.hely, UserPic, userRole, userFavorites, profile.telefonszam);
                await Shell.Current.GoToAsync(nameof(ProfilePage));
            });
        }

        private void getContractors()
        {
            contractors.Clear();
            contractors.Add("20");
            contractors.Add("30");
            contractors.Add("40");
            contractors.Add("70");
        }

        private async void a()
        {
            await GetProfileData();
        }

        private async Task GetProfileData()
        {
            string userName = await SecureStorage.GetAsync("userName");
            string userEmail = await SecureStorage.GetAsync("userEmail");
            string userImage = await SecureStorage.GetAsync("userImage");
            string tempUserId = await SecureStorage.GetAsync("userId");

            int userId;
            bool Success = int.TryParse(tempUserId, out userId);
            if (Success)
            {
                profile = new ProfileModel
                {
                    nev = userName,
                    email = userEmail,
                    pPic = userImage,
                    id = userId,
                    telefonszam = "",
                };
                OnPropertyChanged(nameof(profile));
            }
            

                 
        }
        public ICommand openUrlCommand =>
        new Command<string>(async (url) => await Launcher.OpenAsync(url));

        private async void getSettlements()
        {
            IEnumerable<SettlementModel> settlementList = await DataService.getSettlements();
            settlementList.ToList().ForEach(settlement => {
                if (settlement.varmegye == selectedCounty.nev)
                {
                    settlements.Add(settlement);
                }

            });
        }

        private async void getCounties()
        {
            IEnumerable<CountyModel> countyList = await DataService.getCounties();
            countyList.ToList().ForEach(county => counties.Add(county));
        }

    }
}
