using MobilApp_Szakdolgozat.ViewModels;

namespace MobilApp_Szakdolgozat.Views;

public partial class FavPage : ContentPage
{
	public FavPage()
	{
        startTimer();
    }

    private async Task startTimer()
    {
        this.BindingContext = new FavoriteViewModel();
        await Task.Delay(4000);
        InitializeComponent();
    }
}