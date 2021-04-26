var api = {
    addStudent(data, cb) {
        $.ajax({
            url: '/api/student/addStudent',
            type: 'get',
            data: data,
            dataType: 'json',
            success: function (res) {
                if (res.status == 'success') {
                    cb(res);
                }

            }
        })
    },
    updateStudent(data, cb) {
        $.ajax({
            url: '/api/student/updateStudent',
            type: 'get',
            data: data,
            dataType: 'json',
            success: function (res) {

                if (res.status == 'success') {
                    cb();
                }

            }
        })
    },
    deldetStudent(data, cb) {
        $.ajax({
            url: '/api/student/deldetStudent',
            type: 'get',
            data: data,
            dataType: 'json',
            success: function (res) {
                if (res.status == 'success') {
                    cb(res);
                }
            }
        })
    },
    findAllStudent(page,Size ,cb) {
        $.ajax({
            url: '/api/student/findAll',
            type: 'get',
            dataType: 'json',
            data: {
                appkey: 'xxxx',
                page: page,
                Size: Size
            },
            success: function (res) {
               if(res.status == "success"){
                   cb(res);
               }
            }
        })
    }


}