if(!window.jQuery){
    throw new Error('jd_index.js������jQuery��');
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

    //Ϊÿ��li����¼�������������ֱ����ʾָ���Ĺ��
    $liList.click(function(){
        var i = $liList.index(this);//�����li������li�е����
        next = i;
        lunHuan();
    });

    //���й���ֻ�
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

























