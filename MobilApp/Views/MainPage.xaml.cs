using MobilApp_Szakdolgozat.ViewModels;

namespace MobilApp_Szakdolgozat.Views;

public partial class MainPage : ContentPage
{
    public string classification { get; set; }
	public MainPage()
	{
        ShellViewModel shellViewModel = new ShellViewModel();
        shellViewModel.VisibilityLP();
        InitializeComponent();        
        classification = "";
        
    }

    private async void BTNUni_Clicked(object sender, EventArgs e)
    {
        classification = "uni";
        await Shell.Current.GoToAsync(nameof(AdsPage));
    }

    private async void BTNMiddleSch_Clicked(object sender, EventArgs e)
    {
        classification = "middleSch";
        await Shell.Current.GoToAsync(nameof(AdsPage));
    }

    private async void BTNPrimarySch_Clicked(object sender, EventArgs e)
    {
        classification = "primarySch";
        await Shell.Current.GoToAsync(nameof(AdsPage));
    }

    private async void BTNBooks_Clicked(object sender, EventArgs e)
    {
        classification = "books";
        await Shell.Current.GoToAsync(nameof(AdsPage));
    }

    private async void BTNStationeries_Clicked(object sender, EventArgs e)
    {
        classification = "stationeries";
        await Shell.Current.GoToAsync(nameof(AdsPage));
    }

    private async void BTNTools_Clicked(object sender, EventArgs e)
    {
        classification = "tools";
        await Shell.Current.GoToAsync(nameof(AdsPage));
    }

    private async void BTNSearch_Clicked(object sender, EventArgs e)
    {
        await Shell.Current.GoToAsync(nameof(SearchPage));
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
        await Shell.Current.GoToAsync(nameof(MyAdsPage));
    }

    private async void BTNSupport_Clicked(object sender, EventArgs e)
    {
        await Shell.Current.GoToAsync(nameof(SupportPage));
    }

    private async void BTNAdmin_Clicked(object sender, EventArgs e)
    {
        await Shell.Current.GoToAsync(nameof(NewPage1));
    }

    private async void BTNMainPage_Clicked(object sender, EventArgs e)
    {
        await Shell.Current.GoToAsync(nameof(MainPage));
    }

    private async void BTNFav_Clicked(object sender, EventArgs e)
    {
        await Shell.Current.GoToAsync(nameof(FavPage));
    }
}