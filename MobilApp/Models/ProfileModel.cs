using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MobilApp_Szakdolgozat.Models
{
    public class ProfileModel
    {
        public int Id { get; set; }
        public string? Nev { get; set; }
        public string? Email { get; set; }
        public string? Hely { get; set; }
        public string? pPic { get; set; }        
    }
}
