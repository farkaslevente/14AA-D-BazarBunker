using MobilApp_Szakdolgozat.Models;
using MobilApp_Szakdolgozat.Services;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace MobilApp_Szakdolgozat.ViewModels
{
    public class FavoriteViewModel: BindableObject
    {
        public ObservableCollection<AdsModel> favoriteAds { get; set; }
        public string[] favIds { get; set; }
        public FavoriteViewModel()
        {
            startupC();
        }

        private async void startupC()
        {            
            int userId = int.Parse(await SecureStorage.GetAsync("userId"));
            string userEmail = await SecureStorage.GetAsync("userEmail");
            favIds = await DataService.getFavorites();
            getFavs();
        }

        private async void getFavs()
        {
            favoriteAds.Clear();
            IEnumerable<AdsModel> list = await DataService.getAds();
            list.ToList().ForEach(favAd => {
                if (favIds.Contains(favAd.id.ToString()))
                {
                    favoriteAds.Add(favAd);
                }

            });
        }
    }
   
}
