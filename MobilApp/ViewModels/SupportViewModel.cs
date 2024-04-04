using MobilApp_Szakdolgozat.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;

namespace MobilApp_Szakdolgozat.ViewModels
{
    class SupportViewModel: BindableObject
    {
        public string questionTitle { get; set; }
        public string questionContent { get; set; }
        public ICommand subscribeCommand { get; set; }
        public ICommand supportCommand { get; set; }

        public SupportViewModel()
        {
            subscribeCommand = new Command(async () =>
            {
                await DataService.postSub();
                await Shell.Current.DisplayAlert("", "Köszönjük a programunk iránti érdeklődését", "Renben");                
                OnPropertyChanged(questionTitle);
            });

            supportCommand = new Command(async () =>
            {
                await DataService.postSupport(questionTitle, questionContent);
                await Shell.Current.DisplayAlert("Köszönjük visszajelzését!", "Amint feldolgoztuk levelét felvesszük önnel a kapcsolatot", "Renben");
                questionTitle = "";
                questionContent = "";
                OnPropertyChanged(questionTitle);
            });

        }
    }
}
