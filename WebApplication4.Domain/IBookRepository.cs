using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApplication4.Repository.Models;

namespace WebApplication4.Repository
{
    public interface IBookRepository : IRepository<Book>
    {
        IList<Book> GetAllBooks();
    }
}
