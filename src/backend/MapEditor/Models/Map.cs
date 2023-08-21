using System.IO;

namespace MapEditor
{
    public class Map
    {
        public override string ToString() => File;

        public Map()
        {
            Version = 1;
            RootAssembly = new NameSpace
            {
                UiMap = this
            };
        }

        public string File { get; set; }

        public NameSpace RootAssembly { get; set; }

        public int Version
        {
            get;
            set;
        }

        public string FrameWork { get; set; }
    }
}