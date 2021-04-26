function init() {
    bindEvent();
    location.hash = 'student-list';
}
init();
var tableData = [];

// 当前页对应的页码
var currentPage = 1;
// 总页数
var totalPage = 1;
// 表格每一页的信息条数
var pageSize = 10;
// 绑定事件
function bindEvent() {
    // 顶部菜单栏的点击事件
    $('header .btn').click(function () {
        $('header .drap-list').stop().slideToggle(300);
    })
    // 当浏览器尺寸发生变化时
    $(window).resize(showMove);
    function showMove() {
        if ($(window).innerWidth() > 768) {
            $('header .drap-list').slideUp(300);
        }
    }
    // hash值变化时发生的事件
    $(window).on('hashchange', function () {
        let hash = location.hash;
        console.log(hash);
        $('.student-item.active').removeClass('active');
        $(`.${hash.slice(1)}`).addClass('active');

        $('.content-item.show').removeClass('show');
        $(hash).addClass('show');
    })
    // 左侧菜单栏点击事件
    $('.student-item').click(function () {
        let id = $(this).attr('data-id');
        location.hash = id;
        $('.drap-list').slideUp(300);
    })
    // e.stopImmediatePropagation()
    //阻止监听同一事件的其他事件监听器被调用。

    // 提交按钮
    $('#add-student-btn').click(function (e) {
        e.preventDefault(); //组织浏览器默认刷新行为
        // 新增按钮
        var addFormData = getFormData($('#add-student-form')[0]);
        console.log(addFormData);
        if (addFormData.status == 'success') {
            api.addStudent(addFormData.data, function (res) {
                console.log(res)
                alert("新增成功");
                getTableData();//获取表格数据

                // location.hash = 'student-list'; //跳转到学生列表
                $('.left-menu').find('.student-list').trigger('click');
            })
        } else {
            alert(addFormData.msg)
        }


    })
    // 编辑按钮
    $('#student-list tbody').on('click', '.edit-btn', function () {
        var index = $(this).parents('tr').index();
        renderEditForm(tableData[index]);
        $('.modal').slideDown();
    }).on('click', '.remove-btn', function () {
        //删除按钮
        var index = $(this).parents('tr').index();
        var isdel = confirm('确认删除学号为' + tableData[index].sNo + '的学生吗？');
        if (isdel) {
            api.deldetStudent({
                sNo: tableData[index].sNo,
                appkey: 'deldeldel'
            }, function (res) {
                alert('删除成功');
                getTableData();
                $('.turnpage').show();
                console.log(res);
            })
        }
    })


    // 编辑的提交按钮
    $('#modal-edit-btn').click(function (e) {
        // e.stopImmediatePropagation();
        e.preventDefault(); //阻止浏览器默认刷新行为
        // 获取表单元素
        var editFormData = getFormData($('#edit-form')[0]);
        console.log(editFormData);
        if (editFormData.status == 'success') {
            api.updateStudent(editFormData.data, function () {
                alert("修改成功");
                getTableData();//获取表格数据
                $('.modal').slideUp();
                $('.turnpage').show();
                console.log(1)
            })
        } else {
            alert(editFormData.msg);
        }
    })

    //关闭弹窗
    $('.modal').click(function (e) {
        if (e.target == this) {
            $(this).hide();
            console.log(111)
        }
    })

    // 查找学生
    $('.search-btn').click(function () {
        var id = $('.search input').val();
        console.log(id);
        if(id == ''){
            alert('您还未输入学号')
            return
        }
        api.findAllStudent(currentPage,pageSize,function(res){
            var targetData = res.data.allData;
            var arr = targetData.filter(function (item,index) {
                return item.sNo == id;
            })
            tableData = arr;
            console.log(tableData)
            renderTable(tableData);
            // 搜索页面需要把分页按钮去除
            $('.turnpage').hide();
            // 如果学生不存在
            if(tableData.length == 0){
                var str = `该学生不存在！`;
                $('#student-list').find('tbody').html(str).css({
                    fontWeight: 'bold',
                    fontSize: '1.2rem'
                });
            }
        })
        $('.search-back').show();
    })
    // 搜索返回按钮点击事件
    $('.search-back').click(function () {
        getTableData();
        $('.search-back').hide();
        $('.turnpage').show();
        $('#student-list').find('tbody').css({
            fontWeight: '',
            fontSize: '1rem'
        });
        // 返回后要把输入框里的内容清空
        $('.search input')[0].value = '';
    })

    
}
//获取表单信息
function getFormData(form) {
    var name = form.name.value;
    var sex = form.sex.value;
    var email = form.email.value;
    var sNo = form.sNo.value;
    var birth = form.birth.value;
    var address = form.address.value;
    var phone = form.phone.value;
    //最终返回的信息
    var result = {
        data: {},
        status: 'success',
        msg: ''
    }
    if (!name || !sex || !email || !sNo || !birth || !address || !phone) {
        result.status = 'fill';
        result.msg = '信息填写不全';
        return result;
    }
    //判断邮箱的规则
    var emailReg = /^[a-zA-Z0-9_\-\.]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (!emailReg.test(email)) {
        result.status = 'fill';
        result.msg = '邮箱格式不对';
        return result;
    }
    //判断学号的规则
    var sNoReg = /^\d{4,10}$/;
    if (!sNoReg.test(sNo)) {
        result.status = 'fill';
        result.msg = '学号格式不对';
        return result;
    }
    // 出生年份的校验 1975 - 2020
    if (birth < 1950 || birth > 2020) {
        result.status = 'fail';
        result.msg = '出生年份不正确';
        return result;
    }
    //判断手机号的规则
    var phoneReg = /^1[3-9]\d{9}$/;
    if (!phoneReg.test(phone)) {
        result.status = 'fill';
        result.msg = '手机号格式不对';
        return result;
    }

    result.data = {
        name,
        sex,
        sNo,
        email,
        birth,
        phone,
        address
    }
    return result;

}

// 页面加载完成
window.onload = function () {
    var hash = location.hash;
    getTableData();
}

//渲染页面
function renderTable(data) {
    var str = data.reduce(function (pre, ele, index) {

        return pre + `<tr>
        <!-- td: 列 -->
        <td>${ele.name}</td>
        <td>${ele.sex == 0 ? '男' : '女'}</td>
        <td>${ele.sNo}</td>
        <td>${ele.email}</td>
        <td>${new Date().getFullYear() - ele.birth}</td>
        <td>${ele.phone}</td>
        <td>${ele.address}</td>
        <td>
        <button class="edit-btn redact" data-index=${index}>编辑</button>
        <button class="remove-btn remove" data-index=${index}>删除</button>
        </td>
    </tr>`;
    }, "");
    $('#student-list').find('tbody').html(str);

    // 分页
    $('.turnpage').page({
        current: currentPage,
        total: totalPage,
        change: function (page) {
            currentPage = page;
            getTableData();
        }
    })
}


//获取表格数据
function getTableData() {
    api.findAllStudent(currentPage, pageSize, function (res) {
        tableData = res.data.data;
        totalPage = Math.ceil(res.data.count / pageSize);
        renderTable(tableData);
    })
}

function renderEditForm(data) {
    var form = $('#edit-form')[0];
    for (var prop in data) {
        if (form[prop]) {
            form[prop].value = data[prop];
        }
    }
}