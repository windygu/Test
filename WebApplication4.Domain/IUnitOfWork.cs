using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebApplication4.Repository
{
    public interface IUnitOfWork : IDisposable
    {
        DbContext Context { get; }
        void Save();
        bool IsDisposed { get; }
    }
}
