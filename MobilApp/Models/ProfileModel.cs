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
        public int Nev { get; set; }
        public int Email { get; set; }
        public int Location { get; set; }
        public int ProfilePicture { get; set; }
    }
}
