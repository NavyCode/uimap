#region


#endregion

namespace MapEditor
{
    public class NameSpace
    { 
        public NameSpace()
        {
            Controls = new List<Control>();
            Children = new List<NameSpace>();
        }


        public NameSpace(Map map, string name)
            : this()
        {
            UiMap = map;
            Name = name;
        }

        public NameSpace(string name, NameSpace parent)
            : this(parent.UiMap, name)
        {
            Parent = parent;
        }

        public NameSpace Parent { get; set; }


        public string FullName()
        {
            var uid = string.Empty;
            var names = new Stack<string>();
            foreach (var parent in ReversePath())
            {
                if (parent.IsFolder)
                    continue;
                names.Push(parent.Name);
            }

            var i = 0;
            foreach (var name in names)
            {
                if (i > 0)
                    uid += ".";
                uid += name;
                i++;
            }

            return uid;
        }

        public List<Control> Controls { get; } = new List<Control>();

        public List<NameSpace> Children { get; } = new List<NameSpace>();

        public bool IsFolder { get; set; }

        public Map UiMap { get; set; }

        public bool IsRoot => Parent == null;

        public string Name { get; set; }
        public string Comment { get; set; }

        private IEnumerable<NameSpace> ReversePath()
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
         
    }
}