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
//using Newtonsoft.Json;

namespace MobilApp_Szakdolgozat.ViewModels
{
    public class ProfilePageViewModel: BindableObject
        //, IQueryAttributable
    {
        public ObservableCollection<ProfileModel> profiles { get; set; }
        public ProfileModel profile { get; set; }         
        public ProfilePageViewModel()
        {            
            GetProfileData();
        }
        private async Task GetProfileData()
        {
            string jsonString = await SecureStorage.GetAsync("user");

            if (!string.IsNullOrEmpty(jsonString))
            {
                profile = JsonSerializer.Deserialize<ProfileModel>(jsonString);
                OnPropertyChanged(nameof(profile));
            }
            string[] stringArray = { profile.nev, profile.email, profile.hely, profile.pPic };           
        }
        public ICommand openUrlCommand =>
        new Command<string>(async (url) => await Launcher.OpenAsync(url));

        //public void ApplyQueryAttributes(IDictionary<string, object> query)
        //{
        //    profile = query["source"] as ProfileModel;
        //    OnPropertyChanged(nameof(profile));
        //}
        private async Task getAllProfiles()
        {
            IEnumerable<ProfileModel> list = await DataService.getAllProfiles();
            list.ToList().ForEach(p => profiles.Add(p));
        }

    }
}
