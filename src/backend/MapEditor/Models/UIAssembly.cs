#region


#endregion

namespace MapEditor.Core.Models
{
    public class UIAssembly
    {
        private UiMap _uiMap;

        public UIAssembly()
        {
            Controls = new List<UIControl>();
            Children = new List<UIAssembly>();
        }


        public UIAssembly(UiMap map, string name)
            : this()
        {
            UiMap = map;
            Name = name;
        }

        public UIAssembly(string name, UIAssembly parent)
            : this(parent.UiMap, name)
        {
            Parent = parent;
        }

        public UIAssembly Parent
        {
            get;
            set;
        }


        public string FullName()
        {
            var uid = string.Empty;
            var names = new List<string>();
            foreach (var parent in ReversePath())
            {
                if (parent.IsFolder)
                    continue;
                names.Add(parent.Name);
            }

            for (var i = names.Count - 2; i >= 0; i--)
            {
                uid += names[i];
                if (i > 0)
                    uid += ".";
            }

            return uid;
        }

        public List<UIControl> Controls { get; }

        public List<UIAssembly> Children { get; }

        public bool IsFolder { get; set; }

        public UiMap UiMap
        {
            get
            {
                if (Parent == null)
                    return _uiMap;
                return Parent.UiMap;
            }
            set => _uiMap = value;
        }

        public bool IsRoot { get; internal set; }

        public string Name { get; set; }
        public string Comment { get; set; }

        private IEnumerable<UIAssembly> ReversePath()
        {
            var parent = this;
            while (parent != null)
            {
                yield return parent;
                parent = parent.Parent;
            }
        }

        public override string ToString()
        {
            return Name;
        }

        public string GenerateCode()
        {
            return string.Empty;
        }
    }
}