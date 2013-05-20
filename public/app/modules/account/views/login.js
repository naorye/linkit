define([
    'lodash',
    'backbone',
    'app'
], function(_, Backbone, app) {

    var bulletWidth = 290,
        bulletPadding = 15,
        bulletMargin = 15,
        bulletsPadding = 15,
        smallScreenDivider = 1.5;

    var LoginView = Backbone.View.extend({
        className: 'login-view',
        template: 'account/login',
        events: {
            'click .bullet': 'highlightLogin'
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
        }
    });

    return LoginView;
});