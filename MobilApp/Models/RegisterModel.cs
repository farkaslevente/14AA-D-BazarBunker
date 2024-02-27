using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MobilApp_Szakdolgozat.Models
{
    public class RegisterModel
    {
        public string nev { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public string hely { get; set; }
        public string confirm_password { get; set; }
    }
}
