using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MobilApp_Szakdolgozat.ViewModels
{
    public class CompositeViewModel
    {
        public ShellViewModel ShellViewModel { get; set; }
        public AdsViewModel AdsViewModel { get; set; }

        public CompositeViewModel()
        {
            AdsViewModel = new AdsViewModel();
            ShellViewModel = new ShellViewModel();
            
        }
    }
}
