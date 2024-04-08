using Microsoft.IdentityModel.Tokens;
using MobilApp_Szakdolgozat.Models;
using MobilApp_Szakdolgozat.Services;
using MobilApp_Szakdolgozat.Views;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;

namespace MobilApp_Szakdolgozat.ViewModels
{
    public class RegisterViewModel : BindableObject
    {
        public ObservableCollection<CountyModel> counties { get; set; }
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
        public ObservableCollection<SettlementModel> settlements { get; set; }
        public SettlementModel selectedSettlement { get; set; }
        public ObservableCollection<string> contractors { get; set; }
        private string _selectedContractor;
        public string selectedContractor
        {
            get => _selectedContractor;
            set
            {
                if (_selectedContractor != value)
                {
                    _selectedContractor = value;
                }
            }
        }
        public bool SettlementEnabled { get; set; }
        public ICommand CountySelectionChangeCommand { get; set; }

        public RegisterModel regModel { get; set; }
        public string regName { get; set; }
        public string regEmail { get; set; }
        public string resetEmail { get; set; }
        public string resetCode { get; set; }
        public string regPassword { get; set; }
        public string regConfirmPwd { get; set; }
        public string regLocation { get; set; }
        public string regMobileNumber { get; set; }
        public bool resetVis { get; set; }
        public string resetPwd { get; set; }
        public string error { get; set; }          

        private RegisterModel _errorMessage;

        public RegisterModel errorMessage
        {
            get { return _errorMessage; }
            set { _errorMessage = value; OnPropertyChanged(); }
        }


        public ICommand registerCommand { get; set; }
        public ICommand resetPwdCommand { get; set; }
        public ICommand resetPwdCodeCommand { get; set; }
        public ICommand resetPwdFinalCommand { get; set; }

        public RegisterViewModel()
            {
            counties = new ObservableCollection<CountyModel>();
            settlements = new ObservableCollection<SettlementModel>();
            contractors = new ObservableCollection<string>();
            getContractors();
            getCounties();        
            SettlementEnabled = false;
            resetVis = false;
            CountySelectionChangeCommand = new Command(async () =>
            {
                if (selectedCounty == null) return;
                SettlementEnabled = true;
            });
            resetPwdCommand = new Command(async () =>
            {
                await DataService.resetPwd(resetEmail);
                await Shell.Current.DisplayAlert("Ellenőrizze postaládáját", "A jelszó visszaállításhoz szükséges információkat elküldtük a megadott emailcímre", "Rendben");
                await Shell.Current.GoToAsync(nameof(ResetPwdCodePage));
            });
            resetPwdCodeCommand = new Command(async () =>
            {
                await DataService.resetPwdCode(resetCode);
                await Shell.Current.GoToAsync(nameof(ResetPwdFinalStagePage));

            });
            resetPwdFinalCommand = new Command(async () =>
            {
                await DataService.resetPwdFinal(resetPwd);
                await Shell.Current.GoToAsync(nameof(LoginPage));
            });

            registerCommand = new Command(async () => {    
                    if(regName != null)
                    {
                        if (regEmail != null && regEmail.Contains('@'))
                        {
                            if (regPassword == regConfirmPwd)
                            {
                                error = "";
                            if (!regMobileNumber.IsNullOrEmpty())
                            {
                                regModel = new RegisterModel
                                {
                                    name = regName,
                                    email = regEmail,
                                    password = regPassword,
                                    location = selectedSettlement.nev,
                                    phone = $"06 {selectedContractor} {regMobileNumber}"
                                };
                                errorMessage = await DataService.register(regModel);
                                if (errorMessage.email == null)
                                {
                                    await Shell.Current.GoToAsync(nameof(MainPage));
                                }
                            }
                            else {
                                error = "Nem egyeznek jelszavai!";
                            }
                                
                            }
                            else
                            {
                                error = "Nem egyeznek jelszavai!";
                            }
                        }
                        else
                        {
                            error = "Adjon meg érvényes email-címet!";
                        }
                    }
                    else
                    {
                        error = "Adjon meg egy felhasználónevet!";
                    }                                        
                });
            }
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
        private void getContractors()
        {
            contractors.Clear();
            contractors.Add("20");
            contractors.Add("30");
            contractors.Add("40");
            contractors.Add("70");
        }
    }
}



