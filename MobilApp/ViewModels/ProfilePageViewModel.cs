using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;
using MobilApp_Szakdolgozat.Models;
using MobilApp_Szakdolgozat.Services;

namespace MobilApp_Szakdolgozat.ViewModels
{
    public class ProfilePageViewModel: BindableObject, IQueryAttributable
    {
        public ObservableCollection<ProfileModel> profiles { get; set; }
        public ProfileModel profile { get; set; }

        public ProfilePageViewModel()
        {

        }
        public ICommand openUrlCommand =>
            new Command<string>(async (url) => await Launcher.OpenAsync(url));

        public void ApplyQueryAttributes(IDictionary<string, object> query)
        {
            profile = query["source"] as ProfileModel;
            OnPropertyChanged(nameof(profile));
        }
        private async void getAllProfiles()
        {
            IEnumerable<ProfileModel> list = await DataService.getAllProfiles();
            list.ToList().ForEach(p => profiles.Add(p));
        }

    }
}
