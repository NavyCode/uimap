using OpenQA.Selenium;
using HtmlAgilityPack;

namespace MapEditor.Locator
{
    public class TreeWalker
    {
        HtmlDocument _doc = new HtmlDocument();

        public void Refresh(string htmlSource)
        {
            _doc.LoadHtml(htmlSource);
        }

        static string[] _requredAttrs = new[] { "data-component.id", "data-testid", "id", "role", "data-test-id" };

        static string[] _testIdAttrs = new[] { "data-component.id", "data-testid" };

        static string[] _helpAttributes = new[] { "aria-colindex", "aria-label", "hint", "title", "placeholder" };

        static string[] _textAttributes = new[] { "aria-label", "hint", "title", "placeholder" };

        static HashSet<string> InnerTextRoles = new HashSet<string>() { "a", "button", "text", "menu", "menuitem", "tooltip", "link" };

        // sstatic HashSet<string> excludeRoles = new HashSet<string> { "group" }; 

        public TreeWalker(IWebDriver driver)
        {
            Driver = driver;
        }

        public IWebDriver Driver { get; set; }

        public IEnumerable<TreeWalkerElement> GetChildren(HtmlNode parent = null, BrowserTreeItemViewModel treeItem = null)
        {
            var tree = GetDescendants(parent, treeItem);
            return tree.Children;
        }

        private TreeWalkerElement GetDescendants(HtmlNode parent, BrowserTreeItemViewModel treeItem)
        { 
            var tags = new List<HtmlNode>();
            parent = parent ?? _doc.DocumentNode.SelectSingleNode("//body");
            foreach (var element in parent.Descendants().Where(x => !x.Name.StartsWith("#")))
            {
                if (element.GetAttributes(_requredAttrs).Any(x => x != null))
                    tags.Add(element);
            }

            var tree = new TreeWalkerElement();
            tree.Element = parent;
            tree.Name = "Parent";
            tree.XPath = parent.XPath;
            tree.Children = new List<TreeWalkerElement>();
            var unique = new HashSet<string>();
            foreach (var tag in tags)
            {
                // найти ближайшего родителя в DOM с атрибутом
                var parentInDoc = GetParentWithAttr(tag);
                // найти этого родителя в tree, добавить ему child
                var parentInTree = FindInTree(tree, parentInDoc);
                if (parentInTree == null)
                    continue;

                var firstAttribute = tag.GetAttributes(_requredAttrs).First(x => x != null);

                string helpText = null;
                var innerTextXPath = "";
                var hasTestId = tag.GetAttributes(_testIdAttrs).Any(x => x != null);
                var roleAttribute = tag.GetAttributeValue("role", null);
                var innerText = GetInnerText(tag, roleAttribute, tag.Name);
                if (!hasTestId && (roleAttribute != null || InnerTextRoles.Contains(tag.Name)))
                {
                    var helpAttribute = tag.GetAttributes(_helpAttributes).FirstOrDefault(x => x != null);
                    if (helpAttribute != null)
                        helpText = $" and @{helpAttribute.Name}=\"{helpAttribute.Value}\"";
                    else if(!string.IsNullOrEmpty(innerText))
                        innerTextXPath = $"//*[text() =\"{innerText}\"]";
                }

                var name = tag.GetAttributes(_textAttributes).FirstOrDefault(x => x != null && !string.IsNullOrWhiteSpace(x.Value))?.Value;
                if(name == null && !string.IsNullOrEmpty(innerText))
                    name = innerText;

                //if (!hasTestId && excludeRoles.Contains(roleAttribute))
                //    continue; 

                var startSearchPath = ".//";
                var xPath = $"{startSearchPath}*[@{firstAttribute.Name}=\"{firstAttribute.Value}\"{helpText}]{innerTextXPath}";

                    parentInTree.Children.Add(new TreeWalkerElement
                    {
                        Element = tag,
                        Name = name ?? firstAttribute.Value,
                        XPath = xPath,
                        Children = new List<TreeWalkerElement>(),
                        Role = roleAttribute,
                        TagName = tag.Name,
                        HasTestId = hasTestId
                    });
            }

            return tree;
        }

        string GetInnerText(HtmlNode node, string role, string tag)
        {
            if (node.InnerText == null)
                return null;
            if (!InnerTextRoles.Contains(role) && !InnerTextRoles.Contains(tag))
                return null;
            if (node.InnerText.Length > 60)
                return null;
            return node.InnerText;
        }
         

        private static TreeWalkerElement FindInTree(TreeWalkerElement tree, HtmlNode element)
        {
            if (tree.Element.OuterHtml == element.OuterHtml)
                return tree;
            foreach (var item in tree.Children)
            {
                var found = FindInTree(item, element);
                if (found != null)
                    return found;
            }
            return null;
        }

        private static HtmlNode GetParentWithAttr(HtmlNode item)
        {
            HtmlNode result = item; 
            do
            {
                result = result.ParentNode;
                if (result.GetAttributes(_requredAttrs).Any(x => x != null))
                    return result;
            } while (result.Name.ToLower() != "body" && result.Name.ToLower() != "head");
            return result;
        }
    }

    public class TreeWalkerElement
    {
        public HtmlNode Element { get; set; }
        public List<TreeWalkerElement> Children { get; set; }
        public string XPath { get; set; }
        public string Name { get; set; }
        public string Role { get; internal set; }
        public string TagName { get; internal set; }
        public bool HasTestId { get; internal set; }
    }
}
