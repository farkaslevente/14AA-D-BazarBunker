using ExCSS;
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
    public class MyAdsViewModel : BindableObject
    {
        public ObservableCollection<AdsModel> advertisements { get; set; }
        public ObservableCollection<PictureCatalogModel> pics{ get; set; }
        public ObservableCollection<string> uploadFileNames { get; set; }
        public AdsModel selectedAd { get; set; }   

        public ICommand detailsCommand { get; set; }
        public ICommand favCommand { get; set; }
        public MyAdsViewModel()
        {
            advertisements = new ObservableCollection<AdsModel>();
            getAllAds();
            getImages();
            detailsCommand = new Command(async () => {
                if (selectedAd == null) return;
                await Shell.Current.GoToAsync(nameof(AdDetailsPage),
                    new Dictionary<string, object> { { "advertisement", selectedAd } });

                selectedAd = null;
                OnPropertyChanged(nameof(selectedAd));
            });           
        }

        private async void getImages()
        {
            await getAllUploads();
            for (int i = 0; i < advertisements.Count(); i++)
            {
                for (int y = 0; y < uploadFileNames.Count(); y++)
                {
                    string[] nameWithoutFileType = uploadFileNames[y].Split('.');
                    string[] nameParts = nameWithoutFileType[0].Split('_');
                    //nameParts[0] = UserId
                    //nameParts[1] = AdId
                    //nameParts[2] = ImgId
                    if (advertisements[i].id == Int32.Parse(nameParts[1]))
                    {
                        advertisements[i].adImages.Add($"{DataService.url}/pictures/upload/{nameParts[0]}_{nameParts[0]}_{nameParts[0]}.{nameWithoutFileType[1]}");
                    }
                }
            }
        }

        private async void getAllAds()
        {
            //int isLike = 0;
            int? UserId = Int32.Parse(await SecureStorage.GetAsync("userId"));

            IEnumerable<AdsModel> list = await DataService.getAds();
            advertisements.Clear();
            list.ToList().ForEach(advert =>
            {
                if (advert.tulajId == UserId)
                {
                    advertisements.Add(advert);
                }
            });            
        }
        private async void getAllPics()
        {
            IEnumerable<PictureCatalogModel> list = await DataService.getAllPictures();
            //list.ToArray().ForEach(p => selectedAd.adImages.Add(p));
            //selectedAd.adImages = list.Select(item => item.ToString());
            list.ToList().ForEach(advert =>
            {
                selectedAd.adImages.Add(advert.Url);

            });
        }
        private async Task getAllUploads()
        {
            IEnumerable<string> list = await DataService.getUploads();
            list.ToList().ForEach(fn => uploadFileNames.Add(fn));
        }
    }
}
