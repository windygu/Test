using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApplication4.Repository.Models;

namespace WebApplication4.Repository
{
    public class BookStoreDbContext : DbContext
    {
        public BookStoreDbContext() : base("BookStore")
        {

        }

        public DbSet<Book> BookCollection { get; set; }
    }
}
