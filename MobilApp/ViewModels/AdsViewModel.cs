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
    public partial class AdsViewModel: BindableObject
    {
        public ObservableCollection<AdsModel> advertisements { get; set; }        
        public AdsModel advertisement { get; set; }
        public AdsViewModel(SearchViewModel vm)
        {
            advertisements = new ObservableCollection<AdsModel>();
            vm = new SearchViewModel();
            advertisements = vm.filteredAds;           
            
        }
        //private async Task getAllAds()
        //{
        //    IEnumerable<AdsModel> list = await DataService.getAds();
        //    list.ToList().ForEach(p => advertisements.Add(p));
        //}
    }
}
