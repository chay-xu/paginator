/** 
 * @file: paginator plugin
 * @version 2.0
 * @author: xucaiyu
 * @email: 569455187@qq.com
 */
// paginator plugin
!(function(window){
		var Default = {
			current: 0, 		// 当前页
			total: 0, 			// 总页数
			count: 0, 			// 总条数
			startPage: 2, 		// 开始显示条数 head page
			endPage: 1,   		// 结束显示条数 end page
			numPage: 5,   		// 最多显示条数 show total page
			prev: '‹',			// 上一页文本
			next: '›',			// 下一页文本
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
			name: 'page',
			linkTo: function( page ){	// paginator
				return '#';
			},
			bindFun: function(){}
		}
		// paginatoion
		function pagination( options ){
			var that = this;

			that.options = $.extend({}, Default, options || {});

			that.$selector = typeof options.selector === 'string' ? $( options.selector ) : options.selector;

			// 自动初始化
			// if( that.autoInit )
			that._init();
		}
		
		pagination.prototype = {
			version: '2.0',
			_init: function(){
				var that = this,
					opts = that.options,
					autoLink = opts.autoLink,
					skipShow = opts.skipShow,
					total = Number( opts.total ),
					current = Number( opts.current ),
					count = Number( opts.count ),
					html;

				html = '<div class="xcy-pages-warp">';
				// 分页段
				html += '<div class="xcy-pages-num">';
				if( total > 0 ){
					html += that._drawLink( current, total );
				}
				html += '</div>';
				// 总页段
				html += '<div class="xcy-pages-count">';
				if( total > 0 ){
					html += that._drawCount( current, total, count );
				}
				html += '</div>';

				if( skipShow ){
					html += that._drawSkip( current );
				}
				html += '</div>';

				// render dom html
				that.$selector.html( html );
				// paginator event
				if( !autoLink ){
					// ajax
					// 异步加载
					$( '.xcy-pages-warp', that.$selector ).delegate( 'a', 'click', function( e ){
						var className = $( this ).attr( 'class' ),
							current = opts.current;

						if( className == 'xcy-next' ){
							current++;
						}else if( className == 'xcy-prev' ){
							current--;
						}else if( className == 'xcy-first' ){
							current = 1;
						}else if( className == 'xcy-last' ){
							current = opts.total;
						}else{
							current = Number( $( this ).attr( 'sh-page' ) );
						}

						that._handle( current, opts.total, opts.count )

						return false;
					})
					// skip form submit
					// submit button 异步加载
					if( skipShow ){
						$( '.xcy-pages-form', that.$selector ).bind( 'submit', function(){
							current = $( '.xcy-skip-input', that.$selector ).val();

							that._handle( current, opts.total, opts.count )

							return false;
						})
					}
				}else{
					// form submit
					// submit button 同步加载
					$( '.xcy-pages-form', that.$selector ).bind( 'submit', function(){
						var bo;

						current = $( '.xcy-skip-input', that.$selector ).val();

						if( current > total ) return false;
						// return submit boolen
						bo = opts.bindFun( current );

						$( this ).attr( 'action', opts.linkTo( current ) );

						return bo ? false : bo;
					})
				}
				
			},
			_drawLink: function( current, total ){
				var that = this,
					opts= that.options,
					startPage = Number( opts.startPage ),
					endPage = Number( opts.endPage ),
					NewEndPage =  endPage > 0 ? endPage - 1 : -1,
					numPage = Number( opts.numPage ),
					minNumPage = numPage - 1,
					startNumPage = parseInt( ( numPage - 1 )/2 ),
					endNumPage = numPage - startNumPage - 1,
					linkTo = that.options.linkTo,
					html = '',
					split = '<span class="xcy-pages-split">...</span>';  

				// first
				if( current > 1 && opts.fastShow ){
					html += '<a href="'+linkTo(current-1)+'" class="xcy-first">'+ opts.first +'</a>';
				}else if( opts.fastShow !== false ){
					html += '<span class="xcy-first">'+ opts.first +'</span>';
				}

				// prev
				if( current > 1 && opts.arrowShow ){
					html += '<a href="'+linkTo(1)+'" class="xcy-prev">'+ opts.prev +'</a>';
				}else if( opts.arrowShow !== false ){
					html += '<span class="xcy-prev">'+ opts.prev +'</span>';
				}

				if( opts.numShow ){
					if( current - numPage >= 0 && total - current >= minNumPage ){
						// current is middle
						// start
						if( current - 1 > startPage + startNumPage ){
							html += that._eachBlock( 1, startPage );
							html += split;
						}else{
							html += that._eachBlock( 1, startPage );
						}

						// middle
						html += that._eachBlock( current - startNumPage, current + endNumPage );

						// end
						if( total - current > endPage + endNumPage ){
							html += split;
							html += that._eachBlock( total - NewEndPage, total );
						}else{
							html += that._eachBlock( current + endNumPage + 1, total );
						}	

					}else if( current - numPage < 0 && total > numPage + endPage ){
						// current is start
						// start
						html += that._eachBlock( 1, numPage );
						html += split;
						// end
						html += that._eachBlock( total - NewEndPage, total );

					}else if( total - current < minNumPage && total > numPage + startPage ){
						// current is end
						// start
						html += that._eachBlock( 1, startPage );
						html += split;
						// end
						html += that._eachBlock( total - minNumPage, total );

					}else{
						// current is all
						html += that._eachBlock( 1, total );
					}
				}

				// next
				if( current < total  && opts.arrowShow ){
					html += '<a href="'+linkTo(current+1)+'" class="xcy-next">'+ opts.next +'</a>';
				}else if( opts.arrowShow !== false ){
					html += '<span class="xcy-next">'+ opts.next +'</span>';
				}

				// last
				if( current < total && opts.fastShow ){
					html += '<a href="'+linkTo(total)+'" class="xcy-last">'+ opts.last +'</a>';
				}else if( opts.fastShow !== false ){
					html += '<span class="xcy-last">'+ opts.last +'</span>';
				}

				return html;
			},
			_drawCount: function( current, total, count ){
				var html = '';

				// total
				if( this.options.totalShow )
					html += '<b>'+ current +'/' + total + '</b><span>页</span>';
				// count
				if( this.options.countShow )
					html += ' <span>共</span>'+ count +'条';

				return html;
			},
			_drawSkip: function( current, total ){
				var that = this,
					skipShow = that.options.skipShow,
					current = current + 1 > total ? current : current + 1,
					html = '';

				// skip
				html += '<div class="xcy-pages-skip"><form id="xcy-pages-form" class="xcy-pages-form" method="get" action="">';
				html += '<label>去第</label><input type="text" class="xcy-skip-input" name="'+that.options.name+'" size="3" value=\"'+ current +'\"><span>页</span>';
				html += '<input type="submit" class="xcy-skip-button" value="确 定"><form></div>';

				return html;
			},
			_eachBlock: function( min, max ){
				var that = this,
					linkTo = that.options.linkTo,
					current = that.options.current,
					i, html = '';

				for ( i = min; i <= max; i++ ) {
					if( i == current ){
						html += '<span class="xcy-pages-current">'+ i +'</span>';
					}else{
						html += '<a href="'+ linkTo(i) +'" sh-page="'+ i +'" >'+ i +'</a>';
					}
				};

				return html;
			},
			_handle: function( current, total, count ){
				var that = this,
					opts = that.options;

				if( current > 0 && current <= opts.total ){
					// refresh and bind event
					if( opts.autoRefresh )
						that.refresh({ current: current })
				}
				// page bind event
				opts.bindFun.call(that, current, total, count );
			},
			refresh: function( options ){
				var that = this,
					opts = $.extend( that.options, options || {}),
					skipShow = opts.skipShow,
					current, subCurrent, total, count;

				// $.extend( opts, options || {});

				current = Number( opts.current );
				total = Number( opts.total );
				count = Number( opts.count );

				$( '.xcy-pages-num', that.$selector ).html( that._drawLink( current, total ) );

				$( '.xcy-pages-count', that.$selector ).html( that._drawCount( current, total, count ) );

				if( skipShow ){
					subCurrent = current + 1 > total ? current : current + 1,
					$( ' .xcy-skip-input', that.$selector ).val( subCurrent );
				}

				return this;
			},
			destroy: function(){
				var that = this;

				$( '.xcy-pages-warp', that.$selector ).unbind();
				if( that.options.autoLink || that.options.skipShow ){
					$( '.xcy-pages-form', that.$selector ).unbind();
				}
			}
		}

		typeof define == "function" ? define(function(fasTpl) {
	        return pagination;
	    }) : typeof exports != "undefined" ? module.exports = pagination : window.Paginator = pagination;
})(window)