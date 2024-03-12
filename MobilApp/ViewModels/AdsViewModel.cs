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
    public class AdsViewModel: BindableObject
    {
        public ObservableCollection<AdsModel> advertisements { get; set; }
        public AdsModel advertisement { get; set; }
        public AdsViewModel()
        {
            advertisements = new ObservableCollection<AdsModel>();
            getAllAds();
            
        }
        private async Task getAllAds()
        {
            IEnumerable<AdsModel> list = await DataService.getAds();
            list.ToList().ForEach(p => advertisements.Add(p));
        }
    }
}
