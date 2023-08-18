using System.Text;
using PageEditor.Plugins.Navy.Converters;
using MapEditor.Core.Models;
using PageEditor.Plugins.Navy.FrameWorks.Playwright;

namespace MapEditor.Services.FrameWorks.Playwrite
{
    public class PwControlCoder
    {
        public PwControlCoder(UIControl control, PwControlCoder parent, PwAssemblyCoder assemblyCoder, int tab = 0) 
        {
            Parent = parent;
            AssemblyCoder = assemblyCoder;
        }

        PwControlCoder Parent;

        public string GetSearchValue()
        { 
            var type = Control.Properties.FirstOrDefault(p => p.Name != PwSearchProperties.TimeOut);
            if (type == null)
                return null;
            if (type.Name == PwSearchProperties.XPath)
                return "xpath=" + type.Value;
            else
                return type.Value;
        }

        public string GetSearchAction()
        {
            var type = Control.Properties.FirstOrDefault(p => p.Name != PwSearchProperties.TimeOut)?.Name;
            if (type == null)
                return null;
            if (type == PwSearchProperties.XPath)
                return "Locator";
            if (type == PwSearchProperties.AltText)
                return "GetByAltText";
            if (type == PwSearchProperties.Placeholder)
                return "GetByPlaceholder";
            if (type == PwSearchProperties.Text)
                return "GetByText";
            if (type == PwSearchProperties.Title)
                return "GetByTitle";
            return null;
        }

        public string ExtraStr
        {
            get
            {
                var timeout = Control.Properties.FirstOrDefault(p => p.Name == PwSearchProperties.TimeOut);
                if (timeout == null)
                    return "Extra.Default";
                return string.Format($"Extra.ByTimeOut(TimeSpan.FromMilliseconds({timeout.Value}))");
            }
        }

        public string ClassName
        {
            get
            {
                if (!IsClass)
                    return null;
                return Name();
            }
        } 

        public string EnumerableString => "ControlsCollection";

        public string Generate()
        {
            var result = new StringBuilder();
            if (Control.IsFolder)
            {
                foreach (var node in Control.Children)
                {
                    var coder = new PwControlCoder(node, this, null);
                    result.AppendLineText(coder.Generate());
                }
            }
            else
            {
                AddCodeForSearch(result);
                AddHeader(result);
                AddChildrenCode(result);
                AddFooter(result);
            }

            return result.ToString();
        }


        private void AddChildrenCode(StringBuilder result)
        {
            var controls = Control.Children;
            var tab = ParentTabLevel;
            foreach (var item in controls)
            {
                var coder = new PwControlCoder(item, this, null, tab);
                result.Append(coder.Generate());
            }
        }
         

        protected void AddCodeForSearch(StringBuilder result)
        {
            if (Control.IsMultiple)
                return;
            var searchStr = $@"";
            var code =
                $@"/// <summary>{Comment()}</summary>
public {ClassName} {ClassName} => new {ClassName}(this.{GetSearchAction()}({GetSearchValue()}, {ExtraStr})";
            result.AppendLineText(Tabs(code, TabLevel()));
        }

        protected UIControl Control;

        protected int ParentTabLevel;

        private int? _tabLevel; 
         
        public string ParentClass
        {
            get
            {
                var item = Parent;
                while (item != null)
                {
                    if (item.IsClass)
                        return item.ClassName;
                    item = item.Parent;
                } 
                return string.Empty;
            }
        }

        protected string Name() => GenerateCodeName(Control.Name);

        protected int TabLevel()
        {
                if (_tabLevel.HasValue)
                    return _tabLevel.Value;
                var result = 0;
                var parent = Control.Parent;
                while (parent != null)
                {
                    result++;
                    parent = parent.Parent;
                } 
                _tabLevel = result + ParentTabLevel;
                return _tabLevel.Value;
        }

        public string Comment()
        {
                var controlComment = $"'{Control.Comment}'<para>{TreePath}</para>";
                var comment = string.Join(". ",
                    controlComment.Split(new[] { Environment.NewLine }, StringSplitOptions.RemoveEmptyEntries));
                return comment;
        } 

        public bool IsClass
        {
            get
            {
                if (Control.Children.Any())
                    return true;
                if (!string.IsNullOrWhiteSpace(Control.BaseClass))
                    return true;
                return false;
            }
        }

        public PwAssemblyCoder AssemblyCoder { get; }

        public string TreePath ()
        {
            var result = new Stack<string>();
            var parent = Control.Parent;
            while (parent != null)
            {
                result.Append(parent.Name);
                parent = parent.Parent;
            }
            return string.Join(" / ", result);
        }

        public string FullClassName()
        {
            var result = GenerateCodeName(Control.Name);
            if (Parent != null)
                return Parent.FullClassName() + "." + result;
            else
                return AssemblyCoder.FullName();
        } 

        public static string Tabs(string str, int level)
        {
            var strResult = new StringBuilder();
            var tab = new string(' ', 3 * (level + 2));
            var array = str.Split(new[] { Environment.NewLine }, StringSplitOptions.None);
            for (var i = 0; i < array.Length; i++)
            {
                strResult.Append(tab + array[i]);
                if (i + 1 < array.Length)
                    strResult.AppendLine("");
            }

            return strResult.ToString();
        }  

        protected void AddFooter(StringBuilder result)
        {
            if (!IsClass)
                return;
            result.AppendLineText(Tabs("}", TabLevel()));
        }

        protected void AddHeader(StringBuilder result)
        {
            if (!IsClass)
                return;
            var baseClass = !string.IsNullOrWhiteSpace(Control.BaseClass) ? $" : {Control.BaseClass}" : "";

            var code =
                $@"public partial class {ClassName}{baseClass}
{{";
            code = Tabs(code, TabLevel());
            result.AppendLineText(code);
        } 

        public static string GenerateCodeName(string name)
        {
            if (name == null)
                return "";
            var controlClassName = name;
            var code = string.Empty;
            foreach (var item in controlClassName)
                if (char.IsLetterOrDigit(item))
                    code += item;
            return code;
        }
    }
}