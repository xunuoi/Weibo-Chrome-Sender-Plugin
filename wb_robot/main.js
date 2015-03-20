
var _G = window
var $btn_send,
    $wb_txt,
    cont,
    time_delay,
    tId

var _guidBase = {}

function initParams(){
    $btn_send = $('a[title="发布微博按钮"]')
    $wb_txt = $('textarea[title="微博输入框"]')

    cont = 'Empty Content'
    time_delay = 1000*60*2
    tId = null
}
function getGUID(forWhat){
    var curGUID = 'xxxxxxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(c){
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);  
    }).toUpperCase();

    if(typeof forWhat == 'string') {
        _guidBase[forWhat] = curGUID;
    }   
                         
    return curGUID;
}

function wrapContent(cont){
    return [cont, '  #', getGUID().slice(21,28), '# ', getCHTime() ].join('')
}
function getCHTime() { //get the Chinese-format time
    var now = new Date();
   
    var year = now.getFullYear();       //year
    var month = now.getMonth() + 1;     //month
    var day = now.getDate();            //day
   
    var hh = now.getHours();            //hour
    var mm = now.getMinutes();          //minute
   
    var clock = year + "-";             //clock the final time show
   
    if(month < 10){
       clock += "0";
     }
       clock += month + "-";
    
    if(day < 10){
       clock += "0";
      }   
      clock += day + " ";
    
    if(hh < 10){
      clock += "0";
     }   
      clock += hh + ":";
    
    if (mm < 10) {
      clock += '0'; 
    }
      clock += mm; 
    
    return(clock); 
}
function getCHDate(){
    return getCHTime().slice(0,10);
}

function wbPublic (_content, _time, _rank) {
    var time_d = _time || time_delay;
    console.log(content, time_d, _rank)

    tId = setInterval(function(){
        /**
         * debug
         */
        var content = wrapContent(_content || cont)
        
        // console.log(document.cookie)
        //=================
        
        $wb_txt.trigger('click')
        $wb_txt.focus()
        $wb_txt.val(content)
        $wb_txt.select()

        $btn_send.removeClass('W_btn_a_disable')
        $btn_send.trigger('click')
        //=============test ajax
        var __rnd_time = (new Date()).getTime()
        $.ajax({
            url: '/aj/mblog/add?ajwvr=6&__rnd='+__rnd_time,
            type: 'POST',
            data: {
                'location': 'v6_content_home',
                'appkey': '',
                'style_type': 1,
                'pic_id': '6bbb7eb1gw1eptv7gg77cj218a0zydmk',
                'text': content,
                'pdetail': '',
                'rank': _rank || 1, //0代表公开，1代表只给自己看
                'rankid': '',
                'module': 'stissue',
                'pub_type': 'dialog',
                '_t': 0
            }
        }).done(function(rs){
            console.log(rs) 
            if(rs.code == '100000'){
                console.log('发布成功')
            }else {
                console.log('发布失败，3分钟后重试')
                stopPublic()
                setTimeout(function(){
                    wbPublic (_content, _time, _rank)
                }, 1000*60*3)
            }
            
        }).fail(function(err){
            console.log(err)
        })
        
    }, time_d)

}
function stopPublic(){
    tId ? (clearInterval(tId), tId = null) : ''
}

// _G.wbPublic = wbPublic
// _G.stopPublic = stopPublic


setTimeout(function(){
    initParams()
    // wbPublic()

}, 3000)

//=======通信===
function sendMessage(data, cb){
    chrome.extension.sendMessage(data, cb)
}

chrome.extension.onMessage.addListener(function(req, sender, sendRes) {
    console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension")
    
    if(req && req.cmd ){
        if(req.cmd == 'start'){
            var content = req.text,
                time_d = req.time_delay,
                rank = req.rank

            console.log(content, time_d, rank)
            wbPublic(content, time_d, rank)

        }else if(req.cmd =='stop'){
            stopPublic()
        }else {
            sendRes({
                status: 'failed',
                message: 'Unknow cmd '+req.cmd
            })

            return 
        }
    }

    sendRes({
        status: 'succeed', 
        source: "from main.js"
    }) 
})

/*sendMessage({status: 'ready'}, function(res){
    console.log('++++*****', res);
})*/



