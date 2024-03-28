using MobilApp_Szakdolgozat.ViewModels;

namespace MobilApp_Szakdolgozat.Views;

public partial class AdDetailsPage : ContentPage
{
	public AdDetailsPage()
	{
        startTimer();
    }

    private async Task startTimer()
    {
        this.BindingContext = new AdDetailsViewModel();
        await Task.Delay(3000);
        InitializeComponent();
    }
}