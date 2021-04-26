var result = Mock.mock({
    "msg":'',
    "status":'sucess',
    "data|108":[{
        "name":"@cname",
        "sex|1":[0,1],
        "email": /^[a-zA-Z0-9_\-\.]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
        "sNo":/^\d{4,10}$/,
        "birth":"@date(yyyy)",
        "phone":/^1[3-9]\d{9}$/,
        "address":"@province"
    }]
    
})
// 新增学生
Mock.mock(RegExp("/api/student/addStudent?[\w\w]*"),'get',function (options) {
    var query = decodeURIComponent(options.url).split('?')[1];
    var queryData = queryToObj(query);
    result.data.unshift(queryData);

    return {
        "msg":'',
        "status":'success',
        "data":result.data
    }
})
// 查询所有学生
Mock.mock(RegExp("/api/student/findAll?[\w\w]*"),'get',function (options) {
    var query = decodeURIComponent(options.url).split('?')[1];
    var queryData = queryToObj(query);
    var current = queryData.page || 1;
    var size = queryData.size || 10;
    var arr = result.data.filter(function (item,index){
        return index >= (current - 1) * size && index < current * size;
    })
    return {
        "msg":'',
        "status":'success',
        "data":{
            data:arr,
            count:result.data.length,
            allData:result.data
        }
    }
})
// 修改学生信息
Mock.mock(RegExp("/api/student/updateStudent?[\w\w]*"),'get',function (options) {
    var query = decodeURIComponent(options.url).split('?')[1];
    var queryData = queryToObj(query);
    for(var i = 0 ; i < result.data.length; i++){
        if(result.data[i].sNo == queryData.sNo){
            result.data[i] = queryData;
        }
    }

    return {
        "msg":'',
        "status":'success',
        "data":result.data
    }
})

// 删除学生信息
Mock.mock(RegExp("/api/student/deldetStudent?[\w\w]*"),'get',function (options) {
    var query = decodeURIComponent(options.url).split('?')[1];
    var queryData = queryToObj(query);

    if(queryData.sNo){
        result.data = result.data.filter(function (item) {
            return item.sNo != queryData.sNo;
        });
        // 删除操作
        // for(var i = 0; i <result.data.length; i++){
        //     if(result.data[i].sNo == queryData.sNo){
        //         result.data.splice(i,1);          
        //     }
        // }
        return {
            "msg":'',
            "status":'success',
            "data":{}
        }
    }else {
        return {
            "status": "fail",
            "msg": "未传递学号",
            "data": {}
        }
    }
    

})

//对接收的数据进行处理
function queryToObj (queryStr) {
    var queryData = {};
    var queryArr = queryStr.split('&');
    for(var i = 0; i < queryArr.length; i++){
        var key = queryArr[i].split('=')[0];
        var value = queryArr[i].split('=')[1];
        queryData[key] = value;
    }
    return queryData;
}
