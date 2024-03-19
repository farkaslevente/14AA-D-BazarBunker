using MobilApp_Szakdolgozat.Models;
using MobilApp_Szakdolgozat.Services;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MobilApp_Szakdolgozat.ViewModels
{
    public partial class AdsViewModel: BindableObject, IQueryAttributable
    {
        public ObservableCollection<AdsModel> filteredAds { get; set; }        
        public AdsModel advertisement { get; set; }
        //public AdsViewModel(SearchViewModel vm)
        //{
        //    advertisements = new ObservableCollection<AdsModel>();
        //    vm = new SearchViewModel();
        //    advertisements = vm.filteredAds;           
            
        //}
        public void ApplyQueryAttributes(IDictionary<string, object> query)
        {
            filteredAds = query["filteredAds"] as ObservableCollection<AdsModel>;
            OnPropertyChanged(nameof(filteredAds));
        }
        //private async Task getAllAds()
        //{
        //    IEnumerable<AdsModel> list = await DataService.getAds();
        //    list.ToList().ForEach(p => advertisements.Add(p));
        //}
    }
}
