using CommunityToolkit.Mvvm.Input;
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
    public class PPCatalogViewModel: BindableObject
    {
        public ObservableCollection<PictureCatalogModel> pictures { get; set; }
        public PictureCatalogModel selectedPicture { get; set; }
        public ICommand detailsCommand { get; set; }
        
        public PPCatalogViewModel() 
        { 
            pictures = new ObservableCollection<PictureCatalogModel>();
            getAllPictures();
            detailsCommand = new Command(async () => {
                if (selectedPicture == null) return;
                await Shell.Current.GoToAsync("profileDetails",
                    new Dictionary<string, object> { { "picture", selectedPicture } });

                selectedPicture = null;
                OnPropertyChanged(nameof(selectedPicture));
            });
        }

        private async void getAllPictures()
        {
            IEnumerable<PictureCatalogModel> list = await DataService.getAllPictures();
            list.ToList().ForEach(p => pictures.Add(p));
        }
    }
}
