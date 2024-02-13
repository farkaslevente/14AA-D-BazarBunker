
using MobilApp_Szakdolgozat.Models;
using MobilApp_Szakdolgozat.ViewModels;
//using static Android.Graphics.ColorSpace;

namespace MobilApp_Szakdolgozat.Views;

public partial class PPCatalogPage : ContentPage
{	
	//public PictureCatalogModel PCModel { get; private set; }

	public List<string> ppList = new List<string>();
    public PPCatalogPage()
		{				
		InitializeComponent();
		
		//Init();
	}

    private void Init()
    {
		ppList = new List<string>();
		for (int i = 0; i < 50; i++)
		{
			ppList.Add(i.ToString());
		}
		ppCW.ItemsSource = ppList;
	}
}