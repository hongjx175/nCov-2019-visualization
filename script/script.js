function welcome() {
    //window.alert("欢迎浏览2019-nCov疫情可视化simple web！");
}

var dataArray;
$.ajax({

    url: "../resource/province.json", //json文件位置，文件名

    type: "GET", //请求方式为get

    dataType: "json", //返回数据格式为json

    async: false,

    success: function(data) { //请求成功完成后要执行的方法 
        //给info赋值给定义好的变量
        dataArray = data;
    }

})



var currentConfirmedData = [];
var suspectedData = [];
var curedData = [];
var deadData = [];


function Data(name, value) {
    this.name = name;
    this.value = value;
    //console.log(value);
}


for (var i = 0; i < dataArray.length; i++) {
    currentConfirmedData.push(new Data(dataArray[i].provinceShortName, dataArray[i].currentConfirmedCount));
    //console.log(dataArray[i].currentConfirmedCount);
    suspectedData.push(new Data(dataArray[i].provinceShortName, dataArray[i].suspectedCount));
    curedData.push(new Data(dataArray[i].provinceShortName, dataArray[i].curedCount));
    deadData.push(new Data(dataArray[i].provinceShortName, dataArray[i].deadCount));
}

var sumConfrimed = 0,
    sumSuspected = 0,
    sumDead = 0,
    sumCured = 0;
for (var i = 0; i < currentConfirmedData.length; i++) {
    sumConfrimed += currentConfirmedData[i].value;
    sumSuspected += suspectedData[i].value;
    sumDead += deadData[i].value;
    sumCured += curedData[i].value;
    //console.log(sumCured);
}


//饼图
function pieChart() {
    let pieData = [

        { name: '死亡', value: sumDead },
        { name: '确诊', value: sumConfrimed },
        { name: '治愈', value: sumCured },
    ];

    let myChart = echarts.init(document.getElementById('pieChart'));

    let option = {
        title: {
            text: '全国疫情',
            subtext: "当前",
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [{
            type: 'pie',
            name: '比例',
            data: pieData
        }]
    };

    myChart.setOption(option);
}
//折线图
function lineChart() {
    let lineData = [12, 12, 17]
    let myChart = echarts.init(document.getElementById('lineChart'));

    console.log(chinaData);

    var chinaDataConfirmed = [];
    var chinaDataCured = [];
    var chinaDataDead = [];

    for (var i = 0; i < dates.length; i++) {
        chinaDataConfirmed.push(chinaData[dates[i]][0].value);
        chinaDataCured.push(chinaData[dates[i]][2].value);
        chinaDataDead.push(chinaData[dates[i]][1].value);
    }

    // 指定图表的配置项和数据
    let option = {
        title: {
            //text: '全国疫情',
            subtext: '发展',
            //left: 'center'
        },
        legend: {
            data: ['现存确诊', '累计治愈', '累计死亡']
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: [{
            type: 'category',
            data: dates
        }],
        yAxis: [{
            type: 'value'
        }],
        series: [{
                name: '累计死亡',
                type: 'line',
                data: chinaDataDead
            }, {
                name: '现存确诊',
                type: 'line',
                data: chinaDataConfirmed
            },
            {
                name: '累计治愈',
                type: 'line',
                data: chinaDataCured
            },
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}





//各省累计确诊数pie
function pieChart2() {
    let pieData = currentConfirmedData;

    let myChart = echarts.init(document.getElementById('pieChart2'));

    let option = {
        title: {
            text: '各省确诊',
            subtext: "当前现有",
            //left: "center"
        },
        tooltip: {
            formatter: '{a} <br/>{b} : {c} ({d}%)' //显示百分比
        },
        //roseType: 'angle',
        labelLine: {
            normal: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.3)'
                }
            }
        },
        itemStyle: {
            normal: {
                color: '#c23531',
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        },
        label: {
            normal: {
                textStyle: {
                    color: 'rgba(255, 255, 255, 0.3)'
                }
            }
        },
        series: [{
            type: 'pie',
            name: '确诊',
            data: pieData,
            radius: '60%',
            center: ['50%', '62%'],
            itemStyle: {
                normal: {
                    //color: 'white',
                    shadowBlur: 200,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }, ]
    };

    myChart.setOption(option);
}


//各省排名
function showListBar() {
    var curedData1 = curedData;
    var deadData1 = deadData;
    var currentConfirmedData1 = currentConfirmedData;
    for (var i = 0; i < deadData1.length; i++) {
        if (deadData1[i].name == '湖北') {
            var temp = deadData1[i];
            deadData1[i] = deadData1[deadData1.length - 1];
            deadData1[deadData1.length - 1] = temp;

            var temp = currentConfirmedData1[i];
            currentConfirmedData1[i] = currentConfirmedData1[currentConfirmedData1.length - 1];
            currentConfirmedData1[currentConfirmedData1.length - 1] = temp;

            var temp = curedData1[i];
            curedData1[i] = curedData[curedData1.length - 1];
            curedData1[curedData1.length - 1] = temp;

            break;
        }
    }
    curedData1.pop();
    currentConfirmedData1.pop();
    deadData1.pop();


    //进行升序排序
    var length = deadData1.length;
    for (var i = 0; i < length; i++) {
        var p = i;
        var min = 100000000;
        for (var j = i; j < length; j++) {
            var sum = deadData1[j].value + curedData1[j].value + currentConfirmedData1[j].value;
            if (sum < min) {
                min = sum;
                p = j;
            }
        }

        var temp = deadData1[i];
        deadData1[i] = deadData1[p];
        deadData1[p] = temp;

        var temp = currentConfirmedData1[i];
        currentConfirmedData1[i] = currentConfirmedData1[p];
        currentConfirmedData1[p] = temp;

        var temp = curedData1[i];
        curedData1[i] = curedData1[p];
        curedData1[p] = temp;

    }


    var nameData = [];
    for (var i = 0; i < length; i++) {
        nameData[i] = deadData1[i].name;
    }
    //console.log(nameData);
    //console.log(deadData1);
    let myChart = echarts.init(document.getElementById('listBar'));
    let option = {
        title: {
            text: '除湖北省',
            subtext: '33个省无疑似'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data: ['确诊', '治愈', '死亡'],
            show: true
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
            data: nameData
        },
        series: [{
                name: '确诊',
                type: 'bar',
                stack: '总量',
                label: {
                    show: true,
                    position: 'insideRight'
                },
                data: currentConfirmedData1
            },
            {
                name: '治愈',
                type: 'bar',
                stack: '总量',
                label: {
                    show: true,
                    position: 'insideRight'
                },
                data: curedData1
            },
            {
                name: '死亡',
                type: 'bar',
                stack: '总量',
                label: {
                    show: true,
                    position: 'insideRight'
                },
                data: deadData1
            },
        ]
    };
    myChart.setOption(option);
}


//回到顶部
function gotoTop() {
    // 获取按钮
    const goTopBtn = document.getElementById('gotoTop');
    // 初始时，被浏览器卷进去的上部内容高度为 0
    let scrollTop = 0;
    // 监听页面滚动事件
    window.onscroll = () => {
        // 获取被浏览器卷进去的上部内容高度
        scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        // 如果被卷进去的内容高度大于 50，显示返回顶部的按钮；
        // 如果被卷进去的内容高度小于 50，隐藏返回顶部的按钮。
        scrollTop > 50 ? (goTopBtn.style.display = 'block') : (goTopBtn.style.display = 'none')
    };
    goTopBtn.onclick = () => {
        // 清空上一次的定时器
        let timer = null;
        clearInterval(timer);
        // 创建定时器，每 15ms 执行一次箭头函数
        timer = setInterval(() => {
            // 每次执行函数，scrollTop 减少十分之一
            scrollTop -= scrollTop / 10;
            window.scrollTo(0, scrollTop)
                // 当 scrollTop 小于 2 时，直接使 scrollTop 为 0，并且清空定时器。
            if (scrollTop < 2) {
                window.scrollTo(0, 0);
                clearInterval(timer);
            }
        }, 15)
    };
}

function goNext() {
    window.location.href = 'second.html';
}

function goBack() {
    window.location.href = 'main.html';
}