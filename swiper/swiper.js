//轮播图的构造函数
function Swiper(options, wrap) {
    //当前要插入轮播图的区域
    this.wrap = wrap;
    //轮播的内容列表
    this.contentList = options.contentList || {};
    //轮播的速度
    this.autoChangeTime = options.autoChangeTime || 1000;
    //轮播的动画类型：fade：淡入淡出  animate：从左到右的轮播
    this.type = options.type || 'fade';
    //是否自动轮播
    this.isAuto = options.isAuto == undefined ? true : !!options.isAuto;
    //左右按钮的显示状态
    this.showChangeBtn = options.showChangeBtn || 'always';
    //是否显示小圆点
    this.showSpot = options.showSpot == undefined ? true : !!options.showSpot;
    //小圆点的大小
    this.spotSize = options.spotSize || 5;
    //小圆点的初始颜色
    this.spotColorStrat = options.spotColorStrat || 'rgba(255,255,255,.4)';
    //小圆点的颜色
    this.spotColor = options.spotColor || 'red';
    //小圆点的位置
    this.spotPosition = options.spotPosition || 'center';
    //轮播内容大小
    this.width = options.width || $(wrap).width();
    this.height = options.height || $(wrap).height();
    //轮播图片个数
    this.len = this.contentList.length;
    this.nowIndex = 0;
    //定时器
    this.timer = null;
    this.lock = false;
}

Swiper.prototype.init = function () {
    //创建轮播区域结构
    this.createElement();
    //初始化样式
    this.initStyle();
    //功能绑定
    this.bindEvent();
    //自动轮播
    if(this.isAuto) {
        this.autoChange();
    }
}
//创建轮播区域结构
Swiper.prototype.createElement = function () {
    //整个轮播图的包裹层
    var swiperWrapper = $('<div class="my-swiper-wrapper"></div>');
    //轮播图内容区
    var swiperItems = $('<ul class="my-swiper-items"></ul>');
    //左边切换按钮
    var swiperLeftBtn = $('<div class="my-swiper-btn  my-swiper-leftBtn"><i class="iconfont">&#xe625;</i></div>');
    //右边切换按钮
    var swiperRightBtn = $('<div class="my-swiper-btn my-swiper-rightBtn"><i class="iconfont">&#xe628;</i></div>');

    //小圆点区域
    var swiperSpots = $('<div class="my-swiper-spots"></div>');
    for (var i = 0; i < this.len; i++) {
        $('<li class="my-swiper-item"></li>').html(this.contentList[i])
            .appendTo(swiperItems);
        $('<span class="my-swiper-spot"></span>').appendTo(swiperSpots);
    }

    if (this.type == 'animate') {
        //   如果是从左到右的轮播  想要实现无缝衔接的效果 需要在最后添加一个第一张图片
        swiperItems.append(
            $('<li class="my-swiper-item"></li>').html(
                $(this.contentList[0]).clone(true)
            )
        )
    }
    //   设置左右按钮的样式
    if (this.showChangeBtn == 'always') {
        swiperLeftBtn.show();
        swiperRightBtn.show();
    } else if (this.showChangeBtn == 'hide') {
        swiperLeftBtn.hide();
        swiperRightBtn.hide();
    } else if (this.showChangeBtn == 'hover') {
        swiperLeftBtn.hide();
        swiperRightBtn.hide();
        $(this.wrap).hover(function () {
            swiperLeftBtn.show();
            swiperRightBtn.show();
        }, function () {
            swiperLeftBtn.hide();
            swiperRightBtn.hide();
        })
    }
    //小圆点不显示
    if (!this.showSpot) {
        swiperSpots.hide();
    }
    //把元素都插入到this.wrap中，即调用siwper方法的DOM元素
    swiperWrapper
        .append(swiperItems)
        .append(swiperLeftBtn)
        .append(swiperRightBtn)
        .append(swiperSpots)
        .appendTo(this.wrap)
        .addClass('my-swiper-wrapper_' + this.type);

}

//初始化样式
Swiper.prototype.initStyle = function () {
    //调整轮播图区域的大小
    $(this.wrap).find('.my-swiper-items').css({
        //如果是从左到右的轮播效果  则让内容区的整体宽度等于所有轮播内容之和（所有图片之和）
        width: this.type == 'animate' ? this.width * (this.len + 1) : this.width,
        height: this.height
    }).find('.my-swiper-item').css({    //调整轮播图单个区域（图片）的大小
        width: this.width,
        height: this.height
    });
    // 如果是淡入淡出的轮播效果 显示当前需要展示的图片
    if (this.type == 'fade') {
        $(this.wrap).find('.my-swiper-item').eq(this.nowIndex).show();
    } else {
        // 如果是从左到右的轮播效果 调整轮播图的位置（轮播效果）
        $(this.wrap).find('.my-swiper-items').css({
            left: -this.nowIndex * this.width
        })
    }
    //小圆点区域
    $(this.wrap)
        .find(".my-swiper-spots")
        .css({
            textAlign: this.spotPosition
        })
        .find('span').css({
            width: this.spotSize,
            height: this.spotSize,
            backgroundColor:this.spotColorStrat
        })
        .eq(this.nowIndex).css({
            backgroundColor: this.spotColor
        })
}
//功能绑定
Swiper.prototype.bindEvent = function () {
    var self = this;
    //左边按钮点击事件
    $(this.wrap).find('.my-swiper-leftBtn').click(function () {
        //如果有动画则不进行下面的操作
        if (self.lock) {
            return;
        }
        self.lock = true;
        //如果是淡入淡出的动画效果
        if (self.type == 'fade') {
            if (self.nowIndex == 0) {
                self.nowIndex = self.len - 1;
            } else {
                self.nowIndex--;
            }
            self.change();
        } else {
            //如果是从左到右的动画效果
            if (self.nowIndex == 0) {
                $(self.wrap)
                    .find('.my-swiper-items')
                    .css({
                        left: self.width * -self.len
                    })
                self.nowIndex = self.len - 1;
            } else {
                self.nowIndex--;
            }
            self.change();
        }
    })
    //右边按钮点击事件
    $(this.wrap).find('.my-swiper-rightBtn').click(function () {

        //如果有动画则不进行下面的操作
        if (self.lock) {
            return;
        }
        self.lock = true;
        //如果是淡入淡出的动画效果
        if (self.type == 'fade') {
            if (self.nowIndex == self.len - 1) {
                self.nowIndex = 0;
            } else {
                self.nowIndex++;
            }
            self.change();
        } else {
            //如果是从左到右的动画效果
            if (self.nowIndex == self.len) {
                $(self.wrap)
                    .find('.my-swiper-items')
                    .css({
                        left: 0
                    })
                self.nowIndex = 1;
            } else {
                self.nowIndex++;
            }
            self.change();
        }
    })
    //小圆点事件
    $(this.wrap).find('.my-swiper-spots').on('mouseenter', 'span', function () {
        if (self.lock) {
            return;
        }
        self.lock = true;
        
        var index = $(this).index();
        self.nowIndex = index;
        self.change();
    });

    //放到图片上停止自动播放
    $(this.wrap).on('mouseenter', function () {
        clearInterval(self.timer);
    }).on('mouseleave', function () {
        if (self.isAuto) {
            self.autoChange();
        }
    })

}
//切换动画
Swiper.prototype.change = function () {
    //淡入淡出的动画效果
    var self = this;
    if (this.type == 'fade') {
        $(this.wrap).find('.my-swiper-item').fadeOut().eq(this.nowIndex).fadeIn(function () {
            self.lock = false;
        });
    } else {//从左到右的动画效果
        $(this.wrap)
            .find('.my-swiper-items')
            .animate({
                left: this.width * -this.nowIndex
            }, function () {
                self.lock = false;
            })
    }
    //小圆点的动画效果
    $(this.wrap)
        .find('.my-swiper-spots > span')
        .removeClass('active')
        .css({
            backgroundColor: this.spotColorStrat
        })
        .eq(this.nowIndex % this.len)
        .addClass('active')
        .css({
            backgroundColor: this.spotColor
        })
}

//自动播放
Swiper.prototype.autoChange = function () {
    var self = this;
    this.timer = setInterval(function () {
        $(self.wrap).find('.my-swiper-rightBtn').trigger('click');
    }, this.autoChangeTime);
}
$.fn.extend({
    swiper: function (options) {
        var obj = new Swiper(options, this);
        obj.init();
    }
})