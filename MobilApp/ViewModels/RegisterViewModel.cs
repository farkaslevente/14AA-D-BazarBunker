using MobilApp_Szakdolgozat.Models;
using MobilApp_Szakdolgozat.Services;
using MobilApp_Szakdolgozat.Views;
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
        public RegisterModel regModel { get; set; }
            public string regName { get; set; }
            public string regEmail { get; set; }
            public string regPassword { get; set; }
            public string regConfirmPwd { get; set; }
            public string regLocation { get; set; }
            public string error { get; set; }

            private RegisterModel _errorMessage;

            public RegisterModel errorMessage
            {
                get { return _errorMessage; }
                set { _errorMessage = value; OnPropertyChanged(); }
            }


            public ICommand registerCommand { get; set; }

            public RegisterViewModel()
            {          
                registerCommand = new Command(async () => {    
                    if(regName != null)
                    {
                        if (regEmail != null && regEmail.Contains('@'))
                        {
                            if (regPassword == regConfirmPwd)
                            {
                                error = "";
                                regModel = new RegisterModel
                                {
                                    name = regName,
                                    email = regEmail,
                                    password = regPassword,
                                    location = regLocation
                                };
                                errorMessage = await DataService.register(regModel);
                                if (errorMessage.email == null)
                                {
                                    await Shell.Current.GoToAsync(nameof(MainPage));
                                }
                            }
                            else
                            {
                                error = "Nem egyeznek jelszavai!";
                            }
                        }
                        else
                        {
                            error = "Adjon meg érvényes email-címet!";
                        }
                    }
                    else
                    {
                        error = "Adjon meg egy felhasználónevet!";
                    }                                        
                });
            }
    }
}



