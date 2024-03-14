using MobilApp_Szakdolgozat.Models;
using MobilApp_Szakdolgozat.Services;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;

namespace MobilApp_Szakdolgozat.ViewModels
{
    class MyAdsViewModel : BindableObject
    {
        public ObservableCollection<AdsModel> advertisements { get; set; }
        public ProfileModel advertisement { get; set; }
        public MyAdsViewModel()
        {
            advertisements = new ObservableCollection<AdsModel>();
            a();
        }

        private async void a()
        {
            await GetMyAds();
        }

        private async Task GetMyAds()
        {
            string UserId = await SecureStorage.GetAsync("userId");
          



        }
        public ICommand openUrlCommand =>
        new Command<string>(async (url) => await Launcher.OpenAsync(url));
        private async Task getAllAds()
        {
            IEnumerable<AdsModel> list = await DataService.getAds();
            list.ToList().ForEach(ad => advertisements.Add(ad));
        }
    }
}
