//------------------------------------------------------------------------------
// <auto-generated>
//     此代码已从模板生成。
//
//     手动更改此文件可能导致应用程序出现意外的行为。
//     如果重新生成代码，将覆盖对此文件的手动更改。
// </auto-generated>
//------------------------------------------------------------------------------

namespace WebApplication4.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class MODULE
    {
        public int ID { get; set; }
        public Nullable<int> PARENTID { get; set; }
        public string CODE { get; set; }
        public string FULLNAME { get; set; }
        public string CATEGORY { get; set; }
        public int MODULETYPE { get; set; }
        public string IMAGEINDEX { get; set; }
        public string SELECTEDIMAGEINDEX { get; set; }
        public string ICONCSS { get; set; }
        public string ICONURL { get; set; }
        public string NAVIGATEURL { get; set; }
        public string TARGET { get; set; }
        public string FORMNAME { get; set; }
        public string ASSEMBLYNAME { get; set; }
        public string PERMISSIONITEMCODE { get; set; }
        public string PERMISSIONSCOPETABLES { get; set; }
        public int ISPUBLIC { get; set; }
        public int ISMENU { get; set; }
        public int EXPAND { get; set; }
        public int ALLOWEDIT { get; set; }
        public int ALLOWDELETE { get; set; }
        public Nullable<int> SORTCODE { get; set; }
        public int DELETEMARK { get; set; }
        public int ENABLED { get; set; }
        public string DESCRIPTION { get; set; }
        public System.DateTime CREATEON { get; set; }
        public Nullable<int> CREATEUSERID { get; set; }
        public string CREATEBY { get; set; }
        public Nullable<System.DateTime> MODIFIEDON { get; set; }
        public Nullable<int> MODIFIEDUSERID { get; set; }
        public string MODIFIEDBY { get; set; }
    }
}
