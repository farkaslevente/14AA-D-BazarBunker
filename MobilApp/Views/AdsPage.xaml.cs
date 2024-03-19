using MobilApp_Szakdolgozat.Models;
using MobilApp_Szakdolgozat.ViewModels;
using System.Collections.ObjectModel;
using System.ComponentModel;

namespace MobilApp_Szakdolgozat.Views;
public partial class AdsPage : ContentPage
{
	public ObservableCollection<AdsModel> filteredAds { get; set; }
	public AdsPage()
	{		
		InitializeComponent();		
	}
    public AdsPage(SearchViewModel vm) : this()
    {
        filteredAds = vm.filteredAds;
    }
}