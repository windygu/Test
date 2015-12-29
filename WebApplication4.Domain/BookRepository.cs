using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApplication4.Repository.Models;

namespace WebApplication4.Repository
{
    public class BookRepository : Repository<Book>,IBookRepository
    {
        //在执行子类构造函数之前，先执行基类Repository<Book>的构造函数
        public BookRepository(BookStoreDbContext dbcontext)
            : base(dbcontext)
        {
        }

        public IList<Book> GetAllBooks()
        {
            var list = dbContext.BookCollection;
            return list.OrderBy(x => x.ISBN).ToList();
        }
    }
}
