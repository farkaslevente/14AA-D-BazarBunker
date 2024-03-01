namespace MobilApp_Szakdolgozat.Views;
using MobilApp_Szakdolgozat.ViewModels;

public partial class RegisterPage : ContentPage
{
	public RegisterPage()
	{
        
        InitializeComponent();
        this.BindingContext = new RegisterViewModel();
    }
}