(function () {

    function Page(options, wrap) {
        this.current = options.current || 1;
        this.total = options.total || 10;
        this.wrap = wrap;
        this.change = options.change || function () { };
    }

    // 初始化函数
    Page.prototype.init = function () {
        //创建结构
        this.fillHTML();
        //点击行为
        this.bindEvent();
    }
    // 创建结构
    Page.prototype.fillHTML = function () {
        var wrapper = $('<ul class="my-page-wrap"></ul>');
        // 上一页按钮
        if (this.current > 1) {
            $('<li class="my-page-prev">上一页</li>').appendTo(wrapper);

        }
        // 第一页
        $('<li class="my-page-num">1</li>')
            .appendTo(wrapper)
            .addClass(this.current == 1 ? 'current' : '');;
        // 省略号
        if (this.current - 2 - 1 > 1) {
            $('<span>...</span>').appendTo(wrapper);
        }
        // 中间项
        for (var i = this.current - 2; i <= this.current + 2; i++) {
            if (i > 1 && i < this.total) {
                $('<li class="my-page-num"></li>')
                    .text(i)
                    .addClass(this.current == i ? 'current' : '')
                    .appendTo(wrapper);
            }
        }
        // 省略号
        if (this.total - (this.current + 2) > 1) {
            $('<span>...</span>').appendTo(wrapper);
        }
        // 最后一页
        this.total != 1 && $('<li class="my-page-num"></li>')
            .text(this.total)
            .addClass(this.current == this.total ? 'current': '')
            .appendTo(wrapper);
        // 下一页
        if(this.current < this.total){
            $('<li class="my-page-next">下一页</li>').appendTo(wrapper);
        }
        // 插入到页面中
        this.wrap.html(wrapper);

    }

    Page.prototype.bindEvent = function () {
        var self = this;
        // 上一页
        $(this.wrap).find('.my-page-prev').click(function () {
            self.current --;
            self.init();
            self.change(self.current);
        })
        // 下一页
        $(this.wrap).find('.my-page-next').click(function () {
            self.current ++;
            self.init();
            self.change(self.current);
        })
        $(this.wrap).find('.my-page-num').click(function () {
            self.current = parseInt($(this).text());
            self.init();
            self.change(self.current);
        })
    }

    $.fn.extend({
        page: function (options) {
            var obj = new Page(options, this);
            obj.init();
        }
    })

}())