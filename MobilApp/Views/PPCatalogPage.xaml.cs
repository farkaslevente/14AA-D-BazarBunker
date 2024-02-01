
namespace MobilApp_Szakdolgozat.Views;

public partial class PPCatalogPage : ContentPage
{
	public static List<string> ppList;
	public PPCatalogPage()
	{
		InitializeComponent();
		Init();
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