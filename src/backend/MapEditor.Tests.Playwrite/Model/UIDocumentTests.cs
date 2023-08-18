using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.IO;
using Navy.MsTest; 
using MapEditor.Core.Modals;

namespace Navi.UIMapEditor.Modal.Tests
{
    [TestClass()]
    public class UIDocumentTests : TestClass
    {

        
        [TestMethod()]
        public void GenerateCode()
        {
            var doc = new UiMap();
            var root = CreateRootAssembly(doc);
            var assembly = CreateAllAssembly(root); 
            var GoogleWindow = CreateGoogleElement(assembly);
            CreateMainMenuControl(GoogleWindow);
            CreateNavPanelControl(GoogleWindow); 
            CreateMWindowElement(assembly);
            TestCode(root, "GenerateCode.txt");
        }


        [TestMethod()]
        public void GenerateCodeFolderAssembly()
        {
            var doc = new UiMap();
            var root = CreateRootAssembly(doc);
            var assembly = CreateAllAssembly(root);
            var folderAssembly = CreateAssembly(assembly, "Folder");
            folderAssembly.IsFolder = true;
            var GoogleWindow = CreateGoogleElement(folderAssembly);

            TestCode(root, "GenerateCodeFolderAssembly.txt");
        }

        private void TestCode(UIAssembly root, string file)
        {
            var coder = new NavyWindowsFramework();
            var actual = coder.GenerateCode(root);
            Logger.WriteLine(actual);
            // File.WriteAllText("Sources\\" + file, actual, Encoding.Default);
            var expected = File.ReadAllText("Sources\\" + file, Encoding.Default); 
            var actualLines = NotNullLines(actual);
            var expectedLines = NotNullLines(expected); 
            for (int i = 0; i < actualLines.Count; i++)
            {
                var expectedLine = expectedLines.Count > i ? expectedLines[i] : string.Empty;
                var actualLine = actualLines[i];
                Assert.AreEqual(expectedLine.Trim(), actualLine.Trim(), "Строка {0}", i);
            }
            Assert.AreEqual(expectedLines.Count, actualLines.Count, "Количество строк в коде не совпадает");
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

        [TestMethod()]
        public void GenerateCodeWithManyElements()
        {
            var doc = new UiMap();
            var root = CreateRootAssembly(doc);
            var assembly = CreateAllAssembly(root);
            var GoogleWindow = CreateGoogleElement(assembly);
            var elem1 = CreateControl(GoogleWindow, UIControlType.Menu, "Меню");
            var elem2  = CreateControl(elem1, UIControlType.MenuItem, "Подменю");
            TestCode(root, "GenerateCodeWithManyElements.txt");
        }
          


        [TestMethod()]
        public void GenerateCodeWithFolder()
        {
            var doc = new UiMap();
            var root = CreateRootAssembly(doc);
            var assembly = CreateAllAssembly(root);
            var GoogleWindow = CreateGoogleElement(assembly);
            var elem1 = CreateControl(GoogleWindow, UIControlType.Menu, "Меню");
            elem1.IsFolder = true;
            var elem2 = CreateControl(elem1, UIControlType.MenuItem, "Подменю");
            TestCode(root, "GenerateCodeWithHidden.txt");
        }


        [TestMethod()]
        public void GenerateCodeWithLink()
        {
            var doc = new UiMap();
            var root = CreateRootAssembly(doc);
            var assembly = CreateAllAssembly(root);
            var ModalWindow = CreateMWindowElement(assembly);
            var GoogleWindow = CreateGoogleElement(assembly);
            var elem1 = CreateControl(GoogleWindow, UIControlType.Menu, "Меню");
            var elem2 = CreateControl(elem1, UIControlType.MenuItem, "РедакторМодели");
            elem2.Link = ModalWindow;
            TestCode(root, "GenerateCodeWithLink.txt");
        }

               



        private static UIAssembly CreateAllAssembly(UIAssembly root)
        {
            var assembly = new UIAssembly("All", root);
            return assembly;
        }


        private static UIAssembly CreateAssembly(UIAssembly parent, string name)
        {
            return new UIAssembly(name, parent);
        }

        private static UIAssembly CreateRootAssembly(UiMap doc)
        {
            var root = new UIAssembly(doc, "Navy.Maps");
            return root;
        }

        private static void CreateNavPanelControl(UIElement GoogleWindow)
        {
            var navPanel = new UIControl(GoogleWindow, "NavPanel", "Панель навигации", UIControlType.Custom.ToString(), uid: Guid.Empty);
        }


        private UIControl CreateControl(UIControl parent, UIControlType controlType, string name)
        {
            return CreateControl(null, controlType, name, parent);
        }

        private UIControl CreateControl(UIElement element, UIControlType controlType, string name)
        {
            return CreateControl(element, controlType, name, null);
        }

        private UIControl  CreateControl(UIElement element, UIControlType controlType, string name, UIControl parent)
        {
            var control = new UIControl(element, name, string.Format("Элемент '{0}'", name), controlType.ToString(), parent, uid: Guid.Empty);
            if (name != null)
                control.Properties.Add(new UIControlProperty(UISearchProperty.Name.ToString(), name));
            return control;
        }

        private static void CreateMainMenuControl(UIElement GoogleWindow)
        {
            var mainMenu = new UIControl(GoogleWindow, "MainMenu", "Главное меню", UIControlType.Menu.ToString());
            mainMenu.Properties.Add(new UIControlProperty(UISearchProperty.Name.ToString(), "Menu", SearchType.Contains));
            mainMenu.Properties.Add(new UIControlProperty(UISearchProperty.AutomationId.ToString(), "MenuId"));
            
        }

        private static UIElement CreateMWindowElement(UIAssembly assembly)
        {
            var ModalWindow = new UIElement("ModalWindow", assembly, UIControlType.Window.ToString(), "Редактор модели", uid: Guid.Empty);
            ModalWindow.Properties.Add(new UIControlProperty(UISearchProperty.Name.ToString(), "ModalWindow"));
            return ModalWindow;
        }

        private static UIElement CreateGoogleElement(UIAssembly assembly)
        {
            var GoogleWindow = new UIElement("GoogleTerminal", assembly, UIControlType.Window.ToString(), "ТНА Терминал", Guid.Empty);
            GoogleWindow.Properties.Add(new UIControlProperty(UISearchProperty.Name.ToString(), "Google"));
            return GoogleWindow;
        }
    }
}
