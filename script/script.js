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
        tooltip: {}, //显示数据信息
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
    let pieData = [12, 12, 30, 20];

    let myChart = echarts.init(document.getElementById('pieChart'));

    let option = {
        title: {
            text: '全国疫情',
            subtext: "当前",
        },
        tooltip: {
            trigger: 'item'
        },
        series: [{
            type: 'pie',
            data: pieData
        }]
    };

    myChart.setOption(option);
}


//各省累计确诊数pie
function pieChart2() {
    let pieData = [12, 12, 30, 1, 12, 1, 12];

    let myChart = echarts.init(document.getElementById('pieChart2'));

    let option = {
        title: {
            text: '各省确诊',
            subtext: "当前现有",
            //left: "center"
        },
        tooltip: {},
        roseType: 'angle',
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
            data: pieData,
            itemStyle: {
                normal: {
                    color: '#c23531',
                    shadowBlur: 200,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
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
            data: ['累计死亡', '当前疑似', '当前确诊', '累计治愈']
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
            data: []
        },
        series: [{
                name: '累计死亡',
                type: 'bar',
                stack: '总量',
                label: {
                    show: true,
                    position: 'insideRight'
                },
                data: []
            },
            {
                name: '当前疑似',
                type: 'bar',
                stack: '总量',
                label: {
                    show: true,
                    position: 'insideRight'
                },
                data: []
            },
            {
                name: '当前确诊',
                type: 'bar',
                stack: '总量',
                label: {
                    show: true,
                    position: 'insideRight'
                },
                data: []
            },
            {
                name: '累计治愈',
                type: 'bar',
                stack: '总量',
                label: {
                    show: true,
                    position: 'insideRight'
                },
                data: [],
            }
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