using Microsoft.Playwright;
using Microsoft.Playwright.TestAdapter; 
using Microsoft.VisualStudio.TestTools.UnitTesting; 
using Navy.MsTest.Reports;
using Navy.Playwright;
using System.Threading.Tasks; 

namespace UI.Common
{
    public class TestBase : ReportTestClass 
    {  
        public IPlaywright PlayWright; 
        public IPage Page { get; private set; }

        [TestInitialize]
        public async Task TestBaseInitAsync() 
        {
            PlayWright = await Playwright.CreateAsync();
            var BrowserName = PlaywrightSettingsProvider.BrowserName;
            var BrowserType = PlayWright[BrowserName];
            var Browser = await BrowserType.LaunchAsync(new BrowserTypeLaunchOptions()
            {
#if DEBUG
                Headless = false
#endif
            });
            Browser.SetInfo(Logger, Report);

            var Context = await Browser.NewContextAsync();
            Page = await Context.NewPageAsync();
        }
    }
}