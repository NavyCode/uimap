using System.Xml.Linq;

namespace MapEditor
{
    public class XmlLoader
    {
        internal Map LoadUiMap(string file)
        {
            var result = new Map();
            var doc = XDocument.Load(file);
            result.RootAssembly = new NameSpace(result, "Assemblies")
            {
                IsRoot = true
            };
            result.File = file;
            foreach (var item in doc.Root.Elements("Assembly"))
            {
                var assembly = CreateAssembly(result, item);
                assembly.Parent = result.RootAssembly;
            }
            return result;
        }

        public NameSpace CreateAssembly(Map map, XElement source, NameSpace parent = null)
        {
            var name = source.Attribute("Name").Value;
            var result = new NameSpace(map, name);
            var xComment = source.Attribute("Comment");
            if (xComment != null)
                result.Comment = xComment.Value;


            var xIsFolder = source.Attribute("IsFolder");
            if (xIsFolder != null)
                result.IsFolder = bool.Parse(xIsFolder.Value);
            if (parent != null)
                result.Parent = parent;
            foreach (var item in source.Elements("Assembly"))
            {
                CreateAssembly(map, item, result);
            }


            foreach (var item in source.Elements("Element"))
            {
                var child = CreateControl(item);
                child.NameSpace = result;
            }

            return result;
        }


        protected static IEnumerable<ControlProperty> CreateProperties(XElement source)
        {
            foreach (var xProp in source.Elements("Property"))
            {
                var pName = xProp.Attribute("Name").Value;
                var pValue = xProp.Value;
                var prop = new ControlProperty(pName, pValue);
                yield return prop;
            }
        }

        public Control CreateControl(XElement source, Control element = null, Control parent = null)
        {
            var name = source.Attribute("Name").Value;
            var xType = source.Attribute("ControlType").Value;
            var comment = GetStringXmlValue(source, "Comment");
            var isHidden = GetBoolXmlValue(source, "IsHidden");
            var isCached = GetBoolXmlValue(source, "IsCached");
            var isMultiple = GetBoolXmlValue(source, "IsMultiple");
            var isSimple = GetBoolXmlValue(source, "IsSimple");
            var isPublic = GetBoolXmlValue(source, "IsPublic");
            var isDataItem = GetBoolXmlValue(source, "IsDataItem");
            var dataItemName = GetStringXmlValue(source, "DataItemName");
            var linkUid = GetStringXmlValue(source, "Link");
            var isLinkBase = GetBoolXmlValue(source, "IsLinkBase");
            var isNullable = GetBoolXmlValue(source, "IsNullable");
            var hideListener = GetBoolXmlValue(source, "HideActionListener");
            var uid = GetGuidXmlValue(source, "Uid");

            var result = new Control()
            {
                IsFolder = isHidden,
                IsMultiple = isMultiple,
                
            };

            foreach (var item in source.Elements("Control"))
            {
                CreateControl(item, parent: result);
            }

            foreach (var prop in CreateProperties(source))
                result.Properties.Add(prop);

            return result;
        }


        private static string GetStringXmlValue(XElement source, string attribute)
        {
            var result = string.Empty;
            var xAttr = source.Attribute(attribute);
            if (xAttr != null)
                result = xAttr.Value;
            return result;
        }


        private static Guid GetGuidXmlValue(XElement source, string attribute)
        {
            var xAttr = source.Attribute(attribute);
            if (xAttr != null)
                return Guid.Parse(xAttr.Value);
            return Guid.NewGuid();
        }

        private static bool GetBoolXmlValue(XElement source, string attribute)
        {
            var result = false;
            var xAttr = source.Attribute(attribute);
            if (xAttr != null)
                result = Convert.ToBoolean(xAttr.Value);
            return result;
        }
    }
}