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
        public bool SettlementEnabled { get; set; }
        public ICommand CountySelectionChangeCommand { get; set; }
        
        public RegisterModel regModel { get; set; }
            public string regName { get; set; }
            public string regEmail { get; set; }
            public string regPassword { get; set; }
            public string regConfirmPwd { get; set; }
            public string regLocation { get; set; }
            public string error { get; set; }          

            private RegisterModel _errorMessage;

            public RegisterModel errorMessage
            {
                get { return _errorMessage; }
                set { _errorMessage = value; OnPropertyChanged(); }
            }


            public ICommand registerCommand { get; set; }

            public RegisterViewModel()
            {
            counties = new ObservableCollection<CountyModel>();
            settlements = new ObservableCollection<SettlementModel>();           
            getCounties();        
            SettlementEnabled = false;
            CountySelectionChangeCommand = new Command(async () =>
            {
                if (selectedCounty == null) return;
                SettlementEnabled = true;
            });


            registerCommand = new Command(async () => {    
                    if(regName != null)
                    {
                        if (regEmail != null && regEmail.Contains('@'))
                        {
                            if (regPassword == regConfirmPwd)
                            {
                                error = "";
                                regModel = new RegisterModel
                                {
                                    name = regName,
                                    email = regEmail,
                                    password = regPassword,
                                    location = selectedSettlement.nev
                                };
                                errorMessage = await DataService.register(regModel);
                                if (errorMessage.email == null)
                                {
                                    await Shell.Current.GoToAsync(nameof(MainPage));
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
    }
}



