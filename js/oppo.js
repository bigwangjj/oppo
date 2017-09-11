if(!window.jQuery){
    throw new Error('jd_index.js依赖于jQuery！');
}
jQuery.fn.carousel = function(){
    var interval = 3000;    
    var duration = 1000;     
    var $imgList = this.children('img'); 
    var $liList = this.find('li'); 
    var cur = 0;  
    var next = 1; 
     
    setInterval(function(){
        lunHuan()
    }, interval);

    //为每个li添加事件监听，单击后直接显示指定的广告
    $liList.click(function(){
        var i = $liList.index(this);//点击的li在所有li中的序号
        next = i;
        lunHuan();
    });

    //进行广告轮换
    function lunHuan(){
        $liList.eq(next).addClass('active').siblings('.active').removeClass('active');
        $imgList.eq(cur).animate({left:'-100%'},duration,function(){
            $(this).removeClass('active');
        })
         $imgList.eq(next).addClass('active').css('left','100%').animate({left: '0'},duration);
       cur = next;  
        next++;
        if(next>=$imgList.length){
            next = 0;
        }
    }
};
var toTop=
    document.getElementById("scroll");
window.onscroll=function(){
    if(document.body.scrollTop>=200)
        toTop.style.display="block";
    else
        toTop.style.display="";
};

























