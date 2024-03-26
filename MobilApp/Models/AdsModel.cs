using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MobilApp_Szakdolgozat.Models
{
    public class AdsModel
    {        

        //id, nev, leiras, kategoria, ar, varmegyeId, telepules, tulajId, datum
        public int id { get; set; }
        public string nev { get; set; }
        public string leiras { get; set; }
        public string kategoria { get; set; }
        public int ar { get; set; }
        public int varmegyeId { get; set; }
        public string telepules { get; set; }
        public int tulajId { get; set; }
        //nap ho napdatum év óra:perc:másodperc időzóna...
        public string datum { get; set; }

        //post calculated
        public bool isFav { get; set; }
        public ObservableCollection<string> adImages { get; set; } = new ObservableCollection<string>();
        public string ownerName { get; set; }

    }
}
