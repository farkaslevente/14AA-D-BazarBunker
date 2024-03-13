using MobilApp_Szakdolgozat.ViewModels;

namespace MobilApp_Szakdolgozat.Views;

public partial class ProfilePage : ContentPage
{
    bool Saved = false;    
	public ProfilePage()
	{        
        this.BindingContext = new ShellViewModel();
        this.BindingContext = new ProfilePageViewModel();
        InitializeComponent();
        NameChangeBTN.IsVisible = true;
        NameSaveBTN.IsVisible = false;

    }

    private void NameChangeBTN_Clicked(object sender, EventArgs e)
    {
		NameChangeBTN.IsVisible = false;
        NameSaveBTN.IsVisible = true;
        NameEntry.Text = "";
        NameEntry.Placeholder = "Teszt Elek";
        NameEntry.PlaceholderColor = Colors.Gray;
        Saved = false;
    }

    private void NameSaveBTN_Clicked(object sender, EventArgs e)
    {
        
        if (NameEntry.Text != "" && Saved == false)
        {
            NameLB.Text = NameEntry.Text;
            NameChangeBTN.IsVisible = true;
            NameSaveBTN.IsVisible = false;
            Saved = true;

        }
        else
        {
            NameEntry.Placeholder = "Adjon meg egy érvényes nevet!";
            NameEntry.PlaceholderColor = Colors.Red;

        }
        
    }

    private async void ProfilePicChangeBTN_Clicked(object sender, EventArgs e)
    {
        await Shell.Current.GoToAsync(nameof(PPCatalogPage));
    }

    private void BTNLogout_Clicked(object sender, EventArgs e)
    {
        ShellViewModel ShellInstance = new ShellViewModel();
        DisplayAlert("Kijelentkezés", "Ön kijelentkezett", "Rendben");
        SecureStorage.Remove("userName");
        SecureStorage.Remove("userEmail");
        SecureStorage.Remove("userImage");
        SecureStorage.Remove("userLocation");
        SecureStorage.Remove("userId");
        ShellInstance.VisibilityLP();
        Shell.Current.GoToAsync(nameof(MainPage));
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

    private async void BTNSearchPage_Clicked(object sender, EventArgs e)
    {
        await Shell.Current.GoToAsync(nameof(SearchPage));
    }

    private async void BTNFav_Clicked(object sender, EventArgs e)
    {
        await Shell.Current.GoToAsync(nameof(FavPage));
    }
}