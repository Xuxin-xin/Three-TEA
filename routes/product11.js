const express = require("express"),
    router = express.Router(),
    pool = require("../pool.js");

//商品列表
router.get("/list", (req, res) => {
    let obj = req.query;
    if (!obj.pno) obj.pno = 1;
    if (!obj.count) obj.count = 1;
    obj.pno = parseInt(obj.pno);
    obj.count = parseInt(obj.count);
    let start = (obj.pno - 1) * obj.count;
    let sql = `SELECT tea_laptop.lid,tea_laptop.title,tea_laptop.price,tea_laptop.sold_count,tea_laptop.is_onsale,tea_laptop_pic.md as pic FROM tea_laptop INNER JOIN (select laptop_id, max(md) md from tea_laptop_pic GROUP BY laptop_id) tea_laptop_pic LIMIT ?,?;
    select * from tea_laptop;`
    pool.query(sql, [start, obj.count], (err, result) => {
        let recordCount = result[1].length;
        let pageSize = obj.count;
        let pno = obj.pno;
        let pageCount = parseInt(recordCount / pageSize) + 1;
        if (err) throw err;
        res.send({
            code: 200,
            msg: "list ok",
            recordCount: recordCount,
            pageSize: pageSize,
            pno: pno,
            pageCount: pageCount,
            data: result[0]
        })
    })
})
//商品详情
router.get("/detail", (req, res) => {
    let obj = req.query;
    if (!obj.lid) {
        res.send({
            code: 401,
            msg: "lid required"
        });
        return;
    };
    let sql = `SELECT * FROM xz_laptop WHERE lid=?;
               SELECT pid,laptop_id,sm,md,lg FROM xz_laptop_pic WHERE laptop_id=?;
               SELECT fid,fname FROM xz_laptop_family INNER JOIN xz_laptop ON xz_laptop_family.fid = xz_laptop.family_id WHERE xz_laptop.lid = ?;
               SELECT lid,spec FROM xz_laptop WHERE family_id IN (SELECT family_id FROM xz_laptop WHERE lid = ?); `;
    pool.query(sql, [obj.lid, obj.lid, obj.lid, obj.lid], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            result[2][0].laptopList = result[3];
            res.send({
                code: 200,
                msg: "detail ok",
                details: result[0][0],
                picList: result[1],
                family: result[2][0]
            })
        } else {
            res.send({
                code: 301,
                msg: "can not found"
            })
        }

    })
})
//删除商品
router.get("/delete", (req, res) => {
    let obj = req.query;
    if (!obj.lid) {
        res.send({
            code: 401,
            msg: "delete err"
        })
    }
    pool.query("delete from xz_laptop where lid=?", [obj.lid], (err, result) => {
        if (err) throw err;
        console.log(result);
        if (result.affectedRows > 0) {
            res.send({
                code: 200,
                msg: "delete suc"
            });
        } else {
            res.send({
                code: 301,
                msg: "delete err"
            });
        }
    })
})
//商品增加
router.post("/add", (req, res) => {
    let obj = req.query;
    let temp = 400;
    for (let key in obj) {
        temp++
        if (!obj[key]) {
            res.send({
                code: temp,
                msg: "add err"
            });
            return;
        }
    }
    pool.query("insert into xz_laptop (family_id,title,subtitle,price,promise,spec,lname,os,memory,resolution,video_card,cpu,video_memory,category,disk,details,shelf_time,sold_count,is_onsale) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [obj.family_id, obj.title, obj.subtitle, obj.price, obj.promise, obj.spec, obj.lname, obj.os, obj.memory, obj.resollution, obj.video_card, obj.cpu, obj.video_memory, obj.category, obj.disk, obj.details, obj.shelf_time, obj.sold_count, obj.is_onsale, ], (err, result) => {
        if (err) throw err;
        if (affectedRows > 0) {
            res.send({
                code: 200,
                msg: "add suc"
            })
        } else {
            res.send({
                code: 301,
                msg: "add err"
            })
        }

    })
})

module.exports = router;