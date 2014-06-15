/**
 * Created by simon on 6/15/14.
 */

(function () {

    location.hash = '';

    function _init() {
        // Scroller
        var $main = $('.main');
        $main.onepage_scroll({
            responsiveFallback: false
        });

        // Google maps
        var map;

        function initialize() {
            var mapOptions = {
                center: new google.maps.LatLng(55.678737, 37.533003),
                zoom: 17,
                scrollwheel: false
            };

            map = new google.maps.Map(
                document.getElementById("map"),
                mapOptions
            );
        }

        if ('undefined' == typeof(google)) {
            google.maps.event.addDomListener(window, 'load', initialize);
        } else {
            initialize()
        }
    }

    $(function () {
        var $login = $('#login'),
            $password = $('#password'),
            $button = $login.find('button'),
            cookieName = MD5('savedPassword'),
            password = 'a50f7baca6418ad439ad6ae09c0bad17';

        if (password === $.cookie(cookieName)) {
            _init();
            $login.remove();
            return
        }

        $password.focus();

        function _checkPassword() {
            var val = $.trim($password.val());

            if (val.length == 0) {
                alert('Введите пароль :)');
                return
            }

            if (MD5(val) === password) {
                _init();
                $login.remove();
                $.cookie(cookieName, password, {path: '/', expires: 30})
            } else {
                alert('Вы ввели не правильный пароль :(');
            }
        }

        $button
            .on('click', function (event) {
                event.preventDefault();
                _checkPassword()
            });

        $password
            .on('keyup', function (event) {
                event.preventDefault();
                if (event.keyCode == 13) {
                    _checkPassword()
                }
            });
    });

    // Google analytics
    $(function () {
        (function (i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r;
            i[r] = i[r] || function () {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date();
            a = s.createElement(o),
                m = s.getElementsByTagName(o)[0];
            a.async = 1;
            a.src = g;
            m.parentNode.insertBefore(a, m)
        })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

        ga('create', 'UA-51956254-1', '27092014.ru');
        ga('send', 'pageview');
    });
})();