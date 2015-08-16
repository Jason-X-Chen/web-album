<<<<<<< HEAD
﻿# web-album
WEB相册
调试工具和库：
调试工具使用PC端Chrome，在Chrome emluation模拟器中模拟移动端行为,
移动端JS库使用轻量化的Zepto，使用CSS3框架animate.css实现CSS3动画效果；

功能：
实现图片列表的展示；触摸列表图片显示大图；点击大图图层，关闭当前图层；滑动大图实现图片翻页；

技术：
为实现图片根据屏幕大小呈四列显示，使用JavaScript动态添加图片列表结构
使用Canvas代替Image标签，触发GUP渲染，保证图片在移动端浏览过程中更流畅
实现触摸列表图片显示大图时，使用事件代理为由JavaScript动态生成的多个元素添加事件
根据宽高比，对横图和竖图计算其相应的图片显示尺寸
使用animation event在动画完成后移除和添加CSS3样式，解决连续翻图动画消失问题
=======
# web-album
WEB相册</br>
调试工具和库：</br>
调试工具使用PC端Chrome，在Chrome emluation模拟器中模拟移动端行为,</br>
移动端JS库使用轻量化的Zepto，使用CSS3框架animate.css实现CSS3动画效果；</br>

功能：
实现图片列表的展示，触摸图片显示大图，滑动大图实现图片翻页；</br>

技术：
为实现图片根据屏幕大小呈四列显示，使用JavaScript动态添加图片列表结构</br>
使用Canvas代替Image标签，触发GUP渲染，保证图片在移动端浏览过程中更流畅</br>
实现触摸列表图片显示大图时，使用事件代理为由JavaScript动态生成的多个元素添加事件</br>
根据宽高比，对横图和竖图计算其相应的图片显示尺寸</br>
>>>>>>> origin/master
