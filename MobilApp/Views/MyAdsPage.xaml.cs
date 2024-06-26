using MobilApp_Szakdolgozat.ViewModels;

namespace MobilApp_Szakdolgozat.Views;

public partial class MyAdsPage : ContentPage
{    
	public MyAdsPage()
	{
        startTimer();        
    }

    private async Task startTimer()
    {
        this.BindingContext = new MyAdsViewModel();     
        await Task.Delay(3000);
        InitializeComponent();        
    }

    private async void BTNNewAd_Clicked(object sender, EventArgs e)
    {
        await Shell.Current.GoToAsync(nameof(NewAdPage));
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

    private async void BTNMainPage_Clicked(object sender, EventArgs e)
    {
        await Shell.Current.GoToAsync(nameof(MainPage));
    }

    private async void BTNFav_Clicked(object sender, EventArgs e)
    {
        await Shell.Current.GoToAsync(nameof(FavPage));
    }

    private void BTNEditVis_Clicked(object sender, EventArgs e)
    {
        
    }
}