namespace MapEditor
{
    public class ControlProperty
    {
        public ControlProperty(string property, string value)
        {
            Name = property;
            Value = value;
        }

        public ControlProperty()
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