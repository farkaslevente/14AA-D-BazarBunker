using MobilApp_Szakdolgozat.Views;
using MobilApp_Szakdolgozat.ViewModels;

namespace MobilApp_Szakdolgozat
{
    public partial class AppShell : Shell
    {
        public AppShell()
        {
            ShellViewModel shellViewModel = new ShellViewModel();
            shellViewModel.VisibilityLP();
            InitializeComponent();
            Init();            
            Routing.RegisterRoute("loginDetails", typeof(LoginPage));
            Routing.RegisterRoute("registerDetails", typeof(RegisterPage));
            Routing.RegisterRoute("forgottenPwdDetails", typeof(ForgottenPwdPage));
            Routing.RegisterRoute("profileDetails", typeof(ProfilePage));
            Routing.RegisterRoute("ppCatalog", typeof(PPCatalogPage));
            Routing.RegisterRoute(nameof(AdsPage), typeof(AdsPage));
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