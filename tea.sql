SET NAMES UTF8;
DROP DATABASE IF EXISTS tea;
CREATE DATABASE tea CHARSET=UTF8;
USE tea;



/**用户信息**/
CREATE TABLE tea_user(
  uid INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(32),
  upwd VARCHAR(32),
  email VARCHAR(64),
  phone VARCHAR(16),
  user_name VARCHAR(32),      #用户名，如王小明
  gender INT                  #性别  0-女  1-男
);

/**用户收货地址信息**/
CREATE TABLE tea_receiver_address(
  aid INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,                #用户编号
  receiver VARCHAR(16),       #接收人姓名
  province VARCHAR(16),       #省
  city VARCHAR(16),           #市
  county VARCHAR(16),         #县
  address VARCHAR(128),       #详细地址
  cellphone VARCHAR(16),      #手机
  fixedphone VARCHAR(16),     #固定电话
  postcode CHAR(6),           #邮编
  tag VARCHAR(16),            #标签名

  is_default BOOLEAN          #是否为当前用户的默认收货地址
);

/**用户购物车表**/
CREATE TABLE tea_shopping_cart(
  iid INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,      #用户编号
  product_id INT,   #商品编号
  count INT,        #购买数量
  is_checked BOOLEAN #是否已勾选，确定购买
);

/**用户订单表**/
CREATE TABLE tea_order(
  aid INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  address_id INT,
  status INT,             #订单状态  1-等待付款  2-等待发货  3-运输中  4-已签收  5-已取消
  order_time BIGINT,      #下单时间
  pay_time BIGINT,        #付款时间
  deliver_time BIGINT,    #发货时间
  received_time BIGINT    #签收时间
)AUTO_INCREMENT=10000000;

/**用户订单详情表**/
CREATE TABLE tea_order_detail(
  did INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT,           #订单编号
  product_id INT,         #产品编号
  count INT               #购买数量
);



/**商品类别表**/
CREATE TABLE tea_family(
  fid INT PRIMARY KEY AUTO_INCREMENT,
  fname VARCHAR(32)
);

/**商品表**/
CREATE TABLE tea_product(
  lid INT PRIMARY KEY AUTO_INCREMENT,
  family_id INT,              #所属编号
  title VARCHAR(128),         #标题
  price DECIMAL(10,2),        #价格
  promise VARCHAR(64),        #服务承诺
  type VARCHAR(64),           #类别
  detail  VARCHAR(64),        #详情
   texture    VARCHAR(64),                      #口感
  place VARCHAR(32),          #产地
  level VARCHAR(32),             #级别
  weight VARCHAR(32),         #重量
  exp VARCHAR(22),     #保质期
  keep VARCHAR(32),     #储存方式
  shelf_time BIGINT,          #上架时间
  sold_count INT,             #已售出的数量
  is_onsale BOOLEAN           #是否促销中
);

/**商品详情图表**/
CREATE TABLE tea_pic(
  pid INT PRIMARY KEY AUTO_INCREMENT,
  tea_id INT,              #茶叶编号
  sm VARCHAR(128),            #小图片路径
  md VARCHAR(128),            #中图片路径
  lg VARCHAR(128)             #大图片路径
);



/****首页轮播广告商品****/
CREATE TABLE tea_index_carousel(
  cid INT PRIMARY KEY AUTO_INCREMENT,  #编号
  img VARCHAR(128),        #图片
  title VARCHAR(64),        #标题
  href VARCHAR(128)         #路径
);

/****首页商品****/
CREATE TABLE tea_index_product(
  pid INT PRIMARY KEY AUTO_INCREMENT,  #编号
  title VARCHAR(64),          #名称
  details VARCHAR(128),       #详情
  pic VARCHAR(128),           #图片
  price DECIMAL(10,2),         #价格
  href VARCHAR(128),           #路径
  seq_recommended TINYINT,     #产品推荐
  seq_new_arrival TINYINT,     #新品上架
  seq_top_sale TINYINT          #热销产品
); 

















INSERT INTO tea_product VALUES
(1,1,'祁门红茶',888,'七天内包邮退货','红茶','简称祁红，是中国历史名茶，著名红茶精品......','香高、味醇','安徽省祁门县','一级','500g','3年','干燥储存','20210405',5655,true),
(2,1,'金骏眉',789,'七天内包邮退货','红茶','属于红茶中正山小种分支......','入口干爽','福建省武夷山市','二级','500g','3年','避免阳光直射','20210406',5545,true),
(3,1,'大吉岭红茶',965,'七天内包邮退货','红茶','茶叶较大，拥有高昂的身价......','芬芳高雅、带有葡萄香','印度西门加拉省北部','特级','500g','3年','干燥储存','20200305',69555,true),
(4,1,'红碎茶',965,'七天内包邮退货','红茶','是一种碎片或颗粒茶叶......','滋味醇厚','云南省','一级','500g','3年','干燥储存','201601205',6255,true),
(5,2,'碧螺春',905,'七天内包邮退货','绿茶','干茶条索紧结，白毫显露......','鲜爽生津','江苏省苏州市','一级','500g','3年','干燥储存','200601205',3255,true),
(6,2,'西湖龙井',1666,'七天内包邮退货','绿茶','中国第一名茶，形光扁平直......','味甘色纯','浙江省杭州市','特级','500g','3年','干燥储存','19991205',19255,true),
(7,2,'六安瓜片',686,'七天内包邮退货','绿茶','是唯一无芽无梗的茶叶......','茶味浓而不苦','安徽省六安市','二级','500g','3年','干燥储存','20011205',1555,true),
(8,3,'茉莉花茶',266,'七天内包邮退货','花茶','茶香和茉莉花香交互融合......','滋味浓厚鲜爽','福建省福州市','三级','500g','3年','干燥储存','20211205',2165,false),
(9,3,'玉兰花茶',166,'七天内包邮退货','花茶','能祛风通窍，治头痛......','滋味回甜','江苏省苏州市','三级','500g','3年','干燥储存','20211205',155,false),
(10,3,'金银花茶',686,'七天内包邮退货','花茶','具有清热解毒梳利咽喉......','味甘性寒','山东省临沂市','一级','500g','3年','干燥储存','20011205',697,true),
(11,4,'白毫银针',2878,'七天内包邮退货','白茶','鲜叶原料全部是茶芽，有茶中美女，茶王美称......','滋味浓厚鲜爽','福建省','特级','500g','3年','干燥储存','19981205',155,true),
(12,4,'贡眉',266,'七天内包邮退货','白茶','形状芽叶连枝，叶态紧卷如眉......','滋味浓厚鲜爽','福建省','一级','500g','3年','干燥储存','20021005',6155,false);




INSERT INTO tea_family VALUES
(1,'红茶'),
(2,'绿茶'),
(3,'花茶'),
(4,'白茶');


INSERT INTO tea_user VALUES
(1,'Amy',1234567,'amy@qq.com',13003771824,'艾米',0),
(2,'Jhon',1234568,'Jhon@qq.com',13043771824,'约翰',1),
(3,'apple',1234569,'apple@qq.com',1875741437335,'苹果',0),
(4,'lucy',1234560,'lucy@qq.com',13116603642,'露西',0),
(5,'queen',12345670,'queen@qq.com',13065234824,'女王',0),
(6,'king',12364078,'king@qq.com',15873765579,'国王',1),
(7,'Jack',123654987,'Jack@qq.com',13106295628,'杰克',1),
(8,'Alice',1234567890,'Alice@qq.com',13106285798,'爱丽丝',0);



INSERT INTO tea_pic VALUES
(NULL, 1, 'images/sm/tu1.png','images/md/tu1.png','images/lg/tu1.png'),
(NULL, 1, 'images/sm/tu1.png','images/md/tu1.png','images/lg/tu1.png'),
(NULL, 2, 'images/sm/tu2.png','images/md/tu2.png','images/lg/tu2.png'),
(NULL, 2, 'images/sm/tu2.png','images/md/tu2.png','images/lg/tu2.png'),
(NULL, 3, 'images/sm/tu3.png','images/md/tu3.png','images/lg/tu3.png'),
(NULL, 3, 'images/sm/tu3.png','images/md/tu3.png','images/lg/tu3.png'),
(NULL, 3, 'images/sm/tu3.png','images/md/tu3.png','images/lg/tu3.png'),
(NULL, 4, 'images/sm/tu4.png','images/md/tu4.png','images/lg/tu4.png'),
(NULL, 4, 'images/sm/tu4.png','images/md/tu4.png','images/lg/tu4.png'),
(NULL, 5, 'images/sm/tu5.png','images/md/tu5.png','images/lg/tu5.png');



INSERT INTO tea_index_product VALUES
(NULL, '红茶', '祁门红茶', 'images/black1.jpg', 888, 'product_detail.html?lid=1', 1,1,1),
(NULL, '绿茶', '西湖龙井', 'images/green1.jpg', 1666, 'product_detail.html?lid=6', 2,2,2),
(NULL, '花茶', '金银花茶', 'images/flower1.jpg', 686, 'product_detail.html?lid=10', 3,3,3),
(NULL, '白茶', '贡眉', 'images/white1.jpg', 266, 'product_detail.html?lid=12', 4,4,4);






INSERT INTO tea_index_carousel VALUES
(NULL, 'images/banner1.png','轮播广告商品1','product_details.html?lid=1'),
(NULL, 'images/banner2.png','轮播广告商品2','product_details.html?lid=2'),
(NULL, 'images/banner3.png','轮播广告商品3','product_details.html?lid=3'),
(NULL, 'images/banner4.png','轮播广告商品4','product_details.html?lid=4');





























