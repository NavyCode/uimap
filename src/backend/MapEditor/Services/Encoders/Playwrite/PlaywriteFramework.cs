﻿namespace MapEditor.Playwright
{
    public class NavyPlaywrightFramework : IFrameWorkInfo
    {
        public const string Title = "Playwright";
        public string Name => Title;   
        public string[] PropertyTypes => new[]
        {
            PwSearchProperties.AltText, PwSearchProperties.Placeholder, PwSearchProperties.Title, PwSearchProperties.Label,
            PwSearchProperties.Text, PwSearchProperties.TimeOut, PwSearchProperties.XPath
        };
        public string[] ControlTypes => new[] {
            "Button",
            "Calendar",
            "CheckBox",
            "ComboBox",
            "Control",
            "DatePicker",
            "FileInput",
            "Image",
            "Link",
            "List",
            "ListItem",
            "Menu",
            "MenuItem",
            "ModalWindow",
            "Page",
            "RadioButton",
            "Select",
            "Tab",
            "TabItem",
            "Table",
            "TableCell",
            "TableRow",
            "Text",
            "TextInput",
            "ToolBar",
            "Tree",
            "TreeItem"
        };

        public string GenerateCode(NameSpace assembly)
        {
            var encoder = new PwAssemblyCoder(assembly);
            return encoder.Generate();
        }
    }
}