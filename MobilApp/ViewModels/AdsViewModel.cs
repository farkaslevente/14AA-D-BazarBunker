using CommunityToolkit.Maui.Core.Views;
using MobilApp_Szakdolgozat.Models;
using MobilApp_Szakdolgozat.Services;
using MobilApp_Szakdolgozat.Views;
using Org.BouncyCastle.Bcpg;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;

namespace MobilApp_Szakdolgozat.ViewModels
{
    public partial class AdsViewModel: BindableObject, IQueryAttributable
    {
        public ObservableCollection<AdsModel> filteredAds { get; set; }        
        public ObservableCollection<string> uploadFileNames { get; set; }
        public AdsModel advertisement { get; set; }
        public ICommand adDetailsCommand { get; set; }

        public AdsViewModel() {
            adDetailsCommand = new Command(async () =>
            {
                if (advertisement == null) return;
                await Shell.Current.GoToAsync(nameof(AdDetailsPage),
                    new Dictionary<string, object> { { "selectedAd", advertisement } });

                advertisement = null;
                OnPropertyChanged(nameof(advertisement));
            });
        }
        public async void ApplyQueryAttributes(IDictionary<string, object> query)
        {
            uploadFileNames = new ObservableCollection<string>();
            filteredAds = query["filteredAds"] as ObservableCollection<AdsModel>;
            await getAllUploads();
            for (int i = 0; i < uploadFileNames.Count(); i++)
            {
                for (int y = 0; y < filteredAds.Count(); y++)
                {
                    string[] nameWithoutFileType = uploadFileNames[i].Split('.');
                    string[] nameParts = nameWithoutFileType[0].Split('_');
                    //nameParts[0] = UserId
                    //nameParts[1] = AdId
                    //nameParts[2] = ImgId                    
                    if (filteredAds[y].id == Int32.Parse(nameParts[1]) && !filteredAds[y].adImages.Contains($"{DataService.url}/uploads/{nameParts[0]}_{nameParts[1]}_{nameParts[2]}.{nameWithoutFileType[1]}"))
                    {
                        
                        filteredAds[y].adImages.Add($"{DataService.url}/uploads/{nameParts[0]}_{nameParts[1]}_{nameParts[2]}.{nameWithoutFileType[1]}");
                    }                    
                }               
            }            
            OnPropertyChanged(nameof(filteredAds));

            
        }
        private async Task getAllUploads()
        {
            uploadFileNames.Clear();
            IEnumerable<string> list = await DataService.getUploads();
            list.ToList().ForEach(fn => uploadFileNames.Add(fn));
        }
    }
}
