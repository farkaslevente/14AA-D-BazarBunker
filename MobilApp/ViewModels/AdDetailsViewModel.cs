using ExCSS;
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
    public class AdDetailsViewModel : BindableObject, IQueryAttributable
    {
        public AdsModel advertisement { get; set; }
        public ProfileModel adOwner { get; set; }
        public ObservableCollection<string> favorites { get; set; }        
        public ICommand adToFavoritesCommand { get; set; }
        public ICommand removeFromFavoritesCommand { get; set; }
        private bool _favoriteVisibility { get; set; }
        public bool favoriteVisibility
        {
            get => _favoriteVisibility;
            set
            {
                if (_favoriteVisibility != value)
                {
                    _favoriteVisibility = value;
                    OnPropertyChanged(nameof(favoriteVisibility));
                }
            }
        }
        private bool _inversFavoriteVisibility { get; set; }
        public bool inversFavoriteVisibility
        {
            get => _inversFavoriteVisibility;
            set
            {
                if (_inversFavoriteVisibility != value)
                {
                    _inversFavoriteVisibility = value;
                    OnPropertyChanged(nameof(inversFavoriteVisibility));
                }
            }
        }
        public AdDetailsViewModel()
        {
            favorites = new ObservableCollection<string>();
            favoriteVisibility = true;
            inversFavoriteVisibility = !favoriteVisibility;
            getUserInfo();
            adToFavoritesCommand = new Command(async () => {               
               int userId = Int32.Parse(await SecureStorage.GetAsync("userId"));
               string userName = await SecureStorage.GetAsync("userName");
               string userEmail = await SecureStorage.GetAsync("userEmail");
               string userLocation = await SecureStorage.GetAsync("userLocation");
               int userRole = Int32.Parse(await SecureStorage.GetAsync("userRole"));
               string userFavorites = await SecureStorage.GetAsync("userFavorites");
               string userPhone = await SecureStorage.GetAsync("userPhone");
               string userImage = await SecureStorage.GetAsync("userImage");
                favorites.Add($"{advertisement.id}+");
                foreach (var item in favorites)
                {
                    if (!userFavorites.Contains(item.ToString()))
                    {
                        userFavorites += item.ToString();
                    }                    
                }
                
                await DataService.profileUpdate(userId,userName,userEmail,userLocation,userImage, userRole,userFavorites, userPhone);
                await Shell.Current.DisplayAlert("Siker!", "A kiválasztott hirdetést hozzáadtuk kedvenceihez", "Rendben");
                favoriteVisibility = true;
                inversFavoriteVisibility = !favoriteVisibility;
                OnPropertyChanged(favoriteVisibility.ToString());
            });

            removeFromFavoritesCommand = new Command(async () => {
                int userId = Int32.Parse(await SecureStorage.GetAsync("userId"));
                string userName = await SecureStorage.GetAsync("userName");
                string userEmail = await SecureStorage.GetAsync("userEmail");
                string userLocation = await SecureStorage.GetAsync("userLocation");
                int userRole = Int32.Parse(await SecureStorage.GetAsync("userRole"));
                string userFavorites = await SecureStorage.GetAsync("userFavorites");
                string userPhone = await SecureStorage.GetAsync("userPhone");
                string userImage = await SecureStorage.GetAsync("userImage");
                favorites.Remove($"{advertisement.id}+");
                userFavorites = favorites.ToString();
                await SecureStorage.SetAsync("userFavs", userFavorites);
                await DataService.profileUpdate(userId, userName, userEmail, userLocation, userImage, userRole, userFavorites, userPhone);
                await Shell.Current.DisplayAlert("Siker!", "A kiválasztott hirdetést kivettük kedvencei közül", "Rendben");
                favoriteVisibility = false;
                inversFavoriteVisibility = !favoriteVisibility;
                OnPropertyChanged(favoriteVisibility.ToString());
            });
        }

        private async void getUserInfo()
        {
            int uId = Int32.Parse(await SecureStorage.GetAsync("userId"));
            adOwner = await DataService.getProfileById(uId);                       
        }

        public void ApplyQueryAttributes(IDictionary<string, object> query)
        {
            advertisement = query["selectedAd"] as AdsModel;
            OnPropertyChanged(nameof(advertisement));
            
        }
    }

}
