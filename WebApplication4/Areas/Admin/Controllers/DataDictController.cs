using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication4.Models;

namespace WebApplication4.Areas.Admin.Controllers
{
    public class DataDictController : Controller
    {
        LabEntities db = new LabEntities();
        // GET: Admin/DataDict
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetDict(string categorycode)
        {
            var dict = db.DataDict.Where(t=> t.CATEGORYCODE == categorycode).Select(s => new
            {
                ITEMNAME = s.NAME,
                ITEMVALUE = s.VALUE
            }).ToList();
            JsonResult jr = Json(dict, JsonRequestBehavior.AllowGet);
            return jr;
        }
    }
}