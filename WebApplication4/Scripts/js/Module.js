var actionUrl = '/Admin/Module/Handler';
var formUrl = "Modules/html/ModuleForm.htm?n=" + Math.random();
var navgrid;

var $notity = $('#notity');
var msg = {
    ok: function (message) {
        $notity.jnotifyAddMessage({ text: message });
    },
    error: function (message) {
        $notity.jnotifyAddMessage({ text: message, type: 'error' });
    },
    warning: function (message) {
        $notity.jnotifyAddMessage({ text: message, type: 'warning' });
    }
};


$(function () {
    //alert("hello world");
    autoResize({ dataGrid: '#moduleGrid', gridType: 'treegrid', callback: grid.databind, height: 5 });
    $('#a_add').click(crud.add);
    $('#a_edit').click(crud.edit);
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

var showIcon = function () {
    $('#selecticon').click(function () {
        var iconDialog = $.hDialog({
            iconCls: 'icon-application_view_icons',
            href: '/Content/iconlist.htm?v=' + Math.random(),
            title: '选取图标', width: 800, height: 600, showBtns: false,
            onLoad: function () {
                $('#iconlist li').attr('style', 'float:left;border:1px solid #fff;margin:2px;width:16px;cursor:pointer').click(function () {
                    //var iconCls = top.$(this).find('span').attr('class').replace('icon ', '');
                    var iconCls = $(this).find('span').attr('class');
                    $('#txt_IconCss').val(iconCls);
                    $('#txt_IconUrl').val($(this).attr('title'));
                    //top.$('#smallIcon').attr('class', "icon " + iconCls);
                    $('#smallIcon').attr('class', iconCls);
                    iconDialog.dialog('close');
                }).hover(function () {
                    $(this).css({ 'border': '1px solid red' });
                }, function () {
                    $(this).css({ 'border': '1px solid #fff' });
                });                
            }
        });
    });
};

var crud = {
    bindCtrl: function (navId) {
        var treeData = navgrid.treegrid('getData');
        treeData = JSON.stringify(treeData).replace(/Id/g, 'id').replace(/FULLNAME/g, 'text');
        treeData = '[{"id":0,"selected":true,"text":"请选择父级模块（菜单）"},' + treeData.substr(1, treeData.length - 1);

        $('#txt_ParentId').combotree({
            data: JSON.parse(treeData),
            valueField: 'id',
            textField: 'text',
            panelWidth: '280',
            editable: false,
            lines: true,
            onSelect: function (item) {
                var nodeId = $('#txt_ParentId').combotree('getValue');
                if (item.id == navId) {
                    $('#txt_ParentId').combotree('setValue', nodeId);
                    $.messager.alert('警告提示', '上级模块不能与当前模块相同！', 'warning');
                }
            }
        }).combotree('setValue', 0);
        showIcon(); //选取图标
        //top.$('#txt_SortCode').numberspinner();
        $('#txt_Code').focus();
        $('#chk_Enabled').attr("checked", true);
        $('#chk_AllowEdit').attr("checked", true);
        $('#chk_AllowDelete').attr("checked", true);
        //top.$('#uiform').validate({
        //    //此处加入验证
        //});
    },
    bindCategory: function bindCategory() {
        $('#txt_Category').combobox({
            url: '/Admin/DataDict/GetDict?categorycode=ModuleCategory',
            method: 'get',
            valueField: 'ITEMVALUE',
            textField: 'ITEMNAME',
            editable: false,
            panelHeight: 'auto'
        });
        $('#cbModuleType').combobox({
            url: '/Admin/DataDict/GetDict?categorycode=ModuleType',
            method: 'get',
            valueField: 'ITEMVALUE',
            textField: 'ITEMNAME',
            editable: false,
            panelHeight: 'auto'
        });
    },
    add: function () {
        var addDialog = $.hDialog({
            href: '/Admin/Module/Create', title: '添加模块', iconCls: 'icon-tab_add', width: 490, height: 520,
            onLoad: function () {
                crud.bindCtrl();
                crud.bindCategory();
                //top.$('#cbModuleType').combobox('setValue', '2');
                var row = grid.selected();
                if (row) {
                    $('#txt_ParentId').combotree('setValue', row.ParentId);
                }
            },
            submit: function () {
                if ($('#uiform').validate().form()) {
                    //var param = createParam('add', '0');
                    var vcategory = $('#txt_Category').combobox('getValue');
                    var vparentid = $('#txt_ParentId').combobox('getValue');
                    var vmoduletype = $('#cbModuleType').combobox('getValue');
                    var param = 'vcategory=' + vcategory + '&vparentid=' + vparentid + '&vmoduletype=' + vmoduletype + "&" + $('#uiform').serialize();
                    $.ajaxjson('/Admin/Module/Create', param, function (d) {
                        if (d.Success) {
                            msg.ok(d.Message);
                            addDialog.dialog('close');
                            grid.reload();
                        } else {
                            MessageOrRedirect(d);
                        }
                    });
                }
            }
        });        
    },
    edit: function () {
        msg.ok("test");
        //alert("test");
    }
};