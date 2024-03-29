using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;

namespace MobilApp_Szakdolgozat.ViewModels
{
    class SupportViewModel
    {
        public string questionType { get; set; }
        public string questionContent { get; set; }
        public ICommand subscribeCommand { get; set; }
        public ICommand questionCommand { get; set; }

        public SupportViewModel()
        {
            subscribeCommand = new Command(async () =>
            {

            });

            questionCommand = new Command(async () =>
            {

            });

        }
    }
}
