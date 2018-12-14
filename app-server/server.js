
const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const cors = require('cors')
const moment = require("moment")
const conn = require("./mysql.js")



// 注册了一个中间件, 用于解析用户提交的表单数据
app.use(bodyParser.urlencoded({ extended: false }))

// 开启CORS
app.use(cors())

// //注册一个中间件 解析post请求的数据提交
// app.use(bodyParser.urlencoded({ extended: false }))

//测试一下 给个路由
app.get("/", (req, res) => {
    // console.log(req.query)
    res.send("ok")
})
//查询
app.get("/getHero/:id", (req, res) => {
    console.log(req.params.id)
    conn.query('select * from heros where id =' + req.params.id, (err, result) => {
        if (err) return res.status(500).send({ status: 500, data: null, msg: err.message })
        res.send({ status: 200, data: result[0] || null, msg: "获取数据成功" })
    })
})
//查询
app.get("/getAllHero", (req, res) => {
    console.log(req.query)
    conn.query('select * from heros ', (err, result) => {
        if (err) return res.status(500).send({ status: 500, data: null, msg: err.message })
        res.send({ status: 200, data: result, msg: "数据查询成功" })
    })
})
//添加英雄
app.post("/addHero", (req, res) => {
    console.log(req.body)
    let heroInfo = req.body
    heroInfo.ctime = moment().format("YYYY-MM-DD HH-mm-ss")
    conn.query('insert into heros set ?', heroInfo, (err, result) => {
        if (err) return res.status(500).send({ status: 500, data: null, msg: err.message })
        res.send({ status: 200, data: result, mag: "添加英雄成功" })
    })
})
app.post("/updateHero/:id", (req, res) => {
    console.log(req.params.id)
    console.log(req.body)
    conn.query("update heros set ?where id=" + req.params.id, req.body, (err, result) => {
        if (err) return res.status(500).send({ status: 500, data: null, msg: err.message })
        res.send({ status: 200, data: null, msg: "修改英雄成功" })
    })
})
app.get("/deleteHero/:id", (req, res) => {
    console.log(req.params.id)
    console.log(req.body)
    conn.query("update heros set isdel=1 where id" + req.params.id, (err, result) => {
        if (err) return res.status(500).send({ status: 500, data: null, msg: '服务器内部错误!修改失败!' })
        res.send({ status: 200, data: null, msg: '英雄删除成功!' })
    })
})
//开启服务器
app.listen(5001, () => {
    console.log("server running at:http://127.0.0.1:5001")
})