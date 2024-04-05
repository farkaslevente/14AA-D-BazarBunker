using CommunityToolkit.Maui.Views;
using System.Windows.Input;

namespace MobilApp_Szakdolgozat.Views;

public partial class PopUpAdEditorPage : Popup
{
//	<toolkit:Popup.BindingContext>
//        <vm:NewAdViewModel/>
//    </toolkit:Popup.BindingContext>
	public PopUpAdEditorPage()
	{
		startup();
				

	}

    private async void startup()
    {
		this.BindingContext = new NewAdPage();
		await Task.Delay(2000);
        InitializeComponent();
    }
}