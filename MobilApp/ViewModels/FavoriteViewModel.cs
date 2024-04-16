using MobilApp_Szakdolgozat.Models;
using MobilApp_Szakdolgozat.Services;
using MobilApp_Szakdolgozat.Views;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;

namespace MobilApp_Szakdolgozat.ViewModels
{
    public class FavoriteViewModel: BindableObject, IQueryAttributable
    {
        public ObservableCollection<AdsModel> favoriteAds { get; set; }
        public ObservableCollection<string> uploadFileNames { get; set; }
        public AdsModel advertisement { get; set; }
        public string[] favIds { get; set; }
        public ICommand adDetailsCommand { get; set; }


        public async void ApplyQueryAttributes(IDictionary<string, object> query)
        {
            int userId = int.Parse(await SecureStorage.GetAsync("userId"));
            string userEmail = await SecureStorage.GetAsync("userEmail");
            favIds = await DataService.getFavorites();            
            uploadFileNames = new ObservableCollection<string>();
            favoriteAds = new ObservableCollection<AdsModel>();
            await getAllUploads();
            await getFavs();
            for (int i = 0; i < uploadFileNames.Count(); i++)
            {
                for (int y = 0; y < favoriteAds.Count(); y++)
                {
                    string[] nameWithoutFileType = uploadFileNames[i].Split('.');
                    string[] nameParts = nameWithoutFileType[0].Split('_');
                    //nameParts[0] = UserId
                    //nameParts[1] = AdId      <- Which part is which
                    //nameParts[2] = ImgId                    
                    if (favoriteAds[y].id == Int32.Parse(nameParts[1]) && !favoriteAds[y].adImages.Contains($"{DataService.url}/uploads/{nameParts[0]}_{nameParts[1]}_{nameParts[2]}.{nameWithoutFileType[1]}"))
                    {

                        favoriteAds[y].adImages.Add($"{DataService.url}/uploads/{nameParts[0]}_{nameParts[1]}_{nameParts[2]}.{nameWithoutFileType[1]}");
                    }
                }
            }
            OnPropertyChanged(nameof(favoriteAds));
        }
        public FavoriteViewModel()
        {            
            adDetailsCommand = new Command(async () =>
            {
                if (advertisement == null) return;                
                await Shell.Current.GoToAsync(nameof(AdDetailsPage),
                    new Dictionary<string, object> { { "selectedAd", advertisement } });

                advertisement = null;
                OnPropertyChanged(nameof(advertisement));
            });
        }                    
        private async Task getAllUploads()
        {
            uploadFileNames.Clear();
            IEnumerable<string> list = await DataService.getUploads();
            list.ToList().ForEach(fn => uploadFileNames.Add(fn));
        }
        private async Task getFavs()
        {
            favoriteAds.Clear();
            IEnumerable<AdsModel> list = await DataService.getAds();
            list.ToList().ForEach(favAd => {
                if (favIds.Contains(favAd.id.ToString()))
                {
                    string[] butcheredDate = favAd.datum.Split(" ");
                    favAd.datum = $"{butcheredDate[3]}. {butcheredDate[1]}. {butcheredDate[2]}.";
                    favoriteAds.Add(favAd);
                }

            });
        }
    }
   
}
