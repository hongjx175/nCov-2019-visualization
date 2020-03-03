var pListEN = ['shandong', 'hubei', 'beijing', 'shanghai', 'tianjin', 'chongqing', 'xianggang', 'aomen', 'anhui', 'fujian', 'gansu',
    'guangdong', 'guangxi', 'guizhou', 'hainan', 'hebei', 'henan', 'heilongjiang', 'hunan', 'jilin', 'jiangsu', 'jiangxi', 'liaoning',
    'neimenggu', 'ningxia', 'qinghai', 'shanxi', 'shanxi1', 'sichuan', 'taiwan', 'xizang', 'xinjiang', 'yunnan', 'zhejiang'
];
var pListCN = ['山东', '湖北', '北京', '上海', '天津', '重庆', '香港', '澳门', '安徽', '福建', '甘肃', '广东', '广西', '贵州', '海南', '河北',
    '河南', '黑龙江', '湖南', '吉林', '江苏', '江西', '辽宁', '内蒙古', '宁夏', '青海', '山西', '陕西', '四川', '台湾', '西藏', '新疆', '云南', '浙江'
];

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
    document.getElementById('pName').innerHTML = pNameCN;

    var chart = echarts.init(document.getElementById('pmap'));
    chart.setOption({
        series: [{
            type: 'map',
            map: pNameCN //这里得跟js省份文件名一样得改
        }]
    });

}