var curChina;
$.ajax({

    url: "../resource/province.json", //json文件位置，文件名

    type: "GET", //请求方式为get

    dataType: "json", //返回数据格式为json

    async: false,

    success: function(data) { //请求成功完成后要执行的方法 
        //给info赋值给定义好的变量
        curChina = data;
    }
})


var allProvince = [];
for (var i = 0; i < curChina.length; i++) {
    $.ajax({

        url: curChina[i].statisticsData, //json文件位置，文件名


        type: "GET", //请求方式为get

        dataType: "json", //返回数据格式为json

        async: false,

        success: function(data) { //请求成功完成后要执行的方法 

            allProvince[curChina[i].provinceShortName] = data.data;
        }
    })
}
//console.log(allProvince['山东']);
var dates = [];
var currentConfirmed = [];
var cured = [];
var dead = [];

for (var i = 0; i < allProvince['广东'].length; i++) {
    var date = allProvince['广东'][i].dateId.toString();
    date = date.substr(4, 2) + "/" + date.substr(6, 2);
    dates.push(date);
}
for (var i = 0; i < dates.length; i++) {
    cured[dates[i]] = [];
    currentConfirmed[dates[i]] = [];
    dead[dates[i]] = [];
}

function Data(name, value) {
    this.name = name;
    this.value = value;
}

var pListCN = ['山东', '湖北', '北京', '上海', '天津', '重庆', '香港', '澳门', '安徽', '福建', '甘肃', '广东', '广西', '贵州', '海南', '河北',
    '河南', '黑龙江', '湖南', '吉林', '江苏', '江西', '辽宁', '内蒙古', '宁夏', '青海', '山西', '陕西', '四川', '台湾', '西藏', '新疆', '云南', '浙江'
];
try {
    for (var i = 0; i < pListCN.length; i++) {
        var province = pListCN[i];
        //console.log(province);
        var provinceData = allProvince[province];
        //console.log(provinceData);
        for (var j = 0; j < provinceData.length; j++) {
            var data = provinceData[j];

            var date = data.dateId.toString();
            date = date.substr(4, 2) + "/" + date.substr(6, 2);

            currentConfirmed[date].push(new Data(province, data.currentConfirmedCount));
            cured[date].push(new Data(province, data.curedCount));
            dead[date].push(new Data(province, data.deadCount));
        }
    }
} catch (error) {

}

//console.log(currentConfirmed['01/25']);

var chinaData = [];

for (var i = 0; i < dates.length; i++) {
    var date = dates[i];
    var allCurConfirmed = 0;
    var allCured = 0;
    var allDead = 0;

    for (var j = 0; j < currentConfirmed[date].length; j++) {
        allCurConfirmed += currentConfirmed[date][j].value;
        allCured += cured[date][j].value;
        allDead += dead[date][j].value;
    }

    chinaData[date] = [
        { name: '现存确诊', value: allCurConfirmed, visualMap: false },
        { name: '累计死亡', value: allDead, visualMap: false },
        { name: '累计治愈', value: allCured, visualMap: false }
    ]

}

console.log(chinaData['01/25']);


function showTimeline() {
    let myChart = echarts.init(document.getElementById('timeline'));
    myChart.setOption({
        baseOption: {
            timeline: {
                axisType: 'category',
                autoPlay: true,
                playInterval: 300,
                data: dates,
                tooltip: {}
            },
            title: {
                left: 'center',
                text: '全国历史数据',
                subtext: '数据来自丁香园'
            },
            tooltip: {
                show: true,
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                //icon: 'circle',
                data: [
                    '确诊',
                    '死亡',
                    '治愈',
                ],
                icon: 'circle'
            },
            visualMap: {
                type: 'continuous',
                min: 0,
                max: 3000,
                left: 'left',
                top: 'bottom',
                text: ['高', '低'], // 文本，默认为数值文本
                calculable: true,
                color: ['black', 'rgb(71,6,6)', 'red', 'pink'],
                //seriesIndex: ['map1', 'map2', 'map3']
            },
            series: [{
                    id: 'map1',
                    name: '确诊',
                    type: 'map',
                    mapType: 'china',
                    label: {
                        normal: {
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                }, {
                    id: 'map2',
                    name: '死亡',
                    type: 'map',
                    mapType: 'china',
                    label: {
                        normal: {
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                }, {
                    id: 'map3',
                    name: '治愈',
                    type: 'map',
                    mapType: 'china',
                    label: {
                        normal: {
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                },
                {
                    id: 'pie0',
                    name: '比例',
                    type: 'pie',
                    radius: '60px',
                    center: ["90%", '80%']
                }
            ]
        },


        options: [{
                series: [
                    { data: currentConfirmed[dates[0]] },
                    { data: dead[dates[0]] },
                    { data: cured[dates[0]] },
                    { data: chinaData[dates[0]] }
                ]
            },
            {
                series: [
                    { data: currentConfirmed[dates[1]] },
                    { data: dead[dates[1]] },
                    { data: cured[dates[1]] },
                    { data: chinaData[dates[1]] }
                ]
            },
            {
                series: [
                    { data: currentConfirmed[dates[2]] },
                    { data: dead[dates[2]] },
                    { data: cured[dates[2]] },
                    { data: chinaData[dates[2]] }
                ]
            },
            {
                series: [
                    { data: currentConfirmed[dates[3]] },
                    { data: dead[dates[3]] },
                    { data: cured[dates[3]] },
                    { data: chinaData[dates[3]] }
                ]
            },
            {
                series: [
                    { data: currentConfirmed[dates[4]] },
                    { data: dead[dates[4]] },
                    { data: cured[dates[4]] },
                    { data: chinaData[dates[4]] }
                ]
            },
            {
                series: [
                    { data: currentConfirmed[dates[5]] },
                    { data: dead[dates[5]] },
                    { data: cured[dates[5]] },
                    { data: chinaData[dates[5]] }
                ]
            },
            {
                series: [
                    { data: currentConfirmed[dates[6]] },
                    { data: dead[dates[6]] },
                    { data: cured[dates[6]] },
                    { data: chinaData[dates[6]] }
                ]
            },
            {
                series: [
                    { data: currentConfirmed[dates[7]] },
                    { data: dead[dates[7]] },
                    { data: cured[dates[7]] },
                    { data: chinaData[dates[7]] }
                ]
            },
            {
                series: [
                    { data: currentConfirmed[dates[8]] },
                    { data: dead[dates[8]] },
                    { data: cured[dates[8]] },
                    { data: chinaData[dates[8]] }
                ]
            },
            {
                series: [
                    { data: currentConfirmed[dates[9]] },
                    { data: dead[dates[9]] },
                    { data: cured[dates[9]] },
                    { data: chinaData[dates[9]] }
                ]
            },
            {
                series: [
                    { data: currentConfirmed[dates[10]] },
                    { data: dead[dates[10]] },
                    { data: cured[dates[10]] },
                    { data: chinaData[dates[10]] }
                ]
            },
            {
                series: [
                    { data: currentConfirmed[dates[11]] },
                    { data: dead[dates[11]] },
                    { data: cured[dates[11]] },
                    { data: chinaData[dates[11]] }
                ]
            },
            {
                series: [
                    { data: currentConfirmed[dates[12]] },
                    { data: dead[dates[12]] },
                    { data: cured[dates[12]] },
                    { data: chinaData[dates[12]] }
                ]
            },
            {
                series: [
                    { data: currentConfirmed[dates[13]] },
                    { data: dead[dates[13]] },
                    { data: cured[dates[13]] },
                    { data: chinaData[dates[13]] }
                ]
            },
            {
                series: [
                    { data: currentConfirmed[dates[14]] },
                    { data: dead[dates[14]] },
                    { data: cured[dates[14]] },
                    { data: chinaData[dates[14]] }
                ]
            },
            {
                series: [
                    { data: currentConfirmed[dates[15]] },
                    { data: dead[dates[15]] },
                    { data: cured[dates[15]] },
                    { data: chinaData[dates[15]] }
                ]
            },
            {
                series: [
                    { data: currentConfirmed[dates[16]] },
                    { data: dead[dates[16]] },
                    { data: cured[dates[16]] },
                    { data: chinaData[dates[16]] }
                ]
            },
            {
                series: [
                    { data: currentConfirmed[dates[17]] },
                    { data: dead[dates[17]] },
                    { data: cured[dates[17]] },
                    { data: chinaData[dates[17]] }
                ]
            },
            {
                series: [
                    { data: currentConfirmed[dates[18]] },
                    { data: dead[dates[18]] },
                    { data: cured[dates[18]] },
                    { data: chinaData[dates[18]] }
                ]
            },
            {
                series: [
                    { data: currentConfirmed[dates[19]] },
                    { data: dead[dates[19]] },
                    { data: cured[dates[19]] },
                    { data: chinaData[dates[19]] }
                ]
            },
            {
                series: [
                    { data: currentConfirmed[dates[20]] },
                    { data: dead[dates[20]] },
                    { data: cured[dates[20]] },
                    { data: chinaData[dates[20]] }
                ]
            },
            {
                series: [
                    { data: currentConfirmed[dates[21]] },
                    { data: dead[dates[21]] },
                    { data: cured[dates[21]] },
                    { data: chinaData[dates[21]] }
                ]
            },
            {
                series: [
                    { data: currentConfirmed[dates[22]] },
                    { data: dead[dates[22]] },
                    { data: cured[dates[22]] },
                    { data: chinaData[dates[22]] }
                ]
            },
            {
                series: [
                    { data: currentConfirmed[dates[23]] },
                    { data: dead[dates[23]] },
                    { data: cured[dates[23]] },
                    { data: chinaData[dates[23]] }
                ]
            },
            {
                series: [
                    { data: currentConfirmed[dates[24]] },
                    { data: dead[dates[24]] },
                    { data: cured[dates[24]] },
                    { data: chinaData[dates[24]] }
                ]
            },
            {
                series: [
                    { data: currentConfirmed[dates[25]] },
                    { data: dead[dates[25]] },
                    { data: cured[dates[25]] },
                    { data: chinaData[dates[25]] }
                ]
            },
            {
                series: [
                    { data: currentConfirmed[dates[26]] },
                    { data: dead[dates[26]] },
                    { data: cured[dates[26]] },
                    { data: chinaData[dates[26]] }
                ]
            },
            {
                series: [
                    { data: currentConfirmed[dates[27]] },
                    { data: dead[dates[27]] },
                    { data: cured[dates[27]] },
                    { data: chinaData[dates[27]] }
                ]
            },
            {
                series: [
                    { data: currentConfirmed[dates[28]] },
                    { data: dead[dates[28]] },
                    { data: cured[dates[28]] },
                    { data: chinaData[dates[28]] }
                ]
            },
            {
                series: [
                    { data: currentConfirmed[dates[29]] },
                    { data: dead[dates[29]] },
                    { data: cured[dates[29]] },
                    { data: chinaData[dates[29]] }
                ]
            },
            {
                series: [
                    { data: currentConfirmed[dates[30]] },
                    { data: dead[dates[30]] },
                    { data: cured[dates[30]] },
                    { data: chinaData[dates[30]] }
                ]
            },
            {
                series: [
                    { data: currentConfirmed[dates[31]] },
                    { data: dead[dates[31]] },
                    { data: cured[dates[31]] },
                    { data: chinaData[dates[31]] }
                ]
            },
            {
                series: [
                    { data: currentConfirmed[dates[32]] },
                    { data: dead[dates[32]] },
                    { data: cured[dates[32]] },
                    { data: chinaData[dates[32]] }
                ]
            },
            {
                series: [
                    { data: currentConfirmed[dates[33]] },
                    { data: dead[dates[33]] },
                    { data: cured[dates[33]] },
                    { data: chinaData[dates[33]] }
                ]
            },
            {
                series: [
                    { data: currentConfirmed[dates[34]] },
                    { data: dead[dates[34]] },
                    { data: cured[dates[34]] },
                    { data: chinaData[dates[34]] }
                ]
            },
            {
                series: [
                    { data: currentConfirmed[dates[35]] },
                    { data: dead[dates[35]] },
                    { data: cured[dates[35]] },
                    { data: chinaData[dates[35]] }
                ]
            },
            {
                series: [
                    { data: currentConfirmed[dates[36]] },
                    { data: dead[dates[36]] },
                    { data: cured[dates[36]] },
                    { data: chinaData[dates[36]] }
                ]
            },
            {
                series: [
                    { data: currentConfirmed[dates[37]] },
                    { data: dead[dates[37]] },
                    { data: cured[dates[37]] },
                    { data: chinaData[dates[37]] }
                ]
            },
            {
                series: [
                    { data: currentConfirmed[dates[38]] },
                    { data: dead[dates[38]] },
                    { data: cured[dates[38]] },
                    { data: chinaData[dates[38]] }
                ]
            },
            {
                series: [
                    { data: currentConfirmed[dates[39]] },
                    { data: dead[dates[39]] },
                    { data: cured[dates[39]] },
                    { data: chinaData[dates[39]] }
                ]
            },
            {
                series: [
                    { data: currentConfirmed[dates[40]] },
                    { data: dead[dates[40]] },
                    { data: cured[dates[40]] },
                    { data: chinaData[dates[40]] }
                ]
            },
            {
                series: [
                    { data: currentConfirmed[dates[41]] },
                    { data: dead[dates[41]] },
                    { data: cured[dates[41]] },
                    { data: chinaData[dates[41]] }
                ]
            },
            {
                series: [
                    { data: currentConfirmed[dates[42]] },
                    { data: dead[dates[42]] },
                    { data: cured[dates[42]] },
                    { data: chinaData[dates[42]] }
                ]
            },
            {
                series: [
                    { data: currentConfirmed[dates[43]] },
                    { data: dead[dates[43]] },
                    { data: cured[dates[43]] },
                    { data: chinaData[dates[43]] }
                ]
            }, {
                series: [
                    { data: currentConfirmed[dates[44]] },
                    { data: dead[dates[44]] },
                    { data: cured[dates[44]] },
                    { data: chinaData[dates[44]] }
                ]
            }, {
                series: [
                    { data: currentConfirmed[dates[45]] },
                    { data: dead[dates[45]] },
                    { data: cured[dates[45]] },
                    { data: chinaData[dates[45]] }
                ]
            },
            {
                series: [
                    { data: currentConfirmed[dates[46]] },
                    { data: dead[dates[46]] },
                    { data: cured[dates[46]] },
                    { data: chinaData[dates[46]] }
                ]
            },
            {
                series: [
                    { data: currentConfirmed[dates[46]] },
                    { data: dead[dates[47]] },
                    { data: cured[dates[47]] },
                    { data: chinaData[dates[47]] }
                ]
            },
        ]
    });
}