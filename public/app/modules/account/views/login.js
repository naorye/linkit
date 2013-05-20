define([
    'lodash',
    'backbone',
    'app'
], function(_, Backbone, app) {

    var bulletWidth = 290,
        bulletPadding = 15,
        bulletMargin = 15,
        bulletsPadding = 15,
        highlightDuration = 1500, //ms
        smallScreenDivider = 1.5,
        maxBulletSwing = 30; //deg

    var LoginView = Backbone.View.extend({
        className: 'login-view',
        template: 'account/login',
        events: {
            'click .bullet': 'highlightLogin'//,
            //'mouseleave .bullet-wrapper': 'mouseLeaveBullet',
            //'mousemove .bullet-wrapper': 'mouseMoveOnBullet'
        },
        initialize: function() {
            this.calculateBulletsWidth =
                _.bind(this.calculateBulletsWidth, this);
            $(window).on('resize', this.calculateBulletsWidth);
        },
        cleanup: function() {
            $(window).off('resize', this.calculateBulletsWidth);
        },
        beforeRender: function() {
        },
        afterRender: function() {
            this.calculateBulletsWidth();
        },
        calculateBulletsWidth: function() {
            var windowWidth = $(window).width(),
                divider = windowWidth <= 700 ? smallScreenDivider : 1,
                totalWidth =  windowWidth - bulletsPadding * 2,
                bulletTotalWidth = (bulletWidth + bulletMargin * 2 + bulletPadding * 2) / divider,
                bulletsInRow = Math.floor(totalWidth / bulletTotalWidth),
                actualWidth = bulletTotalWidth * bulletsInRow;
            this.$('.bullets').css('width', actualWidth);
        },
        highlightLogin: function(event) {
            window.w = this;
            var loginButton = this.$('.facebook-login'),
                top = loginButton.position().top - 20,
                blinkTimes = 6,
                blink = function() {
                    loginButton.toggleClass('highlight');
                    blinkTimes --;
                    if (blinkTimes > 0) {
                        setTimeout(blink, 200);
                    }
                };

            $('html, body')
                .animate({ scrollTop: top }, 400, 'swing')
                .promise().done(blink);
        },
        mouseLeaveBullet: function(event) {
            var bullet = $(event.currentTarget).find('.bullet');
            this.clearBulletRotate(bullet);
        },
        mouseMoveOnBullet: function(event) {
            var bullet = $(event.currentTarget).find('.bullet'),
                left = bullet.position().left + bulletMargin,
                width = bullet.outerWidth(),
                center = width / 2,
                curRelPosX = event.clientX - left,
                percent = curRelPosX <= center ?
                    curRelPosX / center :
                    (width - curRelPosX) / center,
                rotatePosition = curRelPosX <= center ? 1 : -1,
                rotateY = rotatePosition * maxBulletSwing * (1 - percent);

            this.rotateBullet(bullet, rotateY);
        },
        clearBulletRotate: function(bullet) {
            bullet.css({
                'transform': 'rotateY(0deg)',
                'box-shadow': ''
            });
        },
        rotateBullet: function(bullet, rotateY) {
            var boxShadow =
                rotateY * 0.2 + 'px 0 20px 0px black';

            bullet.css({
                'transform': 'rotateY(' + rotateY + 'deg)',
                'box-shadow': '0px 0 20px 0px black'
            });
        }
    });

    return LoginView;
});