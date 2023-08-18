namespace MapEditor.Core.Models
{
    public class UIControlProperty
    {
        public UIControlProperty(string property, string value)
        {
            Name = property;
            Value = value;
        }

        public UIControlProperty()
        {
        }

        public string Name { get; set; }

        public string Value { get; set; }


        public override int GetHashCode()
        {
            return base.GetHashCode();
        }
    }
}