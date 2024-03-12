using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MobilApp_Szakdolgozat.Models
{
    public class AdsModel
    {
        //id, nev, leiras, kategoria, ar, varmegyeId, telepules, tulajId, datum
        public int id { get; set; }
        public string name { get; set; }
        public string desc { get; set; }
        public string category { get; set; }
        public string price { get; set; }
        public int countyID { get; set; }
        public string settlement { get; set; }
        public int ownerId { get; set; }
        public DateTime date { get; set; }

    }
}
