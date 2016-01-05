using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication4.Areas.Admin.Controllers
{
    public class OrganizeController : Controller
    {
        // GET: Admin/Organize
        public ActionResult Index()
        {
            return View("Organize");
        }
    }
}