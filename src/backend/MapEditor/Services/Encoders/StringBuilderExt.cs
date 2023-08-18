using System.Text;

namespace PageEditor.Plugins.Navy.Converters
{
    public static class StringBuilderExt
    {
        public static void AppendLineText(this StringBuilder str, string text)
        {
            if (string.IsNullOrWhiteSpace(text))
                return;
            str.Append(Environment.NewLine + text);
        }
    }
}