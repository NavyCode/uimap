using System.Xml.Serialization;

namespace MapEditor
{
    public class Control
    {

        public Control()
        {
        }

        public bool IsFolder { get; set; }
        public bool IsMultiple { get; set; }
        public string Name { get; set; }
        public string Comment { get; set; }


        [XmlIgnore]
        public Control Parent
        {
            get;
            set;
        }

        public NameSpace NameSpace
        {
            get;
            set;
        }

        public byte[] Image { get; set; }

        public string BaseClass { get; set; }

        public string ControlType { get; set; }

        public List<ControlProperty> Properties { get; set; } = new List<ControlProperty>();
        public List<Control> Children { get; set; } = new List<Control>();


        public override string ToString()
        {
            return Name;
        }
    }
}