using Microsoft.Extensions.Logging;

namespace MapEditor
{
    public static class FileLoggerExtensions
    {
        public static ILoggerFactory AddFile(this ILoggerFactory factory)
        {
            factory.AddProvider(new FileLoggerProvider());
            return factory;
        }
    }
}
