using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.IO;
using Navy.MsTest; 
using MapEditor.Core.Models;

namespace Navi.UIMapEditor.Model.Tests
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
            var tnaWindow = CreateTnaElement(assembly);
            CreateMainMenuControl(tnaWindow);
            CreateNavPanelControl(tnaWindow); 
            CreateMNavigatorElement(assembly);
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
            var tnaWindow = CreateTnaElement(folderAssembly);

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
            var tnaWindow = CreateTnaElement(assembly);
            var elem1 = CreateControl(tnaWindow, UIControlType.Menu, "Меню");
            var elem2  = CreateControl(elem1, UIControlType.MenuItem, "Подменю");
            TestCode(root, "GenerateCodeWithManyElements.txt");
        }
          


        [TestMethod()]
        public void GenerateCodeWithFolder()
        {
            var doc = new UiMap();
            var root = CreateRootAssembly(doc);
            var assembly = CreateAllAssembly(root);
            var tnaWindow = CreateTnaElement(assembly);
            var elem1 = CreateControl(tnaWindow, UIControlType.Menu, "Меню");
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
            var modelWindow = CreateMNavigatorElement(assembly);
            var tnaWindow = CreateTnaElement(assembly);
            var elem1 = CreateControl(tnaWindow, UIControlType.Menu, "Меню");
            var elem2 = CreateControl(elem1, UIControlType.MenuItem, "РедакторМодели");
            elem2.Link = modelWindow;
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

        private static void CreateNavPanelControl(UIElement tnaWindow)
        {
            var navPanel = new UIControl(tnaWindow, "NavPanel", "Панель навигации", UIControlType.Custom.ToString(), uid: Guid.Empty);
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

        private static void CreateMainMenuControl(UIElement tnaWindow)
        {
            var mainMenu = new UIControl(tnaWindow, "MainMenu", "Главное меню", UIControlType.Menu.ToString());
            mainMenu.Properties.Add(new UIControlProperty(UISearchProperty.Name.ToString(), "Menu", SearchType.Contains));
            mainMenu.Properties.Add(new UIControlProperty(UISearchProperty.AutomationId.ToString(), "MenuId"));
            
        }

        private static UIElement CreateMNavigatorElement(UIAssembly assembly)
        {
            var modelWindow = new UIElement("ModelNavigator", assembly, UIControlType.Window.ToString(), "Редактор модели", uid: Guid.Empty);
            modelWindow.Properties.Add(new UIControlProperty(UISearchProperty.Name.ToString(), "ModelNavigator"));
            return modelWindow;
        }

        private static UIElement CreateTnaElement(UIAssembly assembly)
        {
            var tnaWindow = new UIElement("TNATerminal", assembly, UIControlType.Window.ToString(), "ТНА Терминал", Guid.Empty);
            tnaWindow.Properties.Add(new UIControlProperty(UISearchProperty.Name.ToString(), "TNA"));
            return tnaWindow;
        }
    }
}
