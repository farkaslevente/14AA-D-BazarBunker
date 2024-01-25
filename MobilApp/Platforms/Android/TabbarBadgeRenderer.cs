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

//Useful Links:
//    https://support.syncfusion.com/kb/article/14465/how-to-set-badge-in-net-maui-tabview-header
//    https://www.youtube.com/watch?v=XSg_Fa4ThRM&t=426s

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
                    badgeDrawable.SetVisible(true);
                    badgeDrawable.Number = count;
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
