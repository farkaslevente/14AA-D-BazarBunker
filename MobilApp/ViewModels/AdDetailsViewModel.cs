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
        public ProfileModel localUser { get; set; }

        public string favorites { get; set; }        
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
                    inversFavoriteVisibility = !value;
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
            adToFavoritesCommand = new Command(async () => {               
               int userId = Int32.Parse(await SecureStorage.GetAsync("userId"));
               string userName = await SecureStorage.GetAsync("userName");
               string userEmail = await SecureStorage.GetAsync("userEmail");
               string userLocation = await SecureStorage.GetAsync("userLocation");
               int userRole = Int32.Parse(await SecureStorage.GetAsync("userRole"));
               string userFavorites = await SecureStorage.GetAsync("userFavorites");
               string userPhone = await SecureStorage.GetAsync("userPhone");
               string userImage = await SecureStorage.GetAsync("userImage");
                StringBuilder favoritesBuilder = new StringBuilder(favorites);
                favoritesBuilder.Append($"{advertisement.id}+");
                favorites = favoritesBuilder.ToString();
                string[] favs = favorites.Split("+");
                for (int i = 0; i < favs.Length-1; i++)
                {
                    if (!userFavorites.Contains(favs[i].ToString()))
                    {
                        userFavorites += favs[i].ToString();
                        await SecureStorage.SetAsync("userFavorites", userFavorites);
                    }
                }                    
                                
                await DataService.profileUpdate(userId,userName,userEmail,userLocation,userImage, userRole,userFavorites, userPhone);
                await Shell.Current.DisplayAlert("Siker!", "A kiválasztott hirdetést hozzáadtuk kedvenceihez", "Rendben");
                favoriteVisibility = true;
                inversFavoriteVisibility = !favoriteVisibility;
                OnPropertyChanged(favoriteVisibility.ToString());
                advertisement.isFav = true;
                advertisement.isFavInvers = false;
                getUserInfo();
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
                favorites = favorites.Replace($"{advertisement.id}+", "");
                string[] favs = favorites.Split("+"); 
                if (favs.Count() == 0)
                {
                    userFavorites = "100000+";
                }
                else
                {
                    userFavorites = favorites.ToString();
                }                
                await SecureStorage.SetAsync("userFavorites", userFavorites.ToString());
                await DataService.profileUpdate(userId, userName, userEmail, userLocation, userImage, userRole, userFavorites, userPhone);
                await Shell.Current.DisplayAlert("Siker!", "A kiválasztott hirdetést kivettük kedvencei közül", "Rendben");
                favoriteVisibility = false;
                inversFavoriteVisibility = !favoriteVisibility;
                OnPropertyChanged(favoriteVisibility.ToString());
                advertisement.isFav = false;
                advertisement.isFavInvers = true;
                getUserInfo();
            });            
        }

        private void startFavs()
        {            
            string[] favs = localUser.favs.Split('+');
            for (int i = 0; i < favs.Count()-1; i++)
            {
                if (favs[i] == advertisement.id.ToString())
                {
                    advertisement.isFav = false;
                    advertisement.isFavInvers = true;
                }
                else
                {
                    advertisement.isFav = true;
                    advertisement.isFavInvers = false;
                }
            }                           
        }

        private async void getUserInfo()
        {            
            adOwner = await DataService.getProfileById(advertisement.tulajId);            
        }

        public void ApplyQueryAttributes(IDictionary<string, object> query)
        {
            
            advertisement = query["selectedAd"] as AdsModel;
            OnPropertyChanged(nameof(advertisement));
            getUserInfo();
            getLocalUserInfo();
            

        }

        private async void getLocalUserInfo()
        {
            int uId = Int32.Parse(await SecureStorage.GetAsync("userId"));
            localUser = await DataService.getProfileById(uId);
            await SecureStorage.SetAsync("userFavorites", localUser.favs);
            favorites = localUser.favs;
            startFavs();
        }
    }

}
