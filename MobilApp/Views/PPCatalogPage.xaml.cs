
using MobilApp_Szakdolgozat.Models;
using MobilApp_Szakdolgozat.ViewModels;
using MobilApp_Szakdolgozat.Views;
namespace MobilApp_Szakdolgozat.Views;

public partial class PPCatalogPage : ContentPage
{
    ProfilePage profilePage;
    public static string source;
    public PPCatalogPage()
		{				
		InitializeComponent();		
	}

    private void SelectedSource()
    {
        source = ppCW.SelectedItem.ToString();        
    }
}