//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace MobilApp_Szakdolgozat.ViewModels
//{
//    public class ShellViewModel: BindableObject
//    {
//        public bool LoginVisible { get;set; }
//        public bool LoggedInVisible { get; set; }

//        public void VisibilityLP()
//        {
//            string LoggedIn = SecureStorage.GetAsync("userId").Result;
//            if (LoggedIn != null)
//            {
//                LoginVisible= false;
//                LoggedInVisible = true;
//            }
//            else
//            {
//                LoginVisible = true;
//                LoggedInVisible = false;
//            }
//            OnPropertyChanged(nameof(LoginVisible));
//            OnPropertyChanged(nameof(LoggedInVisible));
//        }
//    }
//}

using System.ComponentModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MobilApp_Szakdolgozat.ViewModels
{
    public class ShellViewModel : INotifyPropertyChanged
    {
        private bool _loginVisible;
        private bool _loggedInVisible;
        private bool _loggedInAdmin;

        public bool LoginVisible
        {
            get => _loginVisible;
            set
            {
                if (_loginVisible != value)
                {
                    _loginVisible = value;
                    OnPropertyChanged(nameof(LoginVisible));
                }
            }
        }

        public bool LoggedInVisible
        {
            get => _loggedInVisible;
            set
            {
                if (_loggedInVisible != value)
                {
                    _loggedInVisible = value;
                    OnPropertyChanged(nameof(LoggedInVisible));
                }
            }
        }

        public bool LoggedInAdmin
        {
            get => _loggedInAdmin;
            set
            {
                if (_loggedInAdmin != value)
                {
                    _loggedInAdmin = value;
                    OnPropertyChanged(nameof(LoggedInAdmin));
                }
            }
        }

        public ShellViewModel()
        {
            VisibilityLP();
        }

        public event PropertyChangedEventHandler PropertyChanged;

        protected virtual void OnPropertyChanged(string propertyName)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }

        public void VisibilityLP()
        {
            string LoggedIn = SecureStorage.GetAsync("userRole").Result;
            if (LoggedIn != null)
            {
                LoginVisible = false;
                LoggedInVisible = true;
                LoggedInAdmin = false;
                if (LoggedIn == 1.ToString())
                    LoggedInAdmin = true;                
                
            }
            else
            {
                LoginVisible = true;
                LoggedInVisible = false;
            }
        }
    }
}

