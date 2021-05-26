const express=require('express');
const pool=require('../pool.js');
var router=express.Router();
//1.添加购物车
router.get('/add',(req,res)=>{
    var obj=req.query;
    var $lid=obj.lid;
    var $buyCount=obj.buyCount;
    if(!obj.lid){
        res.send({code:401,msg:'lid required'});
        return;
    }
    if(!obj.buyCount){
        res.send({code:402,msg:'buyCount required'});
        return;
    }
    if(!req.session.loginUid){
        req.session.pageToJump='cart.html';
        req.session.toBuyLid=obj.lid;
        req.session.toBuyCount=obj.buyCount;
        res.send({code:300,msg:'login required'});
        return;
    }
    var sql=`SELECT iid FROM tea_shopping_cart WHERE user_id=? AND product_id=?`;
    pool.query(sql,[req.session.loginUid,$lid],(err,result)=>{
        if(err) throw err;
        var sql2;
        if(result.length>0){
            sql2=`UPDATE tea_shopping_cart SET count=count+1 WHERE user_id=${req.session.loginUid} AND product_id=${$lid}`;

        }else{
            sql2=`INSERT INTO tea_shopping_cart VALUES(NULL, ${req.session.loginUid}, ${$lid}, ${$buyCount}, false)`;
        }
        pool.query(sql2,(err,result2)=>{
            if(err) throw err;
            if(result2.affectedRows>0){
                res.send({code:200,msg:'add suc'});
            }else{
                res.send({code:500,msg:'add err'});
            }
        });
    });
});


//2.购物车列表
router.get('/list',(req,res)=>{
    //获取数据
    var obj=req.query;
    var $pno=obj.pno;
    var $pageSize=obj.pageSize; 
    //验证页码
    if(!$pno) 
      $pno=1;
    else
      $pno=parseInt($pno);
    //验证每页大小
    if(!$pageSize)
      $pageSize=3;
    else
      $pageSize=parseInt($pageSize);
    var output={
      recordCount:0,
      pageSize:$pageSize,
      pageCount:0,
      pno:$pno, 
      data:[]
    };
    var sql1='SELECT COUNT(iid) AS a FROM tea_shopping_cart';  
    //计算开始查询的值
    var start=($pno-1)*output.pageSize;  
    var count=output.pageSize;  
    var sql2 = 'SELECT iid,lid,title,price,count FROM tea_product l, tea_shopping_cart s WHERE l.lid=s.product_id LIMIT ?,?';
    //执行SQL语句，响应查询到的数据
    pool.query(sql1,(err,result)=>{
      if(err) throw err;
      console.log(result);
      output.recordCount=result[0].a;
      //计算总页数
      output.pageCount=Math.ceil(output.recordCount/output.pageSize);
  
    });
  
    pool.query(sql2,[start,count],(err,result)=>{
      if(err) throw err;
      console.log(result);   
      output.data=result;
    //   for(var i=0;i<output.data.length;i++){
    //     var lid=output.data[i].lid;
    //     (function(lid,i){
    //       pool.query('SELECT md FROM tea_pic WHERE tea_id=? LIMIT 0,1',[lid],(err,result)=>{
    //         output.data[i].pic=result[0].md;
    //       });
    //     })(lid,i);
    //   }
      setTimeout(() => {
        res.send(output);
      }, 100);
    });
  });





//3.删除购物车
router.get('/del',(req,res)=>{
    var obj=req.query;
    if(!obj.iid){
        res.send({code:401,msg:'iid required'});
        return;
    }
    if(!req.session.loginUid){
        res.send({code:300,msg:'login required'});
        return;
    }
    pool.query('DELETE FROM tea_shopping_cart WHERE iid=?',[obj.iid],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:200,msg:'delete succ'});
        }else{
            res.send({code:500,msg:'delete err'});
        }
    });
});


module.exports=router;