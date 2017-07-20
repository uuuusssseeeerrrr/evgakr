var play;
var delay = 0;
var spantext = "";
var labeltext = "";

chrome.extension.onConnect.addListener(function (port) {
    port.onMessage.addListener(function (msg) {
        if (play) {
            port.postMessage({
                delayTime: delay,
                spantext: "running"
            });
        } else {
            if (msg.status == "start") {
                (function () {

                    labeltext = (msg.time / 1000).toString() + 'sec';
                    delay = msg.time / 1000;
                    spantext = "running";

                    if (play) clearInterval(play);
                    play = setInterval(function () {
                        var stock = 0;
                        var tagText = "";
                        $.ajax({
                            type: 'GET',
                            url: msg.url1,
                            success: function (data) {
                                tagText = data;
                                tagText = tagText.substr(tagText.indexOf('set_goods_stock') + 24, 1);
                                if (parseInt(tagText) > 0) {
                                    clearInterval(play);
                                    alert("url1 상품의 재고가 존재합니다");
                                }
                            }
                        });
                        $.ajax({
                            type: 'GET',
                            url: msg.url2,
                            success: function (data) {
                                tagText = data;
                                tagText = tagText.substr(tagText.indexOf('set_goods_stock') + 24, 1);
                                if (parseInt(tagText) > 0) {
                                    clearInterval(play);
                                    alert("url2 상품의 재고가 존재합니다");
                                }
                            }
                        });
                        $.ajax({
                            type: 'GET',
                            url: msg.url3,
                            success: function (data) {
                                tagText = data;
                                tagText = tagText.substr(tagText.indexOf('set_goods_stock') + 24, 1);
                                if (parseInt(tagText) > 0) {
                                    clearInterval(play);
                                    alert("url3 상품의 재고가 존재합니다");
                                }
                            }
                        });
                    }, msg.time);
                })();
            }
        }
    })
});