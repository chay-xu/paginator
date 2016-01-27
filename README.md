paginator
## 简要
Paginator一款可自由配置的jquery分页插件，可自定义样式。

* 支持ajax分页和url跳转
* 无总页码不会渲染，请求返回可手动渲染
* 任意的分页样式配置
* 任意页码段数显示

see demo [Paginator](http://xu8511831.github.io/demo/paginator/index.html)

## API
直接调用Paginator即可
```js
var pageination = new Paginator({
	current: 0, 		// 当前页
	total: 0, 		// 总页数
	count: 0, 		// 总条数
	startPage: 2, 		// 开始显示条数 head page
	endPage: 1,   		// 结束显示条数 end page
	numPage: 5,   		// 最多显示条数 show total page
	prev: '‹',		// 上一页文本
	next: '›',		// 下一页文本
	first: 'First',		// 第一页文本
	last: 'Last',		// 最后一页文本
	numShow: true,		// 是否显示页码部分
	totalShow: true,	// 是否显示页数 show total
	countShow: false,	// 是否显示条数
	arrowShow: true, 	// 是否一直显示上或下一个按钮
	fastShow: true, 	// 是否一直显示第一或最后按钮
	skipShow: false,	// 是否显示跳转
	selector: '',		// 容器 container
	autoRefresh: false,	// 是否自动初始化
	autoLink: false,	// auto reload page
	name: 'page',		// 同步name
	linkTo: function( page ){	// paginator
		return '#';
	},
	bindFun: function(){}
})
```
## 方法
异步时可以调用重新渲染
```js
pageination.refresh({current:3,total:5,count:6});
```

## 优缺点比较
异步分页插件常用的2种写法

#### 一、是把ajax封装到插件内部，通过配置ajax参数完成数据请求
```js
// 这种写法比较少的，参数名固定无法修改
Pagination( '#Pagination', {
	url: '/getData',
	pageName: 'page',
	sizeName: 'size',
	sizeValue: 15, //每页数
	callback: function( data ){
		// show data, do something...
	}
});
```
#### 二、是绑定函数触发自定义的ajax，完成数据更新
```js
// ajax请求函数
function ajaxRequest( page ){
	$.ajax({
		type: 'POST',
		url: url ,
		data: {
			page: 1
		},
		success: function( data ){
			// 判断是否是第一次请求，初始化pagination
			if( data.page == 1 ){
				init( data )
			}
			// show data...
		}
	});
}
// 初始化pagination
function init( data ){
	Pagination( '#Pagination', {
		size: data.size, //每页数
		total: data.total, //总页数
		callback: function( page ){
			// 数据请求
			ajaxRequest( page )
		}
	});
}
```   
这2种方法缺点

**一、参数无法自定义，数据请求过程不可控**

**二、逻辑有点复杂，需要判断是否初始化**

### Paginator代码实现
* 请求参数方法宽松自由
* 简洁直观，减少逻辑判断

```js
var pageObj = new Paginator({
	// autoRefresh为true自动调用bindFun
	autoRefresh: true,
	bindFun: function( page ){
		ajaxRequest( page )
	}
})

// ajax请求函数
function ajaxRequest( page ){
	$.ajax({
		type: 'POST',
		url: url ,
		data: {
			page: page
		},
		success: function( data ){
			pageObj.refresh({current: data.current, total: data.total, count: data.count});
			// show data...
		}
	});
}
```
待更新...
