using Microsoft.IdentityModel.Tokens;
using MobilApp_Szakdolgozat.ViewModels;

namespace MobilApp_Szakdolgozat.Views;

public partial class AdDetailsPage : ContentPage
{
    public string userName { get; set; }
	public AdDetailsPage()
	{
        startTimer();
    }

    private async Task startTimer()
    {
        this.BindingContext = new AdDetailsViewModel();
        await Task.Delay(3000);
        userName = await SecureStorage.GetAsync("userName");
        InitializeComponent();        
    }

    private async void BTNanimation_Clicked(object sender, EventArgs e)
    {
        await contact.TranslateTo(0, -300, 500);        
    }

    private async void BTNanimationBack_Clicked(object sender, EventArgs e)
    {
        await contact.TranslateTo(0, 300, 500);
    }

    private async void BTNremoveFromFavs_Clicked(object sender, EventArgs e)
    {
        if (!userName.IsNullOrEmpty())
        {
            BTNremoveFromFavs.IsEnabled = false;
            BTNremoveFromFavs.IsVisible = false;
            BTNadToFavs.IsEnabled = true;
            BTNadToFavs.IsVisible = true;
        }
    }

    private async void BTNadToFavs_Clicked(object sender, EventArgs e)
    {
        if (!userName.IsNullOrEmpty())
        {
            BTNremoveFromFavs.IsEnabled = true;
            BTNremoveFromFavs.IsVisible = true;
            BTNadToFavs.IsEnabled = false;
            BTNadToFavs.IsVisible = false;
        }
    }
}