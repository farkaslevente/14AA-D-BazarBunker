using ExCSS;
using MobilApp_Szakdolgozat.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;

namespace MobilApp_Szakdolgozat.ViewModels
{
    public class AdDetailsViewModel : BindableObject, IQueryAttributable
    {
        public AdsModel advertisement { get; set; }      
        public void ApplyQueryAttributes(IDictionary<string, object> query)
        {
            advertisement = query["advertisement"] as AdsModel;
            OnPropertyChanged(nameof(advertisement));
        }
    }

}
