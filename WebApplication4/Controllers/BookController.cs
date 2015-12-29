using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication4.Repository;
using WebApplication4.Repository.Models;

namespace WebApplication4.Controllers
{
    public class BookController : Controller
    {
        private IBookRepository bookRepository;
        private IUnitOfWork unitOfWork;

        public BookController()
        {
            BookStoreDbContext bookStoreDbContext = new BookStoreDbContext();
            bookRepository = new BookRepository(bookStoreDbContext);
            unitOfWork = new UnitOfWork(bookStoreDbContext);
        }

        // GET: Book
        public ActionResult Index()
        {
            IList<Book> listBook = bookRepository.GetAllBooks();
            return View(listBook);           
        }

        [HttpGet]
        public ViewResult Create()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Create(Book book)
        {
            bookRepository.Insert(book);
            unitOfWork.Save();
            return RedirectToAction("Index");
        }
    }
}