const express = require('express');
const request = require('request');
const axios = require('axios');
const fs = require('fs');
const app = express();

const url = 'https://3g.dxy.cn/newh5/view/pneumonia';

const getStatisticsService = (data) => {
    let statisticObj = JSON.parse(data.match(/window.getStatisticsService = (.*?)}catch/)[1])
    fs.writeFileSync('../resource/statistic.json', JSON.stringify(statisticObj, null, 2), (err) => {
        console.log('写入成功')
    })
}
const getAreaStat = (data) => {
    const areaObj = JSON.parse(data
        .match(/window.getAreaStat = (.*?)}catch/)[1])
    fs.writeFileSync('../resource/province.json', JSON.stringify(areaObj, null, 2), (err) => {
        console.log('写入成功')
    })
}
axios.request(url).then(({
    data: html
}) => {
    getStatisticsService(html)
    getAreaStat(html);
})

app.listen(3000, () => {
    console.log('app listening port is 3000')
})