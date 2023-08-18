using System.Xml.Serialization;

namespace MapEditor.Core.Models
{
    public class UIControl
    {

        public UIControl()
        {
        }

        public bool IsFolder { get; set; }
        public bool IsMultiple { get; set; }
        public string Name { get; set; }
        public string Comment { get; set; }


        [XmlIgnore]
        public UIControl Parent
        {
            get;
            set;
        }

        public UIAssembly Assembly
        {
            get;
            set;
        }

        public byte[] Image { get; set; }

        public string BaseClass { get; set; }

        public string ControlType { get; set; }

        public List<UIControlProperty> Properties { get; set; }
        public List<UIControl> Children { get; set; }


        public override string ToString()
        {
            return Name;
        }
    }
}