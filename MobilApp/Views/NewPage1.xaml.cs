namespace MobilApp_Szakdolgozat.Views;

public partial class NewPage1 : ContentPage
{
	public NewPage1()
	{
		InitializeComponent();
	}

    private async void LoginBTN_Clicked(object sender, EventArgs e)
    {
        await Shell.Current.GoToAsync("loginDetails");
    }

    private async void RegisterBTN_Clicked(object sender, EventArgs e)
    {
        await Shell.Current.GoToAsync("registerDetails");
    }

    private async void BTNSearch_Clicked(object sender, EventArgs e)
    {
        await Shell.Current.GoToAsync("searchDetails");
    }

    private async void BTNAdsPage_Clicked(object sender, EventArgs e)
    {
        await Shell.Current.GoToAsync(nameof(AdsPage));
    }

    private async void BTNForgotten_Clicked(object sender, EventArgs e)
    {
        await Shell.Current.GoToAsync("forgottenPwdDetails");
    }

    private async void LogoutBTN_Clicked(object sender, EventArgs e)
    {
        DisplayAlert("Kijelentkezés", "Ön kijelentkezett", "Rendben");
        string empty = "empty";
        await SecureStorage.SetAsync("userName", empty);
        await SecureStorage.SetAsync("userEmail", empty);
        await SecureStorage.SetAsync("userImage", empty);
        await SecureStorage.SetAsync("userId", empty);
    }
}