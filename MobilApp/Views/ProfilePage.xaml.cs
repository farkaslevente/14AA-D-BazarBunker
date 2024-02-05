namespace MobilApp_Szakdolgozat.Views;

public partial class ProfilePage : ContentPage
{
    bool Saved = false;
	public ProfilePage()
	{
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

    private async void LoginBTN_Clicked(object sender, EventArgs e)
    {
        await Shell.Current.GoToAsync("login");
    }
}