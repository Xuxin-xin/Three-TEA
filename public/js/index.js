

//下拉菜单
$(function () {
    $('.nav>li').hover(function () {
        $(this).find('.sub').stop().slideDown(200);
        $(this).find(".ico").removeClass("icon-angle-right").addClass("icon-angle-down");
        $(this).siblings().find(".ico").removeClass("icon-angle-down").addClass("icon-angle-right");
        $(this).siblings().find('.sub').stop().slideUp(200);
    }, function () {
        $(this).find('.sub').stop().slideUp(200);
        $(this).find(".ico").removeClass("icon-angle-down").addClass("icon-angle-right");
    })
});


//顶部菜单显示
$(function () {
    $(window).scroll(function () {
        var top_num = $(document).scrollTop();
        if (top_num >= 150) {
            $("#fixed_header").addClass("fixed");
            $("#fixed_header").css("backgroundColor", "rgba(142,104,54,0.95)");
            $(".header-r .tit a").css("color", "#eee");
            $(".return").css("display", "block");
            $(".header-r .nav .sub ul").css("backgroundColor", "rgba(163, 123, 70, 0.9)");
            $(".header-r .nav .sub a").css("color", "#eee");
        } else {
            $("#fixed_header").removeClass("fixed");
            $("#fixed_header").css("backgroundColor", "#fff");
            $(".return").css("display", "none");
            $(".header-r .tit a").css("color", "#000");
            $(".header-r .nav .sub ul").css("backgroundColor", "#fff");
            $(".header-r .nav .sub a").css("color", "#000");
        }
    })
    $(".return").click(function () {
        $("html,body").animate({ scrollTop: "0px" }, 300);
    })
})


// 轮播开始
$(function () {

    $('#slide').append($("#slide>li").first().clone());
    var time = 0;

    //前一张图片
    $("#next").click(function () {
        time++;
        scroll_x();
    })

    //后一张图片
    $("#prev").click(function () {
        time--;
        if (time < 0) {
            time = 2;
            $('#slide').stop().css("left", -3 * 1200);
            $('#slide').animate({ left: time * (-1200) + "px" }, 2000)
        } else {
            scroll_x();
        }
        change(time);
    })

    //自动轮播
    var auto_play = setInterval(function () {
        time++;
        scroll_x();
    }, 2000);
    $('#roll').hover(function () {
        clearInterval(auto_play);
    }, function () {
        auto_play = setInterval(function () { time++ , scroll_x(); }, 2000);
    });


    //点击小圆点变换图片
    $("#point>li").click(function () {
        var i = $(this).index();
        change(i);
        $("#slide").stop().animate({ left: i * (-1200) + "px" }, 2000);
    });

    function scroll_x() {
        $('#slide').stop().animate({ left: time * (-1200) + "px" }, 1000, function () {
            if (time >= 3) {
                time = 0;
                $("#slide").css("left", 0);
            }
        });
        change(time);
    }

    function change(time) {
        var k = time;
        if (k == 3) { k = 0; }
        $("#point li").eq(k).addClass('active');
        $("#point li").eq(k).siblings().removeClass('active');
    }
})
// 轮播结束

//   内容左开始
function add() {
    var title = $('.b_left>ul>li:first');
    $('.b_left>ul').append(title.clone());
    $('.b_left>ul>li:first').slideUp(1000, function () {
        $('.b_left>ul>li:first').remove();
    })
}
$(function () {
    var clock = setInterval(function () {
        add();
    }, 2000);

    $('.b_left').mouseover(function () {
        clearInterval(clock);
    })

    $('.b_left').mouseleave(function () {
        var clock = setInterval(function () {
            add();
        }, 2000);
    })
})
//   内容左结束

// 内容右登陆开始
$(function () {
    $("#right_head li").each(function () {
        $(this).click(function () {
            $(".bd ul").eq($(this).index()).show(500);
            $(".bd ul").eq($(this).index()).siblings().hide(500);
            $(this).css("color", "red");
            $(this).css("backgroundColor", "#eee");
            $(this).siblings().css("color", "black");
            $(this).siblings().css("backgroundColor", "#fff");
        })
    })
})
// 内容右登陆结束


//表单验证开始
function check_input() {
    var userphone = $("#phone").val();
    var reg = /^1(3|4|5|6|7|8|9)\d{9}$/;
    if (reg.test(userphone)) {
        $("#messege").html(" ");
        return true;
    } else {
        $("#messege").html("手机号错误");
        return false;
    }
}
$(function () {
    $("#getcode_button").click(function () {
        if (check_input()) {
            $.ajax({
                type: "post",  //用post方式传输
                url: "getcode.txt", //目标地址
                data: "id=2",
                dataType: "text",
                success: function (data) {
                    if (data == 1) {
                        $("#messege").html(data)
                    }
                },
                error: function () {
                    $("#messege").html("54672")
                }

            });
        } else {
            $("#messege").html("手机号格式错误,获取失败");
        }
    });

    $("#form2").submit(function () {
        var userphone = $("#phone").val();
        var reg = /^1(3|4|5|6|7|8|9)\d{9}$/;
        if (reg.test(userphone)) {
            $("#messege").html(" ");
            return true;
        } else {
            $("#messege").html("手机号错误");
            return false;
        }
    })
});


//表单验证结束



//子页面1开始
//左部导航开始
$(function () {
    $(".nav_title").click(function () {
        if ($(this).hasClass("opennav")) {
            $(this).css("backgroundColor", "#324e67");
            $(this).siblings().slideUp(200);
            $(this).find(".nav_right").removeClass("icon-chevron-down").addClass("icon-chevron-right");
            $(this).removeClass("opennav");
            $(this).parent().siblings().find(".nav_title").removeClass("opennav");
        } else {
            $(this).css("backgroundColor", "#7e2625");
            $(this).parent().siblings().find(".nav_title").css("backgroundColor", "#324e67");
            $(this).siblings().slideDown(200);
            $(this).find(".nav_right").removeClass("icon-chevron-right").addClass("icon-chevron-down");
            $(this).parent().siblings().children(".sub-menu").slideUp(200);
            $(this).parent().siblings().find(".nav_right").removeClass("icon-chevron-down").addClass("icon-chevron-right");
            $(this).addClass("opennav");
            $(this).parent().siblings().find(".nav_title").removeClass("opennav");
        }

    })

})
//左部导航结束
//子页面1结束