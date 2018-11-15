$(function () {


    $('#liveId').val(localStorage.getItem('liveId') || '');
    $('#localIp').val(localStorage.getItem('localIp') || '');

    $('#turn-button').click(function () {

        var liveId = $('#liveId').val();
        var localIp = $('#localIp').val();

        if(!liveId)
            return alert('Need Live ID');

        if(!localIp)
            return alert('Need Local IP');

        localStorage.setItem('liveId', liveId);
        localStorage.setItem('localIp', localIp);

        jQuery.ajax ({
            url: 'start',
            type: "POST",
            data: JSON.stringify({
                liveId: liveId,
                localIp: localIp
            }),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function(result){
                if(result.ok) {
                    alert('Команда на включение полслана!');
                } else {
                    alert('ERROR: ' + JSON.stringify(result));
                }
            },
            fail: function(err){
                alert('ERROR: ' + err);
            }
        });

    });

    $('#ping-button').click(function () {

        var localIp = $('#localIp').val();
        if(!localIp)
            return alert('Need Local IP');

        jQuery.ajax ({
            url: '/ping',
            type: "POST",
            data: JSON.stringify({
                localIp: localIp
            }),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function(result){
                if(result.ok) {
                    alert('ok!');
                } else {
                    alert('fail');
                }
            },
            fail: function(err){
                alert('ERROR: ' + err);
            }
        });

    });

});