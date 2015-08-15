// JavaScript Document
var total=8;
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
		/*temHtml+='<li data-id="'+i+'"; class="animated bounceIn"; style="width:'+picWidth+'px;height:'+picWidth+'px;padding-top:'+padding+'px;padding-left:'+p+'px;"><img src="'+imgSrc+'" /></li>';*/
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

var wImage=$('#large_img');
var loadImg=function(id){
	$('#container').css({height:zWin.height(),'overflow':'hidden'});
	$('#large_container').css({width:zWin.width(),height:zWin.height()}).show();//设置css样式，显示图层
	
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
		wImage.css('width','auto').css('height','auto');
		wImage.css('padding-left','0px').css('padding-top','0px');
		if(h/w>1.2){
			wImage.attr('src',imgsrc).css('height',winHeight).css('padding-left',paddingLeft);
		}else{
			wImage.attr('src',imgsrc).css('width',winWidth).css('padding-top',paddingTop);
		}
	};
	
};
//事件代理为动态生成标签添加事件
$('#container').delegate('li','tap',function(){
	var _id=$(this).attr('data-id');//自定义属性获取图片
	console.log(_id);
	loadImg(_id);
});

	/*var cid;
	var wImage = $('#large_img');
	var domImage = wImage[0];

	var loadImg = function(id,callback){
		//$('#container').css({height:zWin.height(),'overflow':'hidden'})
		$('#large_container').css({
			width:zWin.width(),
			height:zWin.height()
			//top:$(window).scrollTop()
		}).show();
		var imgsrc = 'images/'+id+'.large.jpg';
		var ImageObj = new Image();
		
		ImageObj.onload = function(){
			var w = this.width;
			var h = this.height;
			var winWidth = zWin.width();
			var winHeight = zWin.height();
		    var realw = parseInt((winWidth - winHeight*w/h)/2);
			var realh = parseInt((winHeight - winWidth*h/w)/2);

			//wImage.css('width','auto').css('height','auto');
			//wImage.css('padding-left','0px').css('padding-top','0px');
			if(h/w>1.2){
				 wImage.attr('src',imgsrc).css('height',winHeight).css('padding-left',realw+'px');;
			}else{	
				 wImage.attr('src',imgsrc).css('width',winWidth).css('padding-top',realh+'px');
			}
			
			callback&&callback();
		}
		ImageObj.src = imgsrc;
		
	}
	$('#container').delegate('li','tap',function(){
		var _id = cid = $(this).attr('data-id');
		loadImg(_id);
	});*/