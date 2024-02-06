
using MobilApp_Szakdolgozat.Models;
//using static Android.Graphics.ColorSpace;

namespace MobilApp_Szakdolgozat.Views;

public partial class PPCatalogPage : ContentPage
{	
	//public PictureCatalogModel PCModel { get; private set; }
	List<PictureCatalogModel> pictures = new List<PictureCatalogModel>();	
    public PPCatalogPage()
    {
        InitializeComponent();
		//PCModel = new PictureCatalogModel();
        this.BindingContext = pictures;
       

        pictures = PictureCatalogModel.select();
        ppCW.ItemsSource = pictures;

    }
 //   public PPCatalogPage(PictureCatalogModel model)
	//{
		
	//	PCModel = model;
	//	this.BindingContext = PCModel;
	//	id = model.Id;

	//	pictures = PictureCatalogModel.select();
	//	ppCW.ItemsSource = pictures;
	//	//Init();
	//}

  //  private void Init()
  //  {
		//ppList = new List<string>();
		//for (int i = 0; i < 50; i++)
		//{
		//	ppList.Add(i.ToString());
		//}
		//ppCW.ItemsSource = ppList;
  //  }
}