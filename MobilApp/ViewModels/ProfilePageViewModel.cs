using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Windows.Input;
using MobilApp_Szakdolgozat.Models;
using MobilApp_Szakdolgozat.Services;

namespace MobilApp_Szakdolgozat.ViewModels
{
    public class ProfilePageViewModel: BindableObject        
    {
        public ObservableCollection<ProfileModel> profiles { get; set; }
        public ProfileModel profile { get; set; }         
        public ProfilePageViewModel()
        {
            profiles = new ObservableCollection<ProfileModel>();
            a();            
        }

        private async void a()
        {
            await GetProfileData();
        }

        private async Task GetProfileData()
        {
            string userName = await SecureStorage.GetAsync("userName");
            string userEmail = await SecureStorage.GetAsync("userEmail");
            string userImage = await SecureStorage.GetAsync("userImage");
            profile = new ProfileModel
            {
                nev = userName,
                email = userEmail,
                pPic = userImage
            };

            OnPropertyChanged(nameof(profile));      
        }
        public ICommand openUrlCommand =>
        new Command<string>(async (url) => await Launcher.OpenAsync(url));       
        private async Task getAllProfiles()
        {
            IEnumerable<ProfileModel> list = await DataService.getAllProfiles();
            list.ToList().ForEach(p => profiles.Add(p));
        }

    }
}
