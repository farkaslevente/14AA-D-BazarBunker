using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using MobilApp_Szakdolgozat.Models;
using MobilApp_Szakdolgozat.Services;
using MvvmHelpers;
using System.Text;
using MobilApp_Szakdolgozat.Views;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;
using System.Windows.Input;
using Microsoft.Maui.Graphics;

namespace MobilApp_Szakdolgozat.ViewModels
{
    public partial class SearchViewModel : BindableObject
    {
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
        public ObservableCollection<SettlementModel> settlements { get; set; }
        public SettlementModel selectedSettlement { get; set; }     
        public bool SettlementEnabled { get; set; }
        public ICommand CountySelectionChangeCommand { get; set; }
        public ICommand searchCommand { get; set; }

        public ObservableCollection<AdsModel> allAds { get; set; }
        public ObservableCollection<AdsModel> filteredAds { get; set; }
        public AdsModel advertisement { get; set; }
        //Search params
        public string searchTitle { get; set; }
        public string searchCounty { get; set; }
        public string searchSettlement { get; set; }
        public string searchCategory { get; set; }
        public int searchMinPrice { get; set; }
        public int searchMaxPrice { get; set; }        


        public SearchViewModel()
        {
            counties = new ObservableCollection<CountyModel>();
            settlements = new ObservableCollection<SettlementModel>();
            allAds = new ObservableCollection<AdsModel>();
            getAllAds();
            getCounties();            
            searchTitle = null;
            searchCounty = null;
            searchSettlement = null;
            searchCategory = null;
            searchMinPrice = 0;
            searchMaxPrice = 0;
            selectedCounty = null;
            selectedSettlement = null;
            SettlementEnabled = false;
            CountySelectionChangeCommand = new Command(async () =>
            {
                if (selectedCounty == null) return;
                SettlementEnabled = true;
            });

            searchCommand = new Command(async () =>
            {
                if (searchTitle == null)
                {
                    if (searchCounty == null)
                    {
                        if (searchSettlement == null)
                        {
                            if (searchCategory == null)
                            {
                                if (searchMinPrice == 0)
                                {
                                    if (searchMaxPrice == 0)
                                    {
                                        filteredAds = allAds;
                                        Shell.Current.GoToAsync(nameof(AdsPage));
                                    }
                                    else 
                                    {
                                        var filteredList = allAds.Where(ad => ad.nev.Contains(searchTitle) && 
                                                                    ad.varmegyeId == selectedCounty.id && 
                                                                    ad.telepules == selectedSettlement.nev.ToString() && 
                                                                    ad.kategoria.Contains(searchCategory) && 
                                                                    ad.ar >= searchMinPrice && ad.ar <= searchMaxPrice
                                                                    ).ToList();
                                        filteredAds = new ObservableCollection<AdsModel>(filteredList);
                                        Shell.Current.GoToAsync(nameof(AdsPage));
                                    }
                                }
                                else
                                {
                                    var filteredList = allAds.Where(ad => ad.nev.Contains(searchTitle) &&
                                                                    ad.varmegyeId == selectedCounty.id &&
                                                                    ad.telepules == selectedSettlement.nev.ToString() &&
                                                                    ad.kategoria.Contains(searchCategory) &&
                                                                    ad.ar >= searchMinPrice).ToList();
                                    filteredAds = new ObservableCollection<AdsModel>(filteredList);
                                    Shell.Current.GoToAsync(nameof(AdsPage));
                                }
                            }
                            else
                            {
                                var filteredList = allAds.Where(ad => ad.nev.Contains(searchTitle) &&
                                                                    ad.varmegyeId == selectedCounty.id &&
                                                                    ad.telepules == selectedSettlement.nev.ToString() &&
                                                                    ad.kategoria.Contains(searchCategory)).ToList();
                                filteredAds = new ObservableCollection<AdsModel>(filteredList);
                                Shell.Current.GoToAsync(nameof(AdsPage));
                            }
                        }
                        else
                        {
                            var filteredList = allAds.Where(ad => ad.nev.Contains(searchTitle) &&
                                                                    ad.varmegyeId == selectedCounty.id &&
                                                                    ad.telepules == selectedSettlement.nev.ToString()).ToList();
                            filteredAds = new ObservableCollection<AdsModel>(filteredList);
                            Shell.Current.GoToAsync(nameof(AdsPage));
                        }
                    }
                    else
                    {
                        var filteredList = allAds.Where(ad => ad.nev.Contains(searchTitle) &&
                                                              ad.varmegyeId== selectedCounty.id).ToList();
                        filteredAds = new ObservableCollection<AdsModel>(filteredList);
                        Shell.Current.GoToAsync(nameof(AdsPage));
                    }
                }
                else
                {
                    var filteredList = allAds.Where(ad => ad.nev.Contains(searchTitle)).ToList();
                    filteredAds = new ObservableCollection<AdsModel>(filteredList);
                    Shell.Current.GoToAsync(nameof(AdsPage));
                }
            });
        }


        private async void getAllAds()
        {
            IEnumerable<AdsModel> adList = await DataService.getAds();
            adList.ToList().ForEach(ad => allAds.Add(ad));
        }
        private async void getSettlements()
        {
            IEnumerable<SettlementModel> settlementList = await DataService.getSettlements();
            settlementList.ToList().ForEach(settlement => {
                if (settlement.varmegyeId == selectedCounty.id)
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
