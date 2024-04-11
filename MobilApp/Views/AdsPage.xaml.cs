using MobilApp_Szakdolgozat.Models;
using MobilApp_Szakdolgozat.ViewModels;
using System.Collections.ObjectModel;
using System.ComponentModel;

namespace MobilApp_Szakdolgozat.Views;
public partial class AdsPage : ContentPage
{
	public ObservableCollection<AdsModel> filteredAds { get; set; }
    public bool LoginVisible { get; private set; }
    public bool LoggedInVisible { get; private set; }    

    public AdsPage()
	{
        startTimer();
    }

    private async Task startTimer()
    {
        this.BindingContext = new AdsViewModel();
        await Task.Delay(3000);
        string LoggedIn = SecureStorage.GetAsync("userEmail").Result;
        if (LoggedIn != null)
        {
            LoginVisible = false;
            LoggedInVisible = true;            
        }
        else
        {
            LoginVisible = true;
            LoggedInVisible = false;            
        }
        InitializeComponent();
    }
    private async void BTNIncognitoSupport_Clicked(object sender, EventArgs e)
    {
        await Shell.Current.GoToAsync(nameof(IncognitoSupportPage));
    }

    private async void BTNProfile_Clicked(object sender, EventArgs e)
    {
        await Shell.Current.GoToAsync(nameof(ProfilePage));
    }

    private async void BTNLogin_Clicked(object sender, EventArgs e)
    {
        await Shell.Current.GoToAsync(nameof(LoginPage));
    }

    private async void BTNMyAds_Clicked(object sender, EventArgs e)
    {
        await Shell.Current.GoToAsync(nameof(AdsPage));
    }

    private async void BTNSupport_Clicked(object sender, EventArgs e)
    {
        await Shell.Current.GoToAsync(nameof(SupportPage));
    }

    private async void BTNAdmin_Clicked(object sender, EventArgs e)
    {
        await Shell.Current.GoToAsync(nameof(NewPage1));
    }

    private async void BTNMainPage_Clicked(object sender, EventArgs e)
    {
        await Shell.Current.GoToAsync(nameof(MainPage));
    }

    private async void BTNFav_Clicked(object sender, EventArgs e)
    {
        await Shell.Current.GoToAsync(nameof(FavPage));
    }
}