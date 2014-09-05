Welcome to the paginator wiki!
## 简要
Paginator一款可自由配置的jquery分页插件，可自定义样式。

## API
直接调用Paginator即可

    Paginator({
    	current: 1, 		// 当前页
    	total: 0, 		    // 总页数
    	count: 0, 		// 总条数
    	startPage: 2, 		// 开始显示条数 head page
    	endPage: 1,   		// 结束显示条数 end page
    	numPage: 5,   		// 最多显示条数 show total page
    	prev: '‹',		  // 上一页文本
    	next: '›',		  // 下一页文本
    	first: 'First',		// 第一页文本
    	last: 'Last',		// 最后一页文本
    	numShow: true,		// 是否显示页码部分
    	totalShow: true,	// 是否显示页数部分
    	countShow: false,	// 是否显示条数部分
        skipShow: false,	// 是否显示跳转部分
        firstShow: true, 	// 是否显示第一页按钮部分
    	lastShow: true, 	// 是否显示最后一按钮部分
    	prevShow: true, 	// 是否一直显示上一按钮
    	nextShow: true, 	// 是否一直显示下一按钮
    	selector: '',		// 容器 container
    	autoLink: false,	// 是否 auto reload page
    	linkTo: function( page ){	// reload pagination link
			return '#';
    	},
    	bindFun: function( page ){}	// bind jump event page
    })
