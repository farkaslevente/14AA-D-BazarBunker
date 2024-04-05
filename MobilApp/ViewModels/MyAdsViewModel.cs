using CommunityToolkit.Maui.Views;
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
        public ObservableCollection<PictureCatalogModel> pics { get; set; }
        public ObservableCollection<string> uploadFileNames { get; set; }
        public ObservableCollection<ProfileModel> profiles{ get; set; }
        public AdsModel selectedAd { get; set; }   

        public ICommand detailsCommand { get; set; }
        public ICommand editCommand { get; set; }
        public ICommand deleteCommand { get; set; }        
        public MyAdsViewModel()
        {
            uploadFileNames = new ObservableCollection<string>();
            advertisements = new ObservableCollection<AdsModel>();            
            getImages();
            detailsCommand = new Command(async () => {
                if (selectedAd == null) return;
                await Shell.Current.GoToAsync(nameof(AdDetailsPage),
                    new Dictionary<string, object> { { "selectedAd", selectedAd } });

                selectedAd = null;
                OnPropertyChanged(nameof(selectedAd));
            });
            deleteCommand = new Command(async (adId) =>
            {
                if (adId is int)
                {
                    int idInt = (int)adId;
                    bool confirm = await Shell.Current.DisplayAlert("Figyelem!", "Biztosan törölni", "Igen", "Vissza");
                    if (confirm)
                    {
                        await DataService.deleteAd(idInt);                        
                        await Shell.Current.GoToAsync(nameof(MyAdsPage));
                        await Shell.Current.DisplayAlert("", "Hirdetését töröltük!", "Vissza");
                    }
                }
            });
            editCommand = new Command(async (adId) =>
            {

                if (adId is int)
                {
                    int idInt = (int)adId;

                    foreach (var ad in advertisements)
                    {
                        if (ad.id == idInt)
                        {
                            //selectedAd = ad;
                            //await Shell.Current.GoToAsync(nameof(AdDetailsPage),
                            //new Dictionary<string, object> { { "selectedAd", selectedAd } });
                            //selectedAd = null;
                            //OnPropertyChanged(nameof(selectedAd));
                            Shell.Current.ShowPopup(new PopUpAdEditorPage());
                        }
                    }
                }
                else
                {
                    await Shell.Current.DisplayAlert("",":(", "k");
                }
            });
        }

        private async void getImages()
        {
            await getAllAds();
            await getAllUploads();            
            for (int i = 0; i < uploadFileNames.Count(); i++)
            {
                for (int y = 0; y < advertisements.Count(); y++)
                {
                    string[] nameWithoutFileType = uploadFileNames[i].Split('.');
                    string[] nameParts = nameWithoutFileType[0].Split('_');
                    //nameParts[0] = UserId
                    //nameParts[1] = AdId
                    //nameParts[2] = ImgId
                    if (advertisements[y].id == Int32.Parse(nameParts[1]))
                    {
                        advertisements[y].adImages.Clear();
                        advertisements[y].adImages.Add($"{DataService.url}/uploads/{nameParts[0]}_{nameParts[1]}_{nameParts[2]}.{nameWithoutFileType[1]}");
                        OnPropertyChanged(advertisements[y].adImages[0]);
                    }
                }
            }           
        }       

        private async Task getAllAds()
        {            
            advertisements.Clear();
            //int isLike = 0;
            int UserId = Int32.Parse(await SecureStorage.GetAsync("userId"));

            IEnumerable<AdsModel> list = await DataService.getAds();            
            list.ToList().ForEach(advert =>
            {
                if (advert.tulajId == UserId)
                {
                    string[] butcheredDate = advert.datum.Split(" ");
                    advert.datum = $"{butcheredDate[3]}. {butcheredDate[1]}. {butcheredDate[2]}.";
                    advertisements.Add(advert);
                }
            });            
        }
        private async void getAllPics()
        {
            IEnumerable<PictureCatalogModel> list = await DataService.getAllPictures();
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
