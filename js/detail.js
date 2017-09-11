//封装selector api 为 $函数简化查询
function $(selector){
  return document.querySelectorAll(
    selector
  );
}
//找到id为preview下h1下的两个直接子元素a
var as=$("#preview>h1>a");
var aBackward=as[0],aForward=as[1];
//找到要移动的ul
var ulList=$("#icon_list")[0];
var LIWIDTH=62;//每个li的宽
var OFFSET=20;//起始left,用作修正left值
//已经左移的li个数，用于控制两个a按钮的启用和禁用
var moved=0;
//获得ul下所有li的个数,用作判断禁用a
var LICOUNT=ulList.children.length;
//为两个a分别绑定单击事件:
aForward.addEventListener("click",
  function(){
    //如果当前a的class中没有disabled
    if(this.className
            .indexOf("disabled")==-1){
      //就修改backward按钮样式为启用
      aBackward.className="backward";
      //左移的li个数+1
      moved++;
      //ul的left永远等于LIWIDTH*moved+OFFSET
      ulList.style.left=
        -LIWIDTH*moved+OFFSET+"px";
      //如果仅剩5个li没有移动时
      if(LICOUNT-moved==5)
        //就修改当前a为禁用
        this.className+=" disabled";
    }
  }
);
aBackward.addEventListener("click",
  function(){
    if(this.className
        .indexOf("disabled")==-1) {
      //启用forward按钮
      aForward.className="forward";
      //左移的li个数-1
      moved--;
      ulList.style.left=
        -LIWIDTH*moved+OFFSET+"px";
      //如果没有左移的li了
      if(moved==0)
        //就禁用当前a按钮
        this.className+=" disabled";
    }
  }
);

var mImg=$("#mImg")[0];
//为ulList绑定鼠标进入事件
ulList.addEventListener("mouseover",
  function(e){
    if(e.target.nodeName=="IMG"){
      //获得当前img的src
      var src=e.target.src;
      //查找src中最后一个.的位置
      var i=src.lastIndexOf(".");
      //设置mImg的src为
      mImg.src=
        src.slice(0,i)+"-m"+src.slice(i);
    }
  }
);
//保存superMask和mask的大小
var SMSIZE=350,MSIZE=175,
    MAX=SMSIZE-MSIZE;//mask最大top和left
//查找id为superMask的div
var smask=$("#superMask")[0];
var mask=$("#mask")[0];
//查找largeDiv
var largeDiv=$("#largeDiv")[0];
//为smask绑定鼠标移入和鼠标移出
smask.addEventListener("mouseover",
  function(){
    mask.style.display="block";
    //获得mImg的src
    var src=mImg.src;
    //查找最后一个.的位置
    var i=src.lastIndexOf(".");
    src=
      src.slice(0,i-1)+"l"+src.slice(i);
    largeDiv.style.cssText=
      "display:block;"
      +"background-image:url("+src+")";
  }
);
smask.addEventListener("mouseout",
  function(){
    mask.style.display="none";
    largeDiv.style.display="none";
  }
)
//为smask添加鼠标移动事件
smask.addEventListener("mousemove",
  function(e){
    //获得鼠标相对于当前元素的坐标
    var x=e.offsetX,y=e.offsetY;
    //计算mask的top和left
    var l=x-MSIZE/2, t=y-MSIZE/2;
    if(l<0) l=0;
    else if(l>MAX) l=MAX;

    if(t<0) t=0;
    else if(t>MAX) t=MAX;

    //设置mask的top和left
    mask.style.cssText=
      "display:block; top:"+t+"px;left:"+l+"px";

    //修改largeDiv的背景图片位置
    largeDiv.style.backgroundPosition=
      -16/7*l+"px "+(-16/7*t)+"px";
  }
)

//找到class为app_jd和service下的a
var lis=$(".app_jd,.service");
//遍历lis
for(var i=0;i<lis.length;i++){
  //为每个li绑定鼠标进入和移出事件:
  lis[i].onmouseover=function(){
    this.lastElementChild
        .style.display="block";
    this.children[1]
        .className="hover";
  };
  lis[i].onmouseout=function(){
    this.lastElementChild
      .style.display="none";
    this.children[1]
      .className="";
  }
}

//为id为category的div绑定鼠标进入和移出事件
$("#category")[0].onmouseover=
  function(){
    this.lastElementChild
      .style.display="block";
  }
$("#category")[0].onmouseout=
  function(){
    this.lastElementChild
      .style.display="none";
  }
//找到id为cate_box下的li
var lis=$("#cate_box>li");
//遍历lis
for(var i=0;i<lis.length;i++){
  //为每个li绑定鼠标进入和移出事件
  lis[i].onmouseover=function(){
    this.lastElementChild
        .style.display="block";
    this.firstElementChild
        .className="hover";
  };
  lis[i].onmouseout=function(){
    this.lastElementChild
        .style.display="none";
    this.firstElementChild
        .className="";
  };
}

//找到id为product_detail下的class为main_tabs下的li
var lis=
  $("#product_detail>.main_tabs>li");

//遍历lis
for(var i=0;i<lis.length;i++){
  //为每个li绑定单击事件
  lis[i].onclick=function(){
    if(this.className!="current"){
      //找到id为product_detail下class为main_tabs下的class为current的li,清除其class
      $("#product_detail>.main_tabs>.current")[0].className="";
      //设置自己的class为current
      this.className="current";
      //找到id为product_detail下的class为show的直接子元素
      var show=
        $("#product_detail>.show")[0];
      if(show!=undefined)
        show.className="";
      //如果当前li不是商品评价
      if(this.firstElementChild
            .innerHTML
            .indexOf('商品评价')
            ==-1){
        //找到a对应的div，设置其class为show
        var a=this.firstElementChild;
        var i=a.href.indexOf("#");
        var id=a.href.slice(i);
        $(id)[0].className="show";
      }
    }
  }
}
//找到id为product_detail下的class为main_tabs下的a
var as=
  $("#product_detail>.main_tabs a");
for(var i=0;i<as.length;i++){
  as[i].onclick=function(e){
    e.preventDefault();
  }
}


