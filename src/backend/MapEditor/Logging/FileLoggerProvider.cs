using Microsoft.Extensions.Logging;

namespace MapEditor
{
    public class FileLoggerProvider : ILoggerProvider
    {
        public FileLoggerProvider()
        {
        }
        public ILogger CreateLogger(string categoryName)
        {
            return new AspNetFileLogger(categoryName);
        }

        public void Dispose()
        {
        }
    }
}
