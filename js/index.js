$('#shortcut > .w').load('./components/shortcut.html');



$('.sliderWrapper').load('./components/sliderWrapper.html', function () {
    $(this).swiper({
        contentList: $(this).find('.focus-item__core'),
        autoChangeTime: 3000,
        type: 'fade',
        isAuto: true,
        showChangeBtn: 'always',
        spotPosition: 'left',
        showSpot: true,
        spotColor: '#fff',
        spotSize: 8,
        width: 590,
        height: 470
    })
});
$('#header > .w').load('./components/header.html');

$('.sliderBanner').load('./components/sliderBanner.html', function () {
    $(this).swiper({
        contentList: $(this).find('.focus-item__recommend'),
        autoChangeTime: 4000,
        type: 'animate',
        isAuto: true,
        showChangeBtn: 'hover',
        showSpot: false,
        width: 190,
        height: 470
    })
});

$('.fs-1').load('./components/menu.html');

$('.fs-3').load('./components/user.html');

$('.seckill-list').load('./components/seckill-list.html', function () {
    $(this).swiper({
        contentList: $(this).find('.slider_wrapper'),
        autoChangeTime: 4000,
        type: 'animate',
        isAuto: false,
        showChangeBtn: 'hover',
        showSpot: false,
        width: 800,
        height: 260
    })
});

$('.seckill-brand').load('./components/seckillBrand.html', function () {
    $(this).swiper({
        contentList: $(this).find('.brand-item'),
        autoChangeTime: 5000,
        type: 'animate',
        isAuto: true,
        showChangeBtn: 'hide',
        spotPostition: 'center',
        showSpot: true,
        spotColor: '#e83632',
        spotColorStrat: '#aaa',
        spotSize: 3,
        width: 200,
        height: 260
    })
});


// 秒杀专场
var endTime = new Date('2021-3-8-20:00');
var seckillTimer = setInterval(function () {

    var nowTime = new Date();
    var endHour = endTime.getHours();
    var disTime = endTime - nowTime;

    $('.countdown-desc strong').text(endHour + ':00');

    if (disTime < 0) {
        clearInterval(seckillTimer);
        $('.timmer__unit--hour').text('00');
        $('.timmer__unit--minute').text('00');
        $('.timmer__unit--second').text('00');
    } else {
        // 剩余小时数
        var hour = Math.abs(parseInt(disTime / 1000 / 60 / 60));
        // 剩余分钟数
        var minute = Math.abs(parseInt(disTime / 1000 / 60 % 60));
        // 剩余秒数
        var second = Math.abs(parseInt(disTime / 1000 % 60));


        if (hour != 0) {
            if (hour < 10) {
                hour = "0" + hour;
            }
            if (minute < 10) {
                minute = "0" + minute;
            }
            if (second < 10) {
                second = "0" + second;
            }

            console.log(hour, minute, second);
            $('.timmer__unit--hour').text(hour);
            $('.timmer__unit--minute').text(minute);
            $('.timmer__unit--second').text(second);
        }
    }



}, 1000)