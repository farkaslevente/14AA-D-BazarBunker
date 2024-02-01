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
}