using MobilApp_Szakdolgozat.ViewModels;
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

    private void LogoutBTN_Clicked(object sender, EventArgs e)
    {
        ShellViewModel appShellInstance = new ShellViewModel();
        DisplayAlert("Kijelentkezés", "Ön kijelentkezett", "Rendben");        
        SecureStorage.Remove("userName");
        SecureStorage.Remove("userEmail");
        SecureStorage.Remove("userImage");
        SecureStorage.Remove("userId");
        appShellInstance.VisibilityLP();
    }
}