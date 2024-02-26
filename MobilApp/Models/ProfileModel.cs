using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MobilApp_Szakdolgozat.Models
{
    public class ProfileModel
    {
        public int id { get; set; }
        public string? nev { get; set; }
        public string? email { get; set; }
        public string? hely { get; set; }
        public string? pPic { get; set; }        
        private string? jelszo { get; set;}
    }
}
