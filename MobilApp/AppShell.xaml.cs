using MobilApp_Szakdolgozat.Views;
using MobilApp_Szakdolgozat.ViewModels;

namespace MobilApp_Szakdolgozat
{
    //lehet jól jön: https://stackoverflow.com/questions/77086642/how-to-update-the-tab-bar-in-net-maui
    //               https://dev.to/dotnet/hide-shell-flyout-items-and-tabs-in-xamarin-forms-1agi
    public partial class AppShell : Shell
    {
        public bool LoginVisible { get; set; }
        public bool LoggedInVisible { get; set; }
        public AppShell()
        {

            InitializeComponent();
            ShellViewModel shellViewModel = new ShellViewModel();
            this.BindingContext = shellViewModel;
            Routing.RegisterRoute(nameof(LoginPage), typeof(LoginPage));
            Routing.RegisterRoute(nameof(RegisterPage), typeof(RegisterPage));
            Routing.RegisterRoute(nameof(ForgottenPwdPage), typeof(ForgottenPwdPage));
            Routing.RegisterRoute(nameof(ProfilePage), typeof(ProfilePage));
            Routing.RegisterRoute(nameof(MainPage), typeof(MainPage));
            Routing.RegisterRoute(nameof(PPCatalogPage), typeof(PPCatalogPage));
            Routing.RegisterRoute(nameof(AdsPage), typeof(AdsPage));
            Routing.RegisterRoute(nameof(AdDetailsPage), typeof(AdDetailsPage));
            Routing.RegisterRoute(nameof(MessagesPage), typeof(MessagesPage));
            Routing.RegisterRoute(nameof(ConversationsPage), typeof(ConversationsPage));
            Routing.RegisterRoute(nameof(SearchPage), typeof(SearchPage));
            Routing.RegisterRoute(nameof(NewPage1), typeof(NewPage1));
            Routing.RegisterRoute(nameof(FavPage), typeof(FavPage));
            Routing.RegisterRoute(nameof(MyAdsPage), typeof(MyAdsPage));
            Routing.RegisterRoute(nameof(NewAdPage), typeof(NewAdPage));


        }
    }
}