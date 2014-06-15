/**
 * Created by simon on 6/15/14.
 */

(function () {

    location.hash = '';

    function _init() {
        // Scroller
        var $main = $('.main');
        $main.onepage_scroll();

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
            cookieName = MD5('savedPassword'),
            password = 'a50f7baca6418ad439ad6ae09c0bad17';

        if (password === $.cookie(cookieName)) {
            _init();
            $login.remove();
            return
        }

        $password.focus();

        $login
            .find('button')
            .on('click', function (event) {
                event.preventDefault();

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
            });
    });
})();