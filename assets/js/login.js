const letters = /^[A-Za-z]+$/;
$(function () {
    $('#loginButton').click(function (e) {
        e.preventDefault();
        let username = $('#username').val();
        let password = $('#password').val();
        if (username == 'admin' && password == 'admin') {
            window.location.replace("index.php/welcome/loadViewer");
        } else {
            alert('Error en las credenciales');
        }
    });
    $('#openButton').click(function (e) {
        e.preventDefault();
        $(this).css('display', 'none');
        $('#inputQuery').css('display', 'block');
    });

    $('#inputQuery').bind("enterKey", function (e) {
        let keyword = $(this).val();
        if (keyword.match(letters)) {
            $('#closeButton').css('display', 'block');
            $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
                {
                    tags: keyword,
                    tagmode: "all",
                    lang: "es-us",
                    format: "json"
                },
                function (data) {
                    var rnd = Math.floor(Math.random() * data.items.length);
                    var image_src = data.items[rnd]['media']['m'].replace("_m", "_b");
                    $('#imageContainer').attr('src', image_src);
                    $('#imageContainer').css('display', 'block');
                });
        } else {
            alert('No incluya metacaracteres en la palabra buscada!');
            return false;
        }
    });

    $('#logoutButton').click(function(e){
        e.preventDefault();
        window.location.replace("/");
    });

    $('#inputQuery').keyup(function (e) {
        if (e.keyCode == 13) {
            $(this).trigger("enterKey");
        }
    });
});