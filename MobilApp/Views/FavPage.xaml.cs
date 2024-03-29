using MobilApp_Szakdolgozat.ViewModels;

namespace MobilApp_Szakdolgozat.Views;

public partial class FavPage : ContentPage
{
	public FavPage()
	{
		InitializeComponent();
		this.BindingContext = new FavoriteViewModel();
	}
}