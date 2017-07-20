window.onload = function () {
    var port = chrome.extension.connect({ name: "background" });
    port.postMessage({ status: "ready" });

    port.onMessage.addListener(function (msg) {
        $("label").text(msg.delayTime + 'sec');
        $("span").text(msg.spantext);
    });

    document.getElementById('act').addEventListener('click', function () {
        var u4 = document.getElementById('time').value;
        if (u4 != "" && parseInt(u4) > 0) {
            u4 = parseInt(u4) * 1000;

            $("label").text((u4 / 1000).toString() + 'sec');
            $("span").text('running');
            delay = u4 / 1000;
            spantext = "running";

            port.postMessage({
                status: "start",
                time: u4,
                url1: $('#url1').val(),
                url2: $('#u2').val(),
                url3: $('#u3').val()
            });
        } else {
            alert('실행시간을 입력해주세요');
        }
    });
}
function clear() {
    clearInterval(play);
    $("label").text('');
    $("span").text('stopped');
}