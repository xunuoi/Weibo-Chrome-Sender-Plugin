/**
 * @description:粉丝数量多的在前面，  微博数多的在前面，关注少的在前面。     这是3个最主要的指标。当然认证用户最优先。
 * @introduction:

1、使用方法
    电脑安装Chrome浏览器，然后将插件包wbRobot.crx拖到Chrome浏览器来安装，安装完成后，打开Chrome浏览器右上角会有一个蓝色图标
2、用Chrome浏览器登录微博账号，点击右上角蓝色图标，会出现控制面板，输入微博信息、时间间隔，点击【开始】，这个时候就开始自动发送微博了。发送期间，不能关闭这个浏览页面。如果要停止，那么点击控制面板的【停止】按钮

3、时间间隔单位是ms（毫秒），需要>=120000（2分钟），如果发送太快，会被提示发送频繁然后冻结一段时间，才能正常。所以间隔最好设置长一点，3~5分钟

4、支持多个微博账号，比如A、B、C三个微博账号，都可以同时来刷一条微博。发布时间间隔开， 这样就能较频繁的刷屏了

====
我大致评估了下这个微博自动定时刷屏软件，可以实现，方法跟你发的那个人的有区别。我先说一下，你看看是否合适，我的方法需要用电脑来刷：

1、首先安装谷歌浏览器，然后把我做到的插件程序安装上去（很简单）
2、然后用谷歌浏览器打开一个新浪微博网站并登陆，再打开插件，会出来一个面板，输入要发送的微博内容，也可以添加图片。设置时间间隔，就可以开始发送，如果不想发送了可以停止下来。

3、时间间隔不能太长，一般设置2分钟~5分钟。如果间隔太短，程序运行一段时间后，会冻结一段时间，不能发布新微博了。过一会才会解除冻结。

4、如果想频繁刷屏，又想避免被新浪微博冻结，可以同时多账户登陆发送微博，【登陆不同新浪微博账号】，那么可以用A、B、C三个微博账号，都可以同时来刷一条微博。发布时间间隔开， 这样就能较频繁的刷屏了

这是大概的估计，后面开发的话可能会有一些小的差别，但是上面的功能肯定是基本没问题的。我平时工作也比较忙，得抽出时间来做，现在开始做的话，大概5~7天能搞定。价钱的话是4000~6000这个区间,这个到时候你看着给就行。后面如果程序有问题了，我会一直帮着维护。


 */


var $sendBtn = $('#pub_btn'),
    $stopBtn = $('#stop_btn')

chrome.extension.onMessage.addListener(function(req, sender, sendRes) {
    console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension")

    console.log(req)
    sendRes({cmd: "from popup.js"})

    
})

function sendMessage(data, cb){
    chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.sendMessage(
            tab.id, 
            data, 
            cb
        )
    })
}

$sendBtn.click(function(evt){
    evt.preventDefault()
    evt.stopPropagation()

    sendMessage(
        {
            status: "success", 
            source: 'popup.js',
            rank: $('#wb_rank').val() || 1,//1默认个人
            text: $('.ui-panel-main .ui-txt').html().trim() || '#云门# 谢谢查看我的微博分享，云门内容分享 在羡慕身边做微营销淘到金的朋友吗？还在瞻前顾后犹豫不决吗？[威武]华佗面膜/卡凡/珂蜜丝/瑞贵人等多款朋友圈长期霸屏好评品牌。欢迎加入振威团队 @Cloud [江南style] 云门 ',
            time_delay: parseInt($('.ui-input').val()) || 1000*60*2,
            cmd: 'start'
        }, 
        function(res) {
            console.log(res)
        }
    )

})

$stopBtn.click(function(evt){
    evt.preventDefault()
    evt.stopPropagation()

    sendMessage(
        {
            status: "success", 
            source: 'popup.js',
            cmd: 'stop'
        }, 
        function(res) {
            console.log(res)
        }
    )

})


