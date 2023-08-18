using MapEditor.Core.Models;
using PageEditor.Plugins.Navy.Converters;
using System.Text;

namespace MapEditor.Services.FrameWorks.Playwrite
{
    public class PwAssemblyCoder
    {
        private readonly UIAssembly assembly;

        public PwAssemblyCoder(UIAssembly assembly)
        {
            this.assembly = assembly;
        }

        public string UsingAssembly => @"using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Navy.MsTest.Reports; 
using Navy.Playwright;
using Microsoft.Playwright;";


        public string Generate()
        {
            var result = new StringBuilder();
            if (assembly.IsRoot)
            {
                result.AppendLineText(UsingAssembly);
            }

            var nsbegin = NameSpaceBegin();
            result.Append(nsbegin);
            foreach (var elem in assembly.Controls)
            {
                var elementCoder = new PwControlCoder(elem, null, this);
                var code = elementCoder.Generate();
                result.AppendLineText(code);
            }
            var nsfooter = NameSpaceEnd();
            result.Append(nsfooter);

            foreach (var child in assembly.Children)
            {
                var controlCoder = new PwAssemblyCoder(child);
                var code = controlCoder.Generate();
                result.AppendLineText(code);
            }

            return result.ToString();
        }

        public string FullName() => assembly.FullName();

        protected string NameSpaceBegin()
        {
            var code = new StringBuilder();
            code.Append($@"namespace {assembly.FullName()}
{{");
            return code.ToString();
        }
        protected string NameSpaceEnd()
        {
            var code = new StringBuilder();
            code.Append(@"
}");
            return code.ToString();
        }
           
    }
}
