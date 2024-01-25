using Microsoft.Maui.Controls.Handlers.Compatibility;
using Microsoft.Maui.Controls.Platform.Compatibility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MobilApp_Szakdolgozat.Platforms.Android
{
    public class TabbarBadgeRenderer: ShellRenderer
    {
        public TabbarBadgeRenderer()
        {
            
        }

        protected override IShellBottomNavViewAppearanceTracker CreateBottomNavViewAppearanceTracker(ShellItem shellItem)
        {
            return base.CreateBottomNavViewAppearanceTracker(shellItem);
        }
    }
}
