using MobilApp_Szakdolgozat.Views;
using MobilApp_Szakdolgozat.ViewModels;

namespace MobilApp_Szakdolgozat
{
    public partial class AppShell : Shell
    {
        public bool LoginVisible { get; set; }
        public bool LoggedInVisible { get; set; }
        public AppShell()
        {            
            InitializeComponent();
            UpdateShellContentVisibility();
            ShellViewModel shellViewModel = new ShellViewModel();
            //shellViewModel.VisibilityLP();
            //this.BindingContext  = shellViewModel;            
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
            Routing.RegisterRoute(nameof(NewPage1), typeof(NewPage1));



        }

        public async void UpdateShellContentVisibility()
        {
            //Main_TabBar.Items.Clear();            
            string LoggedIn = SecureStorage.GetAsync("userId").Result;
            if (LoggedIn != null)
            {
                await Task.Delay(300);
                Main_TabBar.IsEnabled = false;
                Main_TabBar.IsVisible = false;
                Proba_Tabbar.IsVisible = true;
                Proba_Tabbar.IsEnabled = true;
            }
            else
            {
                await Task.Delay(300);
                Main_TabBar.IsEnabled = true;
                Main_TabBar.IsVisible = true;
                Proba_Tabbar.IsVisible = false;
                Proba_Tabbar.IsEnabled = false;
            }
            //OnPropertyChanged(nameof(LoginVisible));
            //OnPropertyChanged(nameof(LoggedInVisible));

        }        
        //    ShellViewModel shellViewModel = new ShellViewModel();
        //    this.BindingContext= shellViewModel;
        //    shellViewModel.VisibilityLP();
        

    private void Init()
        {
           Main_TabBar.CurrentItem = MainSearch;
        }
    }
}