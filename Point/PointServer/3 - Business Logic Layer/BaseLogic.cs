using System;

namespace PaulKolesnik
{
    public abstract class BaseLogic : IDisposable
    {
        protected PointContext DB = new PointContext();

        public void Dispose()
        {
            DB.Dispose();
        }
    }
}
