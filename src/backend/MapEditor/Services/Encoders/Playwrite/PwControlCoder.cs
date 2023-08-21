using System.Text;

namespace MapEditor.Playwright
{
    public class PwControlCoder
    {
        public PwControlCoder(Control control, PwControlCoder parent, PwAssemblyCoder assemblyCoder, int tab = 0) 
        {
            Parent = parent;
            AssemblyCoder = assemblyCoder;
            Control = control;
            ParentTabLevel = tab;
        }

        PwControlCoder Parent;

        public string GetSearchValue()
        { 
            var type = Control.Properties.FirstOrDefault(p => p.Name != PwSearchProperties.TimeOut);
            if (type == null)
                return null;
            if (type.Name == PwSearchProperties.XPath)
                return "@\"xpath=" + type.Value.Replace("\"", "\"\"") + "\"";
            else
                return "@\"" + type.Value.Replace("\"", "\"\"") + "\"";
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

        public string MetaStr()
        {
                var timeout = Control.Properties.FirstOrDefault(p => p.Name == PwSearchProperties.TimeOut);
                var strTimeOut = timeout == null ? "" : $", TimeSpan.FromMilliseconds({timeout.Value})";
                return string.Format($"new Meta(\"{Control.Name}\", \"{Control.Comment}\", \"{TreePath()}\"{strTimeOut})");
        }

        public string ClassName() => GenerateCodeName(Control.Name);

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
            if (Control.Parent == null)
                return;

            var propertyName = IsClass ? ClassName() : "Control";
            var thisStr = Parent.IsPage ? "Page" : "this";

            var summary = $@"/// <summary>{Comment()}</summary>";
            var code =
                $@"{summary}
";
            if (!Control.IsMultiple) 
            {
                code += $@"public {propertyName} {ClassName()} => Control.Create<{propertyName}>({thisStr}.{GetSearchAction()}({GetSearchValue()}), {MetaStr()});";
            }
            else
            {
                code += $@"public ControlCollection<{propertyName}> {ClassName()} => new ControlCollection<{propertyName}>({thisStr}.{GetSearchAction()}({GetSearchValue()}), {MetaStr()});";

            }
            result.AppendLineText(Tabs(code, TabLevel()));
        }

        protected Control Control;

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
                        return item.ClassName();
                    item = item.Parent;
                } 
                return string.Empty;
            }
        }
         
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
            var treePath = TreePath();
            var paraText = !string.IsNullOrWhiteSpace(treePath)
                ? $"<para>{TreePath()}</para>"
                : "";
                var controlComment = $"'{Control.Comment}'{paraText}";
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
            if (IsPage)
                baseClass =" : WebPage"; 

            var code =
                $@"public partial class {ClassName()}{baseClass}
{{";
            code = Tabs(code, TabLevel());
            result.AppendLineText(code);
        }

        bool IsPage => Control.ControlType.ToLower() == "page";

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