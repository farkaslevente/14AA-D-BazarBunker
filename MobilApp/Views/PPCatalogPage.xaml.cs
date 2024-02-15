
using MobilApp_Szakdolgozat.Models;
using MobilApp_Szakdolgozat.ViewModels;
//using static Android.Graphics.ColorSpace;
using MobilApp_Szakdolgozat.Views;
namespace MobilApp_Szakdolgozat.Views;

public partial class PPCatalogPage : ContentPage
{
    ProfilePage profilePage;
    public static string source;
    public PPCatalogPage()
		{				
		InitializeComponent();
		//SelectedSource();
	}

    private void SelectedSource()
    {
        source = ppCW.SelectedItem.ToString();        
        profilePage.PPSource = source;
    }
}