using MobilApp_Szakdolgozat.Views;
namespace MobilApp_Szakdolgozat
{
    public partial class AppShell : Shell
    {
        public AppShell()
        {
            InitializeComponent();
            Init();
            Routing.RegisterRoute("login", typeof(LoginPage));
            Routing.RegisterRoute("messages", typeof(MessagesPage));
            Routing.RegisterRoute("advertisments", typeof(AdsPage));
            Routing.RegisterRoute("searchDetails", typeof(SearchPage));
            Routing.RegisterRoute("profileDetails", typeof(ProfilePage));
            Routing.RegisterRoute("register", typeof(RegisterPage));
            Routing.RegisterRoute("ppCatalog", typeof(PPCatalogPage));
            Routing.RegisterRoute("forgottenPwd", typeof(ForgottenPwdPage));
        }

        private void Init()
        {
            Main_TabBar.CurrentItem = MainSearch;
        }
    }
}