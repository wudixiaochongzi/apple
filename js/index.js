/**
 * Created by wc on 2016/4/22.
 */
$(function(){
    //导航平板下拉
    var $navBtn=$('.nav-min-btn');
    var $navMax=$('.nav-max');
    var $header=$('.header');
    var screenH=document.documentElement.clientHeight;
    var flag=true;
    $navBtn.click(function(){
        if (flag){
            $header.css({background:'#000'});
            $navMax.animate({height:screenH-48},400);
            flag=false;
        }else{
            flag=true;
            $navMax.animate({height:0},400,function(){
                $header.css({background:'rgba(0,0,0,0.8)'});
            });
        }
    });

    //footer  list平板下拉
    var $footerBtn=$(".footer-lists h3");
    $footerBtn.click(function(){
        //$(this).next('ul').css({height:'auto'});
        var screenW=document.documentElement.clientWidth;
        if (screenW<=768){
            $(this).next('ul').slideToggle(400);
        }
    });

    //banner
    var $bannerBox=$('.banner-box');
    var $bannerBtn=$('.banner-btn');
    var $bannerBtnL=$bannerBtn.children('.btn-left');
    var $bannerBtnR=$bannerBtn.children('.btn-right');
    var $bannerImg=$('.banner li');
    var $bannerNum=$('.banner-num li');
    var now=0;
    var next=0;
    var flag=true;
    $bannerImg.eq(0).css({left:0});
    var t=setInterval(move,3000);
    function move () {
        if (!flag){return}
        flag=false;
        next++;
        if (next>=$bannerImg.length){
            next=0;
        }
        $bannerImg.eq(now).animate({left:'-100%'},function(){
            flag=true;
        });
        $bannerImg.eq(next).css({left:'100%'}).animate({left:0});
        $bannerNum.eq(now).removeClass('on');
        $bannerNum.eq(next).addClass('on');
        now=next;
    }
    $bannerBtn.hover(
        function(){
            $(this).children('div').animate({opacity:1});
        },
        function(){
            $(this).children('div').animate({opacity:0.7});
        }
    );
    $bannerBox.hover(
        function(){
            $bannerBtn.css('display','block');
            clearInterval(t);
        },
        function(){
            $bannerBtn.css('display','none');
            t=setInterval(move,3000);
        }
    );
    $bannerBtnR.click(function(){
        move();
    });
    $bannerBtnL.click(function(){
        if (!flag){return};
        flag=false;
        next--;
        if (next<0){
            next=$bannerImg.length-1;
        }
        $bannerImg.eq(now).animate({left:'100%'},function(){
            flag=true;
        });
        $bannerImg.eq(next).css({left:'-100%'}).animate({left:0});
        $bannerNum.eq(now).removeClass('on');
        $bannerNum.eq(next).addClass('on');
        now=next;
    });
    $bannerNum.click(function(){
        var index=$(this).index();
        if (now==index||!flag){return}
        flag=false;
        next=index;
        if (index>now){
            $bannerImg.eq(now).animate({left:'-100%'},function(){
                flag=true;
            });
            $bannerImg.eq(next).css({left:'100%'});
        }
        if (index<now){
            $bannerImg.eq(now).animate({left:'100%'},function(){
                flag=true;
            });
            $bannerImg.eq(next).css({left:'-100%'});
        }
        $bannerImg.eq(next).animate({left:0});
        $bannerNum.eq(now).removeClass('on');
        $bannerNum.eq(next).addClass('on');
        now=next;
    })
});