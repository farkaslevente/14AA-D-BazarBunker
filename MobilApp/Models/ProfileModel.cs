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
        public string? name { get; set; }
        public string? email { get; set; }
        public string? location { get; set; }
        public string? pPic { get; set; }        
        private string? password { get; set;}
    }
}
