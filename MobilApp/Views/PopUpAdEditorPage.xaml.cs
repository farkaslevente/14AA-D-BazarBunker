using CommunityToolkit.Maui.Views;
using System.Windows.Input;

namespace MobilApp_Szakdolgozat.Views;

public partial class PopUpAdEditorPage : Popup
{
	public ICommand editCommand { get; set; }
	public PopUpAdEditorPage()
	{
		InitializeComponent();		

	}
}