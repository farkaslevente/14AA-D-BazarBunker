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
    public partial class NewAdViewModel : BindableObject
    {        
        public string adTitle { get; set; }
        public string adCategory { get; set; }
        public int adPrice { get; set; }
        public string adDescription { get; set; }        
        public string adError { get; set; }
        public int adCountyId { get; set; }
        public int adOwnerId { get; set; }
        

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
                    adCountyId = value.id;
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
        public ObservableCollection<SettlementModel> settlements { get; set; }
        public SettlementModel selectedSettlement { get; set; }
        public bool SettlementEnabled { get; set; }
        public ICommand CountySelectionChangeCommand { get; set; }
        public ICommand CategorySelectionChangeCommand { get; set; }
        public ICommand uploadCommand { get; set; }
        public NewAdViewModel()
        {        
            counties = new ObservableCollection<CountyModel>();
            settlements = new ObservableCollection<SettlementModel>();
            categories = new ObservableCollection<string>();
            getCategories();
            getCounties();
            //adTitle = "";
            //adDescription = "";
            //adCategory = "";
            //adPrice = 0;
            //adCountyId = 0;
            //adOwnerId = 0;
            SettlementEnabled = false;            
            CountySelectionChangeCommand = new Command(async () =>
            {
                if (selectedCounty == null) return;
                SettlementEnabled = true;
            });

            CountySelectionChangeCommand = new Command(async () =>
            {
                if (selectedCounty == null) return;                
            });

            uploadCommand = new Command(async () =>
            {
                adOwnerId = Int32.Parse(await SecureStorage.GetAsync("userId"));
                adCategory = selectedCategory;
                if (adTitle != null)
                {
                    if (adDescription != null)
                    {
                        if (adCategory != null)
                        {
                            if (adPrice != 0)
                            {
                                if (adCountyId != 0)
                                {
                                    if (selectedSettlement.nev != null)
                                    {
                                        if (adOwnerId != 0)
                                        {
                                            await DataService.newAdvertisementUpload(
                                                    adTitle,
                                                    adDescription,
                                                    adCategory,
                                                    adPrice,
                                                    adCountyId,
                                                    selectedSettlement.nev,
                                                    adOwnerId
                                                    );
                                            if (await SecureStorage.GetAsync("uploaded") == true.ToString())
                                            {
                                                await Shell.Current.GoToAsync(nameof(MyAdsPage));
                                            }
                                        }
                                    }
                                    else
                                    {
                                        adError = "Adja meg a hirdetésének helyszínét!";
                                        OnPropertyChanged(nameof(adError));
                                    }
                                }
                                else
                                {
                                    adError = "Adja meg a hirdetésének helyszínét!";
                                    OnPropertyChanged(nameof(adError));
                                }
                            }
                            else
                            {
                                adError = "Adja meg a hirdetésének árát!";
                                OnPropertyChanged(nameof(adError));
                            }
                        }
                        else
                        {
                            adError = "Adja meg a hirdetésének kategóriáját!";
                            OnPropertyChanged(nameof(adError));
                        }
                    }
                    else
                    {
                        adError = "Adja meg a hirdetésének leírását!";
                        OnPropertyChanged(nameof(adError));
                    }
                }
                else
                {
                    adError = "Adja meg a hirdetésének nevét!";
                    OnPropertyChanged(nameof(adError));
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

        private void getCategories()
        {
            categories.Clear();
            categories.Add("Általános iskolásoknak");
            categories.Add("Középiskolásoknak");
            categories.Add("Egyetemistáknak");
            categories.Add("Kötelező olvasmány");
            categories.Add("Kellékek");
            categories.Add("Írószerek");
            categories.Add("Kiegészítők");

        }
    }
}

