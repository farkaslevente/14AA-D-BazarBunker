namespace MobilApp_Szakdolgozat.Views;

public partial class MainPage : ContentPage
{
    public string classification { get; set; }
	public MainPage()
	{
		InitializeComponent();
        classification = "";
        
    }
    private async void SearchBTN_Clicked(object sender, EventArgs e)
    {
        await Shell.Current.GoToAsync("searchDetails");
    }

    private async void BTNUni_Clicked(object sender, EventArgs e)
    {
        classification = "uni";
        await Shell.Current.GoToAsync("advertisments");
    }

    private async void BTNMiddleSch_Clicked(object sender, EventArgs e)
    {
        classification = "middleSch";
        await Shell.Current.GoToAsync("advertisments");
    }

    private async void BTNPrimarySch_Clicked(object sender, EventArgs e)
    {
        classification = "primarySch";
        await Shell.Current.GoToAsync("advertisments");
    }

    private async void BTNBooks_Clicked(object sender, EventArgs e)
    {
        classification = "books";
        await Shell.Current.GoToAsync("advertisments");
    }

    private async void BTNStationeries_Clicked(object sender, EventArgs e)
    {
        classification = "stationeries";
        await Shell.Current.GoToAsync("advertisments");
    }

    private async void BTNTools_Clicked(object sender, EventArgs e)
    {
        classification = "tools";
        await Shell.Current.GoToAsync("advertisments");
    }
}