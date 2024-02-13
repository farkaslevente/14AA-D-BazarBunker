﻿using MobilApp_Szakdolgozat.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;

namespace MobilApp_Szakdolgozat.ViewModels
{
    public class LoginViewModel : BindableObject
    {
        public string email { get; set; }
        public string password { get; set; }

        private string _errorMessage;

        public string errorMessage
        {
            get { return _errorMessage; }
            set { _errorMessage = value; OnPropertyChanged(); }
        }


        public ICommand loginCommand { get; set; }

        public LoginViewModel()
        {
            loginCommand = new Command(async () => {
                errorMessage = await DataService.login(email, password);
                if (errorMessage == null)
                {
                    await Shell.Current.GoToAsync("//books");
                }
            });
        }
    }
}
