namespace MobilApp_Szakdolgozat.Views;

public partial class LoginPage : ContentPage
{
	public LoginPage()
	{
		InitializeComponent();
	}

    private async void ForgotPwdBTN_Clicked(object sender, EventArgs e)
    {
		await Shell.Current.GoToAsync("forgottenPwd");
    }
}