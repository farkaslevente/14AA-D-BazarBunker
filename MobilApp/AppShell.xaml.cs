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
            Routing.RegisterRoute("register", typeof(RegisterPage));
            Routing.RegisterRoute("forgottenPwd", typeof(ForgottenPwdPage));
            Routing.RegisterRoute("profileDetails", typeof(ProfilePage));
            Routing.RegisterRoute("ppCatalog", typeof(PPCatalogPage));
            Routing.RegisterRoute("advertisements", typeof(AdsPage));
            Routing.RegisterRoute("messages", typeof(MessagesPage));
            Routing.RegisterRoute("conversations", typeof(ConversationsPage));
            Routing.RegisterRoute("searchDetails", typeof(SearchPage));
            
            
            
            
        }

        private void Init()
        {
            Main_TabBar.CurrentItem = MainSearch;
        }
    }
}