using MobilApp_Szakdolgozat.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;

namespace MobilApp_Szakdolgozat.ViewModels
{
    public class RegisterViewModel : BindableObject
    {
            public string email { get; set; }
            public string jelszo { get; set; }

            private string _errorMessage;

            public string errorMessage
            {
                get { return _errorMessage; }
                set { _errorMessage = value; OnPropertyChanged(); }
            }


            public ICommand registerCommand { get; set; }

            //public RegisterViewModel()
            //{
            //    registerCommand = new Command(async () => {
            //        errorMessage = await DataService.register(email, jelszo);
            //        if (errorMessage == null)
            //        {
            //            await Shell.Current.GoToAsync("//profileDetails");
            //        }
            //    });
            //}
    }
}



