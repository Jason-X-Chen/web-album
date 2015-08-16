// JavaScript Document
var total=17;
var zWin=$(window);	
var render=function(){	
	var padding=2;
	var scrollBarWidth=0;
	var winWidth=zWin.width(); //根据屏幕大小计算图片的宽高
	var picWidth=Math.floor((winWidth-3*padding-scrollBarWidth)/4);  
	var temHtml='';
	for(var i=1;i<=total;i++){
		var imgSrc='images/'+i+'.jpg';//图片路径
		var p=padding;
		if(i%4==1){
			p=0;
		}//生成展示图片的HTML标签,添加CSS3动画效果
		temHtml+='<li data-id="'+i+'"; class="animated bounceIn"; style="width:'+picWidth+'px;height:'+picWidth+'px;padding-top:'+padding+'px;padding-left:'+p+'px;"><canvas id="cvs_'+i+'"></canvas></li>';
		var imageObj = new Image();//使用drawImage API绘制图片
		imageObj.index=i;
		imageObj.onload=function(){
			var cvs=$('#cvs_'+this.index)[0].getContext('2d');
			cvs.width=this.width;
			cvs.height=this.height;
			cvs.drawImage(this,0,0);
		};
		imageObj.src=imgSrc;
	}
	$('#container').html(temHtml);
}
render();
//显示触发的大图
var wImage=$('#large_img');
var domImage=wImage[0];//image标签的dom引用
var loadImg=function(id,callback){
	$('#container').css({height:zWin.height(),'overflow':'hidden'});//不显示图片列表露出区域
	$('#large_container').css({width:zWin.width(),height:zWin.height()}).show();//设置css样式，显示大图div	
	var imgsrc='images/'+id+'.large.jpg';
	var imageObj=new Image();
	imageObj.src=imgsrc;
	imageObj.onload=function(){
		console.log(1);
		var w=this.width;//图片的宽高
		var h=this.height;
		var winWidth=zWin.width();//屏幕的宽高
		var winHeight=zWin.height();
		var realw=w*winHeight/h;
		//竖图的显示宽度，适用于图宽大于屏宽
		var paddingLeft=parseInt((winWidth-realw)/2);
		var realh=h*winWidth/w;
		//竖图的显示高度，适用于图宽大于屏高
		var paddingTop=parseInt((winHeight-realh)/2);
		wImage.css('width','auto').css('height','auto');//reset样式，避免滑动时相互影响
		wImage.css('padding-left','0px').css('padding-top','0px');
		if(h/w>1.2){
			wImage.attr('src',imgsrc).css('height',winHeight).css('padding-left',paddingLeft);
		}else{
			wImage.attr('src',imgsrc).css('width',winWidth).css('padding-top',paddingTop);
		}
		callback&&callback();//未传callback参数就不执行切换动画
	};
	
};
//事件代理为动态生成标签添加事件，点击列表图片显示大图
var cid;//记录当前图片序号
$('#container').delegate('li','tap',function(){
	var _id=cid=$(this).attr('data-id');//自定义属性获取图片
	console.log(_id);
	loadImg(_id);
});
//点击大图图层，关闭当前图层
$('#large_container').tap(function(){
	//$('#container').css({hight:'auto','overflow':'auto'});
	$(this).hide();
});
//向左滑动
$('#large_container').swipeLeft(function(){
	cid++;
	if(cid>total){
		cid=total;
	}else{
		loadImg(cid,function(){
			domImage.addEventListener('webkitAnimationEnd',function(){
				wImage.removeClass('animated bounceInRight');
				domImage.removeEventListener('webkitAnimationEnd');
			},false)
			wImage.addClass('animated bounceInRight');
		});
	}
});
//向右滑动
$('#large_container').swipeRight(function(){
	cid--;
	if(cid<1){
		cid=1;
	}else{
		loadImg(cid,function(){
			domImage.addEventListener('webkitAnimationEnd',function(){
				wImage.removeClass('animated bounceInLeft');
				domImage.removeEventListener('webkitAnimationEnd');
			},false)
			wImage.addClass('animated bounceInLeft');
		});
	}
});