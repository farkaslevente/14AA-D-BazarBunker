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

    private async void BTNanimation_Clicked(object sender, EventArgs e)
    {
        await contact.TranslateTo(0, -300, 500);        
    }

    private async void BTNanimationBack_Clicked(object sender, EventArgs e)
    {
        await contact.TranslateTo(0, 300, 500);
    }
}