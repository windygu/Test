using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication4.Common
{
    public class ControllerWebApp : Controller
    {
        protected bool permissionAccess = true;

        /// <summary>
        /// 新增权限
        /// </summary>
        protected bool permissionAdd = true;

        /// <summary>
        /// 编辑权限
        /// </summary>
        protected bool permissionEdit = true;

        /// <summary>
        /// 删除权限
        /// </summary>
        protected bool permissionDelete = true;

        /// <summary>
        /// 查询权限
        /// </summary>
        protected bool permissionSearch = true;

        /// <summary>
        /// 管理权限
        /// </summary>
        protected bool permissionAdmin = false;

        /// <summary>
        /// 导出权限
        /// </summary>
        protected bool permissionExport = true;
    }
}