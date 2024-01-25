using Google.Android.Material.Badge;
using Google.Android.Material.BottomNavigation;
using Microsoft.Maui.Controls.Handlers.Compatibility;
using Microsoft.Maui.Controls.Platform.Compatibility;
using Microsoft.Maui.Platform;
using MobilApp_Szakdolgozat.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;



namespace MobilApp_Szakdolgozat.Platforms.Android
{
    public class TabbarBadgeRenderer: ShellRenderer
    {
        protected override IShellBottomNavViewAppearanceTracker CreateBottomNavViewAppearanceTracker(ShellItem shellItem)
        {
            //return base.CreateBottomNavViewAppearanceTracker(shellItem);
            return new BadgeShellTracker(this, shellItem);
        }
    }

    class BadgeShellTracker : ShellBottomNavViewAppearanceTracker
    {        
        private BadgeDrawable? badgeDrawable;
        public BadgeShellTracker(IShellContext shellContext, ShellItem shellItem) : base(shellContext, shellItem)
        {
        }

        public override void SetAppearance(BottomNavigationView bottomView, IShellAppearanceElement appearance)
        {
            base.SetAppearance(bottomView, appearance);
            
            if (badgeDrawable is null)
            {            
                const int messageTBItemIndex = 1;
                badgeDrawable = bottomView.GetOrCreateBadge(messageTBItemIndex);
                UpdateBadge(0);
                BadgeCounterService.CountChanged += OnCountChnaged;
            }
        }       

        private void OnCountChnaged(object sender, int e)
        {
            UpdateBadge(e);
        }
        private void UpdateBadge(int count)
        {
            if (badgeDrawable is not null)
            {
                if (count <= 0)
                {
                    badgeDrawable.SetVisible(false);
                }
                else
                {
                    badgeDrawable.Number = 10;
                    badgeDrawable.BackgroundColor = Colors.Red.ToPlatform();
                    badgeDrawable.BadgeTextColor = Colors.White.ToPlatform();
                }
            }
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
            BadgeCounterService.CountChanged -= OnCountChnaged;
        }
    }
}
