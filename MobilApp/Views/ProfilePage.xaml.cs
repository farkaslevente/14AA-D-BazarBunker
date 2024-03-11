using MobilApp_Szakdolgozat.ViewModels;

namespace MobilApp_Szakdolgozat.Views;

public partial class ProfilePage : ContentPage
{
    bool Saved = false;    
	public ProfilePage()
	{
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
        await Shell.Current.GoToAsync("ppCatalog");
    }

    private void BTNLogout_Clicked(object sender, EventArgs e)
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