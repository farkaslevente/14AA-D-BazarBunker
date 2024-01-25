
namespace MobilApp_Szakdolgozat
{
    public partial class AppShell : Shell
    {
        public AppShell()
        {
            InitializeComponent();
            Init();
        }

        private void Init()
        {
            Main_TabBar.CurrentItem = MainSearch;
        }
    }
}