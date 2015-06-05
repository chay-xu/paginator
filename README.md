paginator
## 简要
Paginator一款可自由配置的jquery分页插件，可自定义样式。

see demo [Paginator](http://xu8511831.github.io/demo/rMenu/index.html)

## API
直接调用Paginator即可

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
## 方法
异步时可以调用重新渲染
pageination.refresh({current:3,total:5,count:6});
