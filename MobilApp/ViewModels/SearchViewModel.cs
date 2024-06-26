﻿using CommunityToolkit.Mvvm.ComponentModel;
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
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Security.Cryptography.X509Certificates;
using CommunityToolkit.Maui.Core.Views;
using Microsoft.IdentityModel.Tokens;


namespace MobilApp_Szakdolgozat.ViewModels
{
    public partial class SearchViewModel : BindableObject
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
            categories = new ObservableCollection<string>();
            getAllAds();
            getCounties();
            getCategories();
            searchTitle = null;
            searchCounty = null;
            searchSettlement = null;
            searchCategory = null;
            searchMinPrice = 0;
            searchMaxPrice = 0;            
            SettlementEnabled = false;
            CountySelectionChangeCommand = new Command(async () =>
            {
                if (selectedCounty == null) return;
                SettlementEnabled = true;
            });

            searchCommand = new Command(async () =>
            {
                ;
                if (!MainPage.mainCategory.IsNullOrEmpty())
                {
                    selectedCategory = MainPage.mainCategory;
                }                       

                List<AdsModel> filteredList = new List<AdsModel>();
                if (string.IsNullOrEmpty(searchTitle) && string.IsNullOrEmpty(searchCategory)&& selectedCounty == null && selectedSettlement == null && searchMinPrice == 0 && searchMaxPrice == 10000000)
                {
                    filteredList = allAds.ToList();
                }

                if (searchMaxPrice == 0)
                {
                    searchMaxPrice = 10000000;
                }
                filteredList = allAds.Where(listing =>
                               (searchTitle == null || listing.nev.Contains(searchTitle, StringComparison.OrdinalIgnoreCase)) &&
                               (selectedCategory == null || listing.kategoria.Equals(selectedCategory, StringComparison.OrdinalIgnoreCase)) &&
                               (selectedCounty == null || listing.varmegyeId == selectedCounty.id) &&
                               (selectedSettlement == null || listing.telepules.Equals(selectedSettlement.nev, StringComparison.OrdinalIgnoreCase)) &&
                               ( listing.ar >= searchMinPrice) &&
                               (listing.ar <= searchMaxPrice)).ToList();
                MainPage.mainCategory = null;
                filteredAds = new ObservableCollection<AdsModel>(filteredList);
                await Shell.Current.GoToAsync(nameof(AdsPage),
                    new Dictionary<string, object> { { "filteredAds", filteredAds } });                
            });
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

        private async void getAllAds()
        {
            IEnumerable<AdsModel> adList = await DataService.getAds();
            adList.ToList().ForEach(advert => {
                string[] butcheredDate = advert.datum.Split(" ");
                advert.datum = $"{butcheredDate[3]}. {butcheredDate[1]}. {butcheredDate[2]}.";                
                allAds.Add(advert);
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
