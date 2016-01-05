var onlyOpenTitle = "欢迎使用";
var openTabs = 5; //允许打开的TAB数量
var _menus = '[{"id":"9E072680-8A5C-45D5-9AAF-5CAF12868AFC","text":"系统管理","iconCls":"icon-lightning","attributes":{"url":"#","FullName":"系统管理"},"state":"open","children":[{"id":"8895495B-F4A8-4EDD-8401-4ADAA0F9A67A","text":"员工管理","iconCls":"icon-vcard","attributes":{"url":"Modules/StaffAdmin.aspx","FullName":"员工管理"}},{"id":"703CAAB2-106B-4445-9A35-304E122C4768","text":"用户管理","iconCls":"icon-users","attributes":{"url":"Modules/UserAdmin.aspx","FullName":"用户管理"}},{"id":"8C0E5D71-CDAC-4659-B8A6-B439BE4E6AFF","text":"角色管理","iconCls":"icon-group_link","attributes":{"url":"Modules/RoleAdmin.aspx","FullName":"角色管理"}},{"id":"241CBDF9-5BC3-4379-89C5-A358C68059FD","text":"组织机构管理","iconCls":"icon-org","attributes":{"url":"/Admin/Organize","FullName":"组织机构管理"}},{"id":"a4f7e6cf-a9cd-4ac2-a2c6-3b49192b6ced","text":"岗位管理","iconCls":"icon-brick","attributes":{"url":"Modules/PostAdmin.aspx","FullName":"岗位管理"}},{"id":"5909F64F-A5A3-4D8E-BAE9-942C76F596F8","text":"模块管理","iconCls":"icon-tab","attributes":{"url":"/Admin/Module/Index","FullName":"模块管理"}},{"id":"A664BAEA-70E1-4151-9A5F-8AB43CA7BE29","text":"操作权限管理","iconCls":"icon-application_osx_lightning","attributes":{"url":"Modules/PermissionItemAdmin.aspx","FullName":"操作权限管理"}},{"id":"0A746762-B18C-4DBB-8065-D2BDAEF6D891","text":"用户权限管理","iconCls":"icon-user_key","attributes":{"url":"Modules/UserPermissionAdmin.aspx","FullName":"用户权限管理"}},{"id":"4350C7BD-32DE-4066-A4DD-BA1BE5C3C0A2","text":"角色权限管理","iconCls":"icon-group_key","attributes":{"url":"Modules/RolePermissionAdmin.aspx","FullName":"角色权限管理"}}]}]';

var jsonMenu = JSON.parse(_menus);

$(function () {
    
    initNav();
    //tabClose();
    addTab("欢迎使用", "../../welcome.html", "icon-house_star");
    
});

function initNav() {
    
    AccordionTree.init();

    $('#tabs').tabs({
        tools: [{
            title: "首页",
            iconCls: "icon-house_star",
            handler: function () {
                addTab("欢迎使用", "welcome.html", "icon-house_star");
                return false;
            }
        },
        {
            iconCls: 'icon-arrow_refresh',
            handler: function () {
                var tab = $('#tabs').tabs('getSelected');
                if (tab.panel('options').title != onlyOpenTitle)
                    closeTab('refresh');
                else
                    return false;
            }
        },
        {
            iconCls: 'panel-tool-close',
            handler: function () {
                if (confirm('亲，确认要关闭所有窗口吗？')) {
                    closeTab("closeall");
                }
            }
        }],
        onContextMenu: function (e, title) {
            if (title !== onlyOpenTitle) { //起始页不创建快捷菜单
                e.preventDefault();
                $('#closeMenu').menu('show', {
                    left: e.pageX,
                    top: e.pageY
                });
                $('#tabs').tabs('select', title);
            } else {
                return false;
            }
        }
    });
}

var AccordionTree = {
    init: function () {
        $.each(jsonMenu, function (i, n) {
            var cssIcon = 'icon icon-application_osx'; //没有设置图标，则取一个默认图标
            if (n.iconCls) {
                cssIcon = n.iconCls;
            }

            $('#wnav').append('<div style="padding:5px;" title="' + n.text
                             + '" data-options="border:false,iconCls:\''
                             + cssIcon
                             + '\'"><ul id="nt'
                             + i
                             + '"></ul></div>');
        });

        $("#wnav").accordion({
            fit: true,
            border: false,
            onSelect: function (t, i) {
                $('#nt' + i).tree({
                    lines: false,
                    animate: true,
                    data: jsonMenu[i].children,
                    onClick: function (node) {
                        if (node.attributes.url != "" && node.attributes.url != '#') {
                            addTab(node.text, node.attributes.url + '?navid=' + node.id, node.iconCls);
                        } else {
                            $('#nt' + i).tree('toggle', node.target);
                        }
                    }
                });
            }
        });
    }
};

function addTab(subtitle, url, icon) {
    if (url == "" || url == "#")
        return false;
    var tabCount = $('#tabs').tabs('tabs').length;
    var hasTab = $('#tabs').tabs('exists', subtitle);
    var add = function () {
        if (!hasTab) {
            $('#tabs').tabs('add', {
                title: subtitle,
                content: createFrame(url),
                closable: (subtitle != onlyOpenTitle),
                icon: icon
            });
        } else {
            $('#tabs').tabs('select', subtitle);
            //closeTab('refresh'); //选择TAB时刷新页面
        }
    };

    if (tabCount > openTabs && !hasTab) {
        var msg = '<b>亲，你打开的页面太多了，如果继续打开会影响程序的运行效率！</b>';
        $.messager.confirm("系统提示", msg, function (b) {
            if (b) {
                add();
            } else {
                return false;
            }
        });
    } else {
        add();
    }
    return false;
}

function createFrame(url) {
    var s = '<iframe scrolling="no" frameborder="0"  style="width:100%;height:100%;marginheight:0;marginwidth:0;" src="' + url + '" ></iframe>';
    //var s = '<iframe scrolling="no" frameborder="0"  style="width:100%;height:100%;" src="' + url + '" ></iframe>';
    return s;
}

function tabClose() {
    /*双击关闭TAB选项卡*/
    $(".tabs-inner").live('dblclick', function () {
        var subtitle = $(this).children(".tabs-closable").text();
        if (subtitle != onlyOpenTitle && subtitle != "")
            $('#tabs').tabs('close', subtitle);
    });
}

function closeTab(action) {
    var alltabs = $('#tabs').tabs('tabs');
    var currentTab = $('#tabs').tabs('getSelected');
    var allTabtitle = [];
    $.each(alltabs, function (i, n) {
        allTabtitle.push($(n).panel('options').title);
    });
    var currtabTitle;
    var tabIndex;
    switch (action) {
        case "refresh":
            var iframe = $(currentTab.panel('options').content);
            var src = iframe.attr('src');
            $('#tabs').tabs('update', {
                tab: currentTab,
                options: {
                    content: createFrame(src)
                }
            });
            break;
        case "close":
            currtabTitle = currentTab.panel('options').title;
            $('#tabs').tabs('close', currtabTitle);
            break;
        case "closeall":
            $.each(allTabtitle, function (i, n) {
                if (n != onlyOpenTitle) {
                    $('#tabs').tabs('close', n);
                }
            });
            break;
        case "closeother":
            currtabTitle = currentTab.panel('options').title;
            $.each(allTabtitle, function (i, n) {
                if (n != currtabTitle && n != onlyOpenTitle) {
                    $('#tabs').tabs('close', n);
                }
            });
            break;
        case "closeright":
            tabIndex = $('#tabs').tabs('getTabIndex', currentTab);
            if (tabIndex == alltabs.length - 1) {
                alert('亲，后边没有啦 ^@^!!');
                return false;
            }
            $.each(allTabtitle, function (i, n) {
                if (i > tabIndex) {
                    if (n != onlyOpenTitle) {
                        $('#tabs').tabs('close', n);
                    }
                }
            });
            break;
        case "closeleft":
            tabIndex = $('#tabs').tabs('getTabIndex', currentTab);
            if (tabIndex == 1) {
                alert('亲，起始页关闭不了的哟。 ^@^!!');
                return false;
            }
            $.each(allTabtitle, function (i, n) {
                if (i < tabIndex) {
                    if (n != onlyOpenTitle) {
                        $('#tabs').tabs('close', n);
                    }
                }
            });
            break;
        case "exit":
            $('#closeMenu').menu('hide');
            break;
    }
}