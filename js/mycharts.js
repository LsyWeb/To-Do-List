(function () {

    var pie = {
        init(){
            this.getData();
            this.option = {
                title:{
                    text:'',
                    subtext:'学生管理',
                    left:'center'
                },
                legend:{
                    data:[],
                    orient:"vertical",
                    left:'left'
                },
                series:{
                    type:'pie',
                    data:[],
                    radius:'60%'
                }

            }
        },
        getData(){
            let _this = this;
            api.findAllStudent(1,1,function(res) {
                // console.log(res.data.allData);
                let list = res.data.allData;

                if(list.length > 0){
                    _this.areaChart(list);
                    _this.sexChart(list);
                }
                
            })
        },
        areaChart(data){
            var myChart = echarts.init($('.chart1')[0]);
            var seriesData = [];
            var legendData = [];
            var newData = {};
            data.forEach(function (item,index){
                if(!newData[item.address]){
                    newData[item.address] = 1;
                    legendData.push(item.address)
                }else{
                    newData[item.address]++;
                }
            });
            // console.log(newData)
            for(var prop in newData){
                seriesData.push({
                    name:prop,
                    value:newData[prop]
                })
            }
            // console.log(seriesData)
            this.option.title.text = '学生地区分布图';
            this.option.legend.data = legendData;
            this.option.series.data = seriesData;

            myChart.setOption(this.option)
        },
        sexChart(data){
            var myChart = echarts.init($('.chart2')[0]);

            var legendData = ["男","女"];
            var newData = {};
            data.forEach(function (item,index){
                if(!newData[item.sex]){
                    newData[item.sex] = 1;
                }else{
                    newData[item.sex]++;
                }
            });
            // console.log(newData);
            var seriesData = [
                {name:'男',value:newData[0]},
                {name:'女',value:newData[1]}
            ]
            
            // console.log(seriesData)
            this.option.title.text = '学生性别分布统计图';
            this.option.legend.data = legendData;
            this.option.series.data = seriesData;
            myChart.setOption(this.option);
        }
    }
    pie.init();
} ())
