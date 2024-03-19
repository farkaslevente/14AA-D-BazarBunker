namespace MobilApp_Szakdolgozat.Views;
using MobilApp_Szakdolgozat.Services;

public partial class MessagesPage : ContentPage, IDisposable
{    
	public MessagesPage()
	{
		InitializeComponent();
        BadgeCounterService.CountChanged += OnCountChanged;
	}

    private void OnCountChanged(object sender, int newCount)
    {
        proba.Text = $"Welcome to .NET MAUI!\nCounter Count: {newCount}";
    }

    private void IncreaseBadgeCountClicked(object sender, EventArgs e)
    {
        BadgeCounterService.SetCount(BadgeCounterService.Count+1);
    }
    private void DecreaseBadgeCountClicked(object sender, EventArgs e)
    {
        BadgeCounterService.SetCount(BadgeCounterService.Count - 1);
    }    

    public void Dispose()
    {
        BadgeCounterService.CountChanged -= OnCountChanged;
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

    private async void BTNMainPage_Clicked(object sender, EventArgs e)
    {
        await Shell.Current.GoToAsync(nameof(MainPage));
    }

    private async void BTNFav_Clicked(object sender, EventArgs e)
    {
        await Shell.Current.GoToAsync(nameof(FavPage));
    }
}