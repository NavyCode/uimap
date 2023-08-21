using Maps.Google.Search;
using Microsoft.Playwright;
using Microsoft.Playwright.TestAdapter; 
using Microsoft.VisualStudio.TestTools.UnitTesting; 
using Navy.MsTest.Reports;
using Navy.Playwright;
using System.Threading.Tasks; 

namespace UI.Common
{
    [TestClass]
    public class GoogleTests : TestBase
    {  
        [TestMethod]
        public async Task SearchIngoAsync()
        {
            var google = await Page.GotoAsync("https://google.com");
            var map = Page.As<SearchPage>();
            await map.SearchText.FillAsync("nuget.org");
            var searchButton = await map.SearchButton.WaitFirstAsync((p) => p.IsVisibleAsync().Result);
            searchButton.ClickAsync();
        }
    }
}