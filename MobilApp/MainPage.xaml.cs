namespace MobilApp_Szakdolgozat
{
    public partial class MainPage : ContentPage
    {
        public MainPage()
        {
            InitializeComponent();
        }

        private async void SearchBTN_Clicked(object sender, EventArgs e)
        {
            await Shell.Current.GoToAsync("searchDetails");
        }
    }
}