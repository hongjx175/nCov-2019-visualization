function welcome() {
    //window.alert("欢迎浏览2019-nCov疫情可视化simple web！");
}


//折线图
function lineChart() {
    let lineData = [12, 12, 17]
    let myChart = echarts.init(document.getElementById('lineChart'));

    // 指定图表的配置项和数据
    let option = {
        title: {
            //text: '全国疫情',
            subtext: '发展',
            //left: 'center'
        },
        tooltip: {}, //鼠标扫过显示数据信息
        xAxis: [{
            type: 'category'
        }],
        yAxis: [{
            type: 'value'
        }],
        series: [{
            name: '全国疫情',
            type: 'line',
            data: lineData
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}


//饼图
function pieChart() {
    let pieData = [12, 12, 30];

    let myChart = echarts.init(document.getElementById('pieChart'));

    let option = {
        title: {
            text: '全国疫情',
            subtext: "当前",
            //left: "center"
        },
        tooltip: {},
        series: [{
            type: 'pie',
            data: pieData
        }]
    };

    myChart.setOption(option);
}


//各省累计确诊数pie
function pieChart2() {
    let pieData = [12, 12, 30];

    let myChart = echarts.init(document.getElementById('pieChart2'));

    let option = {
        title: {
            text: '各省疑似',
            subtext: "当前",
            //left: "center"
        },
        tooltip: {},
        series: [{
            type: 'pie',
            data: pieData
        }]
    };

    myChart.setOption(option);
}


//各省排名
function showListBar() {
    let myChart = echarts.init(document.getElementById('listBar'));
    let option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data: ['累计死亡', '当前疑似', '累计确诊', '累计治愈']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value'
        },
        yAxis: {
            type: 'category',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        series: [{
                name: '累计死亡',
                type: 'bar',
                stack: '总量',
                label: {
                    show: true,
                    position: 'insideRight'
                },
                data: [320, 302, 301, 334, 390, 330, 300]
            },
            {
                name: '当前疑似',
                type: 'bar',
                stack: '总量',
                label: {
                    show: true,
                    position: 'insideRight'
                },
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: '累计确诊',
                type: 'bar',
                stack: '总量',
                label: {
                    show: true,
                    position: 'insideRight'
                },
                data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
                name: '累计治愈',
                type: 'bar',
                stack: '总量',
                label: {
                    show: true,
                    position: 'insideRight'
                },
                data: [150, 212, 201, 154, 190, 330, 410],
            }
        ]
    };
    myChart.setOption(option);
}