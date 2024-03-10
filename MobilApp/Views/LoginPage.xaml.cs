using MobilApp_Szakdolgozat.Services;

namespace MobilApp_Szakdolgozat.Views;

public partial class LoginPage : ContentPage
{
	public LoginPage()
	{
		InitializeComponent();
        
	}
          
    private async void BTNForgotPwd_Clicked(object sender, EventArgs e)
    {
		await Shell.Current.GoToAsync(nameof(ForgottenPwdPage));
    }

    private async void BTNRegister_Clicked(object sender, EventArgs e)
    {
        await Shell.Current.GoToAsync(nameof(RegisterPage));
    }

    private void Button_Clicked(object sender, EventArgs e)
    {
        AppShell appShell = new AppShell();
        appShell.UpdateShellContentVisibility();
    }
}