using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Xml.Linq;
using MapEditor.Core.Models;

namespace MapEditor.Core.Xml
{
    public class XmlSaver
    {
        private static Version _mapVersion = new Version(2, 0, 0, 0);


        internal void SaveUiMap(UiMap map, List<UiMap> nearMaps)
        {
            var codeFile = map.File;
            var xMap = GetXmlMap(map, nearMaps);
            var codeStream = new MemoryStream();
            xMap.Save(codeStream);
            var code = Encoding.UTF8.GetString(codeStream.ToArray()).Substring(1);
            File.WriteAllText(codeFile, code, Encoding.UTF8);
        }

        internal XDocument GetXmlMap(UiMap map, List<UiMap> nearMaps)
        {
            var result = new XDocument();
            var root = new XElement("Map");
            root.Add(new XAttribute("Version", _mapVersion.ToString()));
            root.Add(new object[] { new XAttribute("FrameWork", map.FrameWork) });
            foreach (var item in map.RootAssembly.Children)
                root.Add(GetAssemblyXml(item));
            result.Add(root);
            return result;
        }


        public XElement GetAssemblyXml(UIAssembly assembly)
        {
            var result = new XElement("Assembly");
            result.Add(new object[] { new XAttribute("Name", assembly.Name) });
            AddXAttribute(!string.IsNullOrEmpty(assembly.Comment), result, "Comment", assembly.Comment);
            AddXAttribute(assembly.IsFolder, result, "IsFolder", assembly.IsFolder);
            foreach (var elem in assembly.Controls)
                result.Add(GetControlXml(elem));
            foreach (var node in assembly.Children)
                result.Add(GetAssemblyXml(node));
            return result;
        }

        private void AddXAttribute(bool condition, XElement source, string name, object value)
        {
            if (!condition)
                return;
            source.Add(new XAttribute(name, value));
        }

        public XElement GetControlXml(UIControl control)
        {
            var result = new XElement("Control");
            var xName = new XAttribute("Name", control.Name);
            var xType = new XAttribute("ControlType", control.ControlType);
            AddXAttribute(control.Comment.Length > 0, result, "Comment", control.Comment);
            AddXAttribute(control.IsFolder, result, "IsHidden", control.IsFolder);
            AddXAttribute(control.IsMultiple, result, "IsMultiple", control.IsMultiple);

            if (control.BaseClass != null)
                AddXAttribute(true, result, "Link", control.BaseClass);
            result.Add(xName, xType);

            foreach (var prop in control.Properties)
                result.Add(GetPropertyXml(prop));
            foreach (var node in control.Children)
                result.Add(GetControlXml(node));
            return result;
        }

        public XElement GetPropertyXml(UIControlProperty property)
        {
            var result = new XElement("Property", property.Value);
            var xPropName = new XAttribute("Name", property.Name);
            result.Add(xPropName);
            return result;
        }
    }
}