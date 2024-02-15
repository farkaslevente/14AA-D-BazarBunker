namespace MobilApp_Szakdolgozat.Views;

public partial class NewPage1 : ContentPage
{
	public NewPage1()
	{
		InitializeComponent();
	}

    private async void LoginBTN_Clicked(object sender, EventArgs e)
    {
        await Shell.Current.GoToAsync("login");
    }

    private async void RegisterBTN_Clicked(object sender, EventArgs e)
    {
        await Shell.Current.GoToAsync("register");
    }

    private async void BTNSearch_Clicked(object sender, EventArgs e)
    {
        await Shell.Current.GoToAsync("searchDetails");
    }

    private async void BTNAdsPage_Clicked(object sender, EventArgs e)
    {
        await Shell.Current.GoToAsync("advertisements");
    }

    private async void BTNForgotten_Clicked(object sender, EventArgs e)
    {
        await Shell.Current.GoToAsync("forgottenPwd");
    }
}