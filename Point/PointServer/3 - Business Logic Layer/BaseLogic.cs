using System;

namespace PaulKolesnik
{
    public abstract class BaseLogic : IDisposable
    {
        protected PointContext DB;

        public BaseLogic(PointContext db)
        {
            DB = db;
        }

        public void Dispose()
        {
            DB.Dispose();
        }
    }
}
