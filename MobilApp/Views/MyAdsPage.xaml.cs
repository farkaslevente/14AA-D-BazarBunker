namespace MobilApp_Szakdolgozat.Views;

public partial class MyAdsPage : ContentPage
{
	public MyAdsPage()
	{
		InitializeComponent();
        if (SecureStorage.GetAsync("uploaded").ToString() == true.ToString())
        {
            SecureStorage.Remove("uploaded");
            DisplayAlert("Köszönjük feltöltését!", "Hirdetését sikeresen feljegyeztük. Köszönjük, hogy minket választott!", "Rendben");
        }
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

    private async void BTNMessages_Clicked(object sender, EventArgs e)
    {
        await Shell.Current.GoToAsync(nameof(MessagesPage));
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