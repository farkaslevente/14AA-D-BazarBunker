using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MobilApp_Szakdolgozat.ViewModels
{
    public class ShellViewModel
    {
        public bool LoginVisible { get;set; }
        public bool LoggedInVisible { get; set; }

        public void VisibilityLP()
        {
            string LoggedIn = SecureStorage.GetAsync("userId").Result;
            if (LoggedIn != null)
            {
                LoginVisible= false;
                LoggedInVisible = true;
            }
            else
            {
                LoginVisible = true;
                LoggedInVisible = false;
            }
        }
    }
}
