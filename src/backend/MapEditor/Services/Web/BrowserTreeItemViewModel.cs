using Newtonsoft.Json;

namespace PageEditor.Plugins.Navy.Controls.Web
{
    public class BrowserTreeItemViewModel 
    {    
        public string XPath => Item.XPath;

        [JsonIgnore]
        public BrowserTreeItemViewModel Parent;

        [JsonIgnore]
        public BrowserVm Tree;

        public BrowserTreeItemViewModel(TreeWalkerElement item, BrowserVm tree, BrowserTreeItemViewModel parent)
        {
            Parent = parent;
            Tree = tree;
            Item = item;
            if (item.Role == "row")
                IsExpanded = false;
            foreach (var child in Tree.TreeWalker.GetChildren(Item.Element, this))
            {
                Children.Add(new BrowserTreeItemViewModel(child, Tree, this));
            }
        }
         
        public TreeWalkerElement Item { get; set; } 

        public string Name => Item?.Name ?? "";

        public bool IsExpanded { get; set; }

        public List<BrowserTreeItemViewModel> Children { get; set; } = new List<BrowserTreeItemViewModel>();

        public override string ToString() => $"{Name} {XPath}"; 
    }
}