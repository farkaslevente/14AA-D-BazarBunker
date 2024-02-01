namespace MobilApp_Szakdolgozat.Views;

public partial class ProfilePage : ContentPage
{
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
    }

    private void NameSaveBTN_Clicked(object sender, EventArgs e)
    {
        NameChangeBTN.IsVisible = true;
        NameSaveBTN.IsVisible = false;
        NameLB.Text = NameEntry.Text;
    }
}