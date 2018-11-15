$(function () {

    $('#turn-button').click(function () {

        var liveId = $('#liveId').val();
        var localIp = $('#localIp').val();

        if(!liveId)
            return alert('Need Live ID');

        if(!localIp)
            return alert('Need Local IP');

        jQuery.ajax ({
            url: '/start',
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

});