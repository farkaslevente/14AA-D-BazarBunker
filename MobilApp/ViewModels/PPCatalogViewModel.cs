using CommunityToolkit.Mvvm.Input;
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
    public class PPCatalogViewModel: BindableObject
    {
        public ObservableCollection<PictureCatalogModel> pictures { get; set; }
        public PictureCatalogModel selectedPicture { get; set; }
        public ICommand detailsCommand { get; set; }

        public PPCatalogViewModel()
        {
            pictures = new ObservableCollection<PictureCatalogModel>();
            getAllPictures();
            selectedPicture = null; 
            detailsCommand = new Command(async () =>
            {
                if (selectedPicture == null) return;
                int UserId = Int32.Parse(await SecureStorage.GetAsync("userId"));
                await DataService.profilePictureUpdate(UserId, selectedPicture.Url);
                //OnPropertyChanged(nameof(selectedPicture));
                if (await SecureStorage.GetAsync("success") == "success")
                {
                   await SecureStorage.SetAsync("userImage", selectedPicture.Url);
                   await Shell.Current.GoToAsync(nameof(ProfilePage));
                }
            });
        }
        private async void getAllPictures()
        {
            IEnumerable<PictureCatalogModel> list = await DataService.getAllPictures();
            list.ToList().ForEach(p => pictures.Add(p));
        }
    }
}
