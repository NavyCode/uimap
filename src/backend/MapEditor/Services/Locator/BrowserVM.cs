#region

using System.Diagnostics;
using System.IO;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Remote;

#endregion

namespace MapEditor.Locator
{
    public class BrowserVm 
    {
        public IWebDriver Driver;
        public void OpenBrowser()
        {
                var driverPath = Path.GetDirectoryName(Process.GetCurrentProcess().MainModule.FileName);

                var driverOptions = new ChromeOptions()
                {
                    AcceptInsecureCertificates = true,
                };
                driverOptions.AddArgument("--no-sandbox");
                driverOptions.AddArgument("--disable-blink-features=BlockCredentialedSubresources");
                driverOptions.AddArgument("--disable-print-preview");
                driverOptions.AddArgument("--ignore-certificate-errors");
             
                    driverOptions.DebuggerAddress = ConnectionString;
                    Driver = new RemoteWebDriver(driverOptions);
            Driver.Manage().Timeouts().PageLoad = TimeSpan.FromMinutes(1);
            Driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(10);
            Driver.Manage().Timeouts().AsynchronousJavaScript = TimeSpan.FromSeconds(10);

            TreeWalker = new TreeWalker(Driver);
        } 

        void LoadChildren()
        {
            foreach (var child in TreeWalker.GetChildren())
            {
                Children.Add(new BrowserTreeItemViewModel(child, this, null));
            }
        }

        public TreeWalker TreeWalker; 
         

        public List<BrowserTreeItemViewModel> Children { get; set; } = new List<BrowserTreeItemViewModel>();  

        public string ConnectionString { get; set; } = "127.0.0.1:9222"; 
    }
}