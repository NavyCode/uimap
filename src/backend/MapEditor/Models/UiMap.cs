using System.IO;

namespace MapEditor.Core.Models
{
    public class UiMap
    {
        public override string ToString() => File;

        public UiMap()
        {
            Version = 1;
            RootAssembly = new UIAssembly
            {
                UiMap = this,
                IsRoot = true
            };
        }

        public string Name => File != null ? Path.GetFileNameWithoutExtension(File) : "Not saved map";
        public string File { get; set; }

        public UIAssembly RootAssembly { get; set; }

        public int Version
        {
            get;
            set;
        }

        public string FrameWork { get; set; }
    }
}