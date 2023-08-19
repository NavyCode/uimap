using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.IO;
using Navy.MsTest;
using MapEditor;
using MapEditor.Playwright;
using System.Reflection;

namespace Navi.UIMapEditor.Modal.Tests
{
    [TestClass()]
    public class GenDocumentTests : TestClass
    {

        
        [TestMethod()]
        public void GenerateCode()
        {
            var doc = new Map();
            var root = CreateRootNameSpace(doc);
            var NameSpace = CreateSearchNameSpace(root); 
            var GoogleWindow = CreateGoogleMainPage(NameSpace);
            CreateSearchTextBoxControl(GoogleWindow);
            CreateSearchButtonControl(GoogleWindow); 
            CreateSearchResultPage(NameSpace);
            TestCode(root, "GenerateCode.txt");
        }


        //[TestMethod()]
        //public void GenerateCodeFolderNameSpace()
        //{
        //    var doc = new Map();
        //    var root = CreateRootNameSpace(doc);
        //    var NameSpace = CreateSearchNameSpace(root);
        //    var folderNameSpace = CreateNameSpace(NameSpace, "Folder");
        //    folderNameSpace.IsFolder = true;
        //    var GoogleWindow = CreateGoogleMainPage(folderNameSpace);

        //    TestCode(root, "GenerateCodeFolderNameSpace.txt");
        //}

        private void TestCode(NameSpace root, string file)
        { 
            var coder = new NavyPlaywrightFramework();
            var actual = coder.GenerateCode(root);
            TestContext.WriteLine(actual);
            File.WriteAllText(OutputPath(file), actual, Encoding.UTF8);

            // File.WriteAllText("Sources\\" + file, actual, Encoding.Default);
            //var expected = File.ReadAllText("Sources\\" + file, Encoding.Default); 
            //var actualLines = NotNullLines(actual);
            //var expectedLines = NotNullLines(expected); 
            //for (int i = 0; i < actualLines.Count; i++)
            //{
            //    var expectedLine = expectedLines.Count > i ? expectedLines[i] : string.Empty;
            //    var actualLine = actualLines[i];
            //    Assert.AreEqual(expectedLine.Trim(), actualLine.Trim(), "Строка {0}", i);
            //}
            //Assert.AreEqual(expectedLines.Count, actualLines.Count, "Количество строк в коде не совпадает");
        }

        private static IList<string> NotNullLines(string actual)
        {
            var result = new List<string>();
            foreach(var item in actual.Split(new[] { Environment.NewLine }, StringSplitOptions.RemoveEmptyEntries))
            {
                var remove = item.Replace('\t', ' ');
                if (!string.IsNullOrWhiteSpace(remove))
                    result.Add(remove);
            }
            return result;
        }

        //[TestMethod()]
        //public void GenerateCodeWithManyElements()
        //{
        //    var doc = new Map();
        //    var root = CreateRootNameSpace(doc);
        //    var NameSpace = CreateSearchNameSpace(root);
        //    var GoogleWindow = CreateGoogleMainPage(NameSpace);
        //    var elem1 = CreateControl(GoogleWindow, "Menu", "Меню");
        //    var elem2  = CreateControl(elem1, "MenuItem", "Подменю");
        //    TestCode(root, "GenerateCodeWithManyElements.txt");
        //}
          


        //[TestMethod()]
        //public void GenerateCodeWithFolder()
        //{
        //    var doc = new Map();
        //    var root = CreateRootNameSpace(doc);
        //    var NameSpace = CreateSearchNameSpace(root);
        //    var GoogleWindow = CreateGoogleMainPage(NameSpace);
        //    var elem1 = CreateControl(GoogleWindow, ControlType.Menu, "Меню");
        //    elem1.IsFolder = true;
        //    var elem2 = CreateControl(elem1, ControlType.MenuItem, "Подменю");
        //    TestCode(root, "GenerateCodeWithHidden.txt");
        //}


        //[TestMethod()]
        //public void GenerateCodeWithLink()
        //{
        //    var doc = new Map();
        //    var root = CreateRootNameSpace(doc);
        //    var NameSpace = CreateSearchNameSpace(root);
        //    var ModalWindow = CreateSearchResultPage(NameSpace);
        //    var GoogleWindow = CreateGoogleMainPage(NameSpace);
        //    var elem1 = CreateControl(GoogleWindow, "Menu", "Меню");
        //    var elem2 = CreateControl(elem1, ControlType.MenuItem, "РедакторМодели");
        //    elem2.Link = ModalWindow;
        //    TestCode(root, "GenerateCodeWithLink.txt");
        //}

               



        private static NameSpace CreateSearchNameSpace(NameSpace root)
        {
            return CreateNameSpace("Search", root);
        }


        private static NameSpace CreateNameSpace(string name, NameSpace parent)
        {
            var result = new NameSpace(name, parent);
            parent?.Children.Add(result);
            return result;
        }

        private static NameSpace CreateRootNameSpace(Map doc)
        {
            var root = new NameSpace(doc, "Maps.Google");
            return root;
        }

        private Control CreateSearchButtonControl(Control GoogleWindow)
        {
            return CreateControl(GoogleWindow, "Button", "Search", "Search button", ".//input[@value='Поиск в Google']", null);
        }



        private Control CreateControl(Control parent, string controlType, string name, string comment, string xpath, NameSpace ns)
        {
            var control = new Control()
            {
                NameSpace = ns,
                Comment = comment,
                Name = name,
                Parent = parent,
                ControlType = controlType,
            };
            if (xpath != null)
                control.Properties.Add(new ControlProperty(PwSearchProperties.XPath, name));
            ns?.Controls.Add(control);
            parent?.Children.Add(control);
            return control;
        }

        private Control CreateSearchTextBoxControl(Control GoogleWindow)
        {
            return CreateControl(GoogleWindow, "TextInput", "SearchText", "Search text", "//*[@id=\"APjFqb\"]", null);
            
        }

        private  Control CreateSearchResultPage(NameSpace ns)
        { 
            return CreatePage("SearchResultPage", "Search result", ns);
        }

        private  Control CreateGoogleMainPage(NameSpace ns)
        {
            return CreatePage("SearchPage", "Main page of google", ns);
        }

        Control CreatePage(string name, string comment, NameSpace ns)
        {
            return CreateControl(null, "Page", name, comment, null, ns);
        }
    }
}
