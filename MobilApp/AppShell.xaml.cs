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
            Routing.RegisterRoute("messagesDetails", typeof(MessagesPage));
            Routing.RegisterRoute("sellerMessages", typeof(SellerMessagesPage));
            Routing.RegisterRoute("adDetails", typeof(AdsPage));
            Routing.RegisterRoute("searchDetails", typeof(SearchPage));
            Routing.RegisterRoute("profileDetails", typeof(ProfilePage));
            Routing.RegisterRoute("register", typeof(RegisterPage));
        }

        private void Init()
        {
            Main_TabBar.CurrentItem = MainSearch;
        }
    }
}