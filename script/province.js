var pListEN = ['shandong', 'hubei', 'beijing', 'shanghai', 'tianjin', 'chongqing', 'xianggang', 'aomen', 'anhui', 'fujian', 'gansu',
    'guangdong', 'guangxi', 'guizhou', 'hainan', 'hebei', 'henan', 'heilongjiang', 'hunan', 'jilin', 'jiangsu', 'jiangxi', 'liaoning',
    'neimenggu', 'ningxia', 'qinghai', 'shanxi', 'shanxi1', 'sichuan', 'taiwan', 'xizang', 'xinjiang', 'yunnan', 'zhejiang'
];
var pListCN = ['山东', '湖北', '北京', '上海', '天津', '重庆', '香港', '澳门', '安徽', '福建', '甘肃', '广东', '广西', '贵州', '海南', '河北',
    '河南', '黑龙江', '湖南', '吉林', '江苏', '江西', '辽宁', '内蒙古', '宁夏', '青海', '山西', '陕西', '四川', '台湾', '西藏', '新疆', '云南', '浙江'
];


//-------------------------------------------------------读取当前全国详细数据----------------------------------------------------------------
var allProvince;
$.ajax({

        url: "../resource/province.json", //json文件位置，文件名

        type: "GET", //请求方式为get

        dataType: "json", //返回数据格式为json

        async: false,

        success: function(data) { //请求成功完成后要执行的方法 
            //给info赋值给定义好的变量
            allProvince = data;
            //console.log(dataArray);
        }
    })
    //--------------------------------------------------------------------------------------------------------------------------------------------

function Data(name, value) {

    this.name = name;
    this.value = value;
}

function check(name) {
    switch (name) {
        case "恩施州":
            return "恩施土家族苗族自治州";
            break;
        case "凉山州":
            return "凉山彝族自治州";
            break;
        case "甘孜州":
            return "甘孜藏族自治州";
            break;
        case "阿坝州":
            return "阿坝藏族羌族自治州";
            break;
            //"省十里丰监狱" 
        case "湘西自治州":
            return "湘西土家族苗族自治州";
            break;
        case "大兴安岭":
            return "大兴安岭地区";
            break;
        case "彭水县":
            return "彭水苗族土家族自治区";
            break;
        case "武陵区":
            return "武陵县";
            break;
        case "秀山县":
            return "秀山土家族苗族自治县";
            break;
        case "酉阳县":
            return "酉阳土家族苗族自治县";
            break;
        case "石柱县":
            return "石柱土家族自治县";
            break;
        case "黔南州":
            return "黔南布依族苗族自治州";
            break;
        case "黔东南州":
            return "黔东南苗族侗族自治州";
            break;
        case "黔西南州":
            return "黔西南布依族苗族自治州";
            break;
        case "阿拉善盟":
            return "阿拉善盟";
            break;
        case "锡林郭勒盟":
            return "锡林郭勒盟";
            break;
        case "兴安盟":
            return "兴安盟";
            break;
        case "四平市":
            return "四平市";
            break;
        case "吉林市":
            return "吉林市";
            break;
        case "延边":
            return "延边朝鲜族自治州";
            break;
        case "保亭":
            return "保亭黎族苗族自治县";
            break;
        case "琼中":
            return "琼中黎族苗族自治县";
            break;
        case "乐东":
            return "乐东黎族自治县";
            break;
        case "白沙":
            return "白沙黎族自治县";
            break;
        case "临高":
            return "临高县";
            break;
        case "澄迈":
            return "澄迈县";
            break;
        case "陵水":
            return "陵水黎族自治县";
            break;
        case "屯昌":
            return "屯昌县";
            break;
        case "定安":
            return "定安县";
            break;
        case "昌吉州":
            return "昌吉回族自治州";
            break;
        case "吐鲁番市":
            return "吐鲁番市";
            break;
        case "伊犁州":
            return "伊犁哈萨克自治州";
            break;
        case "巴州":
            return "巴音郭楞蒙古自治州";
            break;
        case "德宏州":
            return "德宏傣族景颇族自治州";
            break;
        case "西双版纳":
            return "西双版纳傣族自治州";
            break;
        case "大理州":
            return "大理白族自治州";
            break;
        case "红河州":
            return "红河哈尼族彝族自治州";
            break;
        case "楚雄州":
            return "楚雄彝族自治州";
            break;
        case "文山州":
            return "文山壮族苗族自治州";
            break;
        case "迪庆州":
            return "迪庆藏族自治州";
            break;
        case "恕江州":
            return "恕江傈僳族自治州";
            break;
        case "甘南":
            return "甘南藏族自治州";
            break;
        case "临夏":
            return "临夏回族自治州";
            break;
        case "海北州":
            return "海北藏族自治州";
            break;
    }
    if (name.lastIndexOf("区") >= 0)
        return name;
    return name + "市";
}

function showPmap(pNameEN) {

    /*
    console.log(pNameEN);
    var pth = "../incubator-echarts-master/map/js/province/" + pNameEN + ".js";
    console.log(pth);
    document.getElementById('mapsrc').src = pth;
    console.log(document.getElementById('mapsrc').src);
    //不知道是何原因，修改script的src并起不到作用，猜测是需要载入
    //实现不了就无奈把每个省的js都在html里调一遍
    */

    var pNameCN;
    for (var i = 0; i < pListEN.length; i++) {
        if (pListEN[i] == pNameEN) {
            pNameCN = pListCN[i];
            break;
        }
    }
    console.log(pNameCN);

    var curProvince;
    for (var i = 0; i < allProvince.length; i++) {
        if (allProvince[i].provinceShortName == pNameCN) {
            curProvince = allProvince[i];
            break;
        }
    }
    console.log(curProvince); //当前省


    //------------------------------------------------------------网络获取该省所有历史数据----------------------------------------------------------
    var dataArray;
    $.ajax({

        url: curProvince.statisticsData, //json文件位置，文件名

        type: "GET", //请求方式为get

        dataType: "json", //返回数据格式为json

        async: false,

        success: function(data) { //请求成功完成后要执行的方法 
            //给info赋值给定义好的变量
            dataArray = data;
            //console.log(dataArray);
        }

    })
    console.log(dataArray);
    //------------------------------------------------------------------------------------------------------------------------------------------------

    var cityConfirmed = [];
    var cityCured = [];
    var cityDead = [];
    var cities = curProvince.cities;
    for (var i = 0; i < cities.length; i++) {
        cityConfirmed.push(new Data(cities[i].cityName, cities[i].currentConfirmedCount));
        cityCured.push(new Data(cities[i].cityName, cities[i].curedCount));
        cityDead.push(new Data(cities[i].cityName, cities[i].deadCount));
    }

    for (var i = 0; i < cityDead.length; i++) {
        var name = check(cityDead[i].name);
        cityDead[i].name = name;
        cityCured[i].name = name;
        cityConfirmed[i].name = name;

    }
    var maxn = 0,
        minn = 1000000000000;
    for (var i = 0; i < cityDead.length; i++) {
        var sum = cityDead[i].value + cityConfirmed[i].value + cityCured[i].value;
        if (maxn < sum) maxn = sum;
        if (minn > sum) minn = sum;
    }

    if (minn == maxn) {
        minn = 0;
        maxn++;
    }
    if (minn == 1000000000000) {
        minn = maxn = curProvince.confirmedCount;
    }
    if (pNameCN == '湖北') maxn = 5000;
    var showName = true;
    if (pNameCN == '海南')
        showName = false;
    var chart = echarts.init(document.getElementById('pmap'));
    chart.setOption({
        title: {
            text: pNameCN,
            left: 'center'
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
            min: minn,
            max: maxn,
            left: 'left',
            top: 'bottom',
            text: ['高', '低'], // 文本，默认为数值文本
            calculable: true,
            color: ['rgb(71,6,6)', 'rgb(101,6,6)', 'red', 'rgb(230,173,173)', 'rgb(248, 196, 196)'],
            show: showName
        },
        series: [{
                name: '确诊',
                type: 'map',
                map: pNameCN, //这里得跟js省份文件名一样得改
                label: {
                    //color: 'blue',
                    //fontSize: 2,
                    normal: {
                        show: showName
                    },
                    emphasis: {
                        show: true
                    },
                },
                data: cityConfirmed
            },
            {
                name: '死亡',
                type: 'map',
                map: pNameCN, //这里得跟js省份文件名一样得改
                label: {
                    //color: 'blue',
                    //fontSize: 2,
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: true
                    },
                },
                data: cityDead
            },
            {
                name: '治愈',
                type: 'map',
                map: pNameCN, //这里得跟js省份文件名一样得改
                label: {
                    //color: 'blue',
                    //fontSize: 2,
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: true
                    },
                },
                data: cityCured
            }
        ]
    });

    var ppie = echarts.init(document.getElementById('ppie'));
    ppie.setOption({
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [{
            type: 'pie',
            name: '比例',
            data: [
                { name: '现存确诊', value: curProvince.currentConfirmedCount },
                { name: '累计死亡', value: curProvince.deadCount },
                { name: '累计治愈', value: curProvince.curedCount }
            ]
        }]
    });


    dataArray = dataArray.data;
    var dates = [];
    var data1 = []; //现存确诊
    var data11 = []; //累计治愈
    var data2 = []; //新增确诊
    var data3 = []; //新增治愈
    var data4 = []; //新增死亡
    for (var i = 0; i < dataArray.length; i++) {
        dates.push(dataArray[i].dateId);
        data1.push(dataArray[i].currentConfirmedCount);
        data11.push(dataArray[i].curedCount);
        data2.push(dataArray[i].currentConfirmedIncr);
        data3.push(dataArray[i].curedIncr);
        data4.push(dataArray[i].deadIncr);
    }



    var pline1 = echarts.init(document.getElementById('pline1'));
    pline1.setOption({
        title: {
            //text: ,
            subtext: '现存确诊和累计治愈',

        },
        legend: {
            data: ['现存确诊', '累计治愈']
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: dates
        },
        yAxis: [{
            type: 'value'
        }],
        series: [{
                name: '现存确诊',
                type: 'line',
                data: data1
            },
            {
                name: '累计治愈',
                type: 'line',
                data: data11
            },
        ]
    })



    var pline2 = echarts.init(document.getElementById('pline2'));
    pline2.setOption({
        title: {
            //text: ,
            subtext: '新增确诊',

        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: dates
        },
        yAxis: [{
            type: 'value'
        }],
        series: [{
            name: '新增确诊',
            type: 'line',
            data: data2
        }]
    })




    var pline3 = echarts.init(document.getElementById('pline3'));
    pline3.setOption({
        title: {
            //text: ,
            subtext: '新增治愈',

        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: dates
        },
        yAxis: [{
            type: 'value'
        }],
        series: [{
            name: '新增治愈',
            type: 'line',
            data: data3
        }]
    })




    var pline4 = echarts.init(document.getElementById('pline4'));
    pline4.setOption({
        title: {
            //text: ,
            subtext: '新增死亡',

        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: dates
        },
        yAxis: [{
            type: 'value'
        }],
        series: [{
            name: '新增死亡',
            type: 'line',
            data: data4
        }]
    })
}