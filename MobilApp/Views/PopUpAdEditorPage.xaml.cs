using CommunityToolkit.Maui.Views;
using System.Windows.Input;

using MobilApp_Szakdolgozat.ViewModels;
using MobilApp_Szakdolgozat.Models;
namespace MobilApp_Szakdolgozat.Views;

public partial class PopUpAdEditorPage : Popup
{
//	<toolkit:Popup.BindingContext>
//        <vm:NewAdViewModel/>
//    </toolkit:Popup.BindingContext>
	public PopUpAdEditorPage(AdsModel ad)
	{
		startup(ad);
				

	}

    private async void startup(AdsModel ad)
    {
		this.BindingContext = new PopUpViewModel(ad);
		//await Task.Delay(3000);
        InitializeComponent();
    }
}