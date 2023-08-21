
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Navy.MsTest.Reports;
using Navy.Playwright;
using Microsoft.Playwright;
using Navy.Playwrite.Controls;

namespace Maps.Google
{
}
namespace Maps.Google.Search
{

    public partial class SearchPage : WebPage
    {
        /// <summary>'Search text'</summary>
        public Control SearchText => Control.Create<Control>(Page.Locator(@"xpath=//*[@id=""APjFqb""]"), new Meta("SearchText", "Search text", ""));
        /// <summary>'Search button'</summary>
        public ControlCollection<Control> SearchButtons => new ControlCollection<Control>(Page.Locator(@"xpath=.//input[@value='Поиск в Google']"), new Meta("SearchButtons", "Search button", ""));
    }
}

