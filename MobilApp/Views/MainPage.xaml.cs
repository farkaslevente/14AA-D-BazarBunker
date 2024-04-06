using MobilApp_Szakdolgozat.ViewModels;

namespace MobilApp_Szakdolgozat.Views;

public partial class MainPage : ContentPage
{
    private SearchViewModel searchViewModel;
    private static string _mainCategory;
    public static string mainCategory
    {
        get => _mainCategory;
        set
        {
            if (_mainCategory != value)
            {
                _mainCategory = value;
            }
        }
    }
    public MainPage()
	{
        ShellViewModel shellViewModel = new ShellViewModel();
        searchViewModel = new SearchViewModel();
        shellViewModel.VisibilityLP();        
        InitializeComponent();        


    }

    private void BTNUni_Clicked(object sender, EventArgs e)
    {        
        mainCategory = "Egyetemist�knak";
        BTNUni.Command = searchViewModel.searchCommand;        
    }

    private void BTNMiddleSch_Clicked(object sender, EventArgs e)
    {        
        mainCategory = "K�z�piskol�soknak";
        BTNMiddleSch.Command = searchViewModel.searchCommand;
    }

    private void BTNPrimarySch_Clicked(object sender, EventArgs e)
    {        
        mainCategory = "�ltal�nos iskol�soknak";
        BTNPrimarySch.Command = searchViewModel.searchCommand;
    }

    private void BTNBooks_Clicked(object sender, EventArgs e)
    {        
        mainCategory = "K�telez� olvasm�ny";
        BTNBooks.Command = searchViewModel.searchCommand;
    }

    private void BTNStationeries_Clicked(object sender, EventArgs e)
    {        
        mainCategory = "�r�szerek";
        BTNStationeries.Command = searchViewModel.searchCommand;
    }

    private void BTNTools_Clicked(object sender, EventArgs e)
    {        
        mainCategory = "Kell�kek";
        BTNTools.Command = searchViewModel.searchCommand;
    }

    private async void BTNSearch_Clicked(object sender, EventArgs e)
    {
        mainCategory = null;
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