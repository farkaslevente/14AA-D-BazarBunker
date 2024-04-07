using MobilApp_Szakdolgozat.ViewModels;
namespace MobilApp_Szakdolgozat.Views;

public partial class NewPage1 : ContentPage
{
	public NewPage1()
	{
        startup();


    }

    private async void startup()
    {
        this.BindingContext = new ShellViewModel();
        await Task.Delay(3000);
        InitializeComponent();
    }

    private async void LoginBTN_Clicked(object sender, EventArgs e)
    {        
        await Shell.Current.GoToAsync(nameof(LoginPage));
    }

    private async void RegisterBTN_Clicked(object sender, EventArgs e)
    {
        await Shell.Current.GoToAsync(nameof(RegisterPage));
    }

    private async void BTNSearch_Clicked(object sender, EventArgs e)
    {
        await Shell.Current.GoToAsync(nameof(SearchPage));
    }

    private async void BTNAdsPage_Clicked(object sender, EventArgs e)
    {
        await Shell.Current.GoToAsync(nameof(AdsPage));
    }

    private async void BTNForgotten_Clicked(object sender, EventArgs e)
    {
        await Shell.Current.GoToAsync(nameof(ForgottenPwdPage));
    }

    private void LogoutBTN_Clicked(object sender, EventArgs e)
    {
        ShellViewModel ShellInstance = new ShellViewModel();
        DisplayAlert("Kijelentkezés", "Ön kijelentkezett", "Rendben");        
        SecureStorage.Remove("userName");
        SecureStorage.Remove("userEmail");
        SecureStorage.Remove("userImage");
        SecureStorage.Remove("userId");
        ShellInstance.VisibilityLP();
        Shell.Current.GoToAsync(nameof(MainPage));
    }   
}