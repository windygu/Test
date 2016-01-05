var actionUrl = '/Admin/Module/Handler';
var formUrl = "Modules/html/ModuleForm.htm?n=" + Math.random();
var navgrid;


$(function () {
    //alert("hello world");
    autoResize({ dataGrid: '#moduleGrid', gridType: 'treegrid', callback: grid.databind, height: 5 });
    $('#a_add').click(crud.add);
    //$('#a_edit').click(crud.edit);
    //$('#a_delete').click(crud.del);
    $('#a_refresh').click(function () { //刷新
        grid.reload();
    });

});

var grid = {
    databind: function (winsize) {
        navgrid = $('#navGrid').treegrid({
            toolbar: '#toolbar',
            title: '模块列表',
            iconCls: 'icon icon-chart_organisation',
            width: winsize.width,
            height: winsize.height,
            nowrap: false,
            rownumbers: true,
            //animate: true,
            resizable: true,
            collapsible: false,
            url: "/Admin/Module/GetModuleList",
            idField: 'Id',
            treeField: 'FULLNAME',            
            frozenColumns: [[
                { title: '模块名称', field: 'FULLNAME', width: 200 },
                { title: '编码', field: 'CODE', width: 130 }
            ]],
            columns: [[
                { title: 'Id', field: 'Id', hidden: true },
                { title: 'ParentId', field: '_parentId', hidden: true },
                { title: '模块分类', field: 'CATEGORY', width: 100 },
                { title: '图标', field: 'iconCls', width: 130, hidden: true },
                { title: 'Web链接地址', field: 'NAVIGATEURL', width: 200 },
                { title: 'WinForm程序集', field: 'ASSEMBLYNAME', width: 150 },
                { title: 'WinForm窗体', field: 'FORMNAME', width: 200 },
                {
                    title: '模块类型', field: 'MODULETYPE', width: 60, align: 'center', formatter: function (v, d, i) {
                        if (v == 1) {
                            return '<img src="/images/' + "winform.png" + '" />';
                        }
                        else if (v == 2) {
                            return '<img src="/images/' + "webform.png" + '" />';
                        }
                        else if (v == 3) {
                            return '<img src="/images/' + "winwebform.png" + '" />';
                        }
                        else {
                            return '<img src="/images/' + "otherform.png" + '" />';
                        }
                    }
                },
                {
                    title: '公共', field: 'ISPUBLIC', width: 50, align: 'center', formatter: function (v, d, i) {
                        return '<img src="/images/' + (v ? "checkmark.gif" : "checknomark.gif") + '" />';
                    }
                },
                { title: '有效', field: 'ENABLED', width: 50, align: 'center', formatter: imgcheckbox },
                { title: '排序', field: 'SORTCODE', width: 80, align: 'right' },
                { title: '备注', field: 'DESCRIPTION', width: 500 },
                //{ title: 'AllowEdit', field: 'AllowEdit', hidden: true },
                { title: 'AllowDelete', field: 'ALLOWDELETE', hidden: true }
                //{ title: 'ModuleType', field: 'ModuleType', hidden: true }
            ]]
        });
    },
    reload: function () {
        navgrid.treegrid('reload');
    },
    selected: function () {
        return navgrid.treegrid('getSelected');
    }
};

var imgcheckbox = function (cellvalue, options, rowObject) {
    return cellvalue ? '<img src="/Content/icon/bullet_tick.png" alt="正常" title="正常" />' : '<img src="/Content/icon/bullet_minus.png" alt="禁用" title="禁用" />';
};

var crud = {
    add: function () {
        var addDialog = $.hDialog({
            href: '/Admin/Module/Create', title: '添加模块', iconCls: 'icon-tab_add', width: 490, height: 520
        });
        //$('#dd').dialog({
        //    title: '添加模块（菜单）', width: 490, height: 520, closed: false, cache: false, href: '/Admin/Module/Create', modal: true
        //});
    }
};