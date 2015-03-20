(function(_G){

var btn_send = $('a[title="发布微博按钮"]'),
    wb_txt = $('textarea[title="微博输入框"]'),
    cont = 'Hello ,Weclome here',
    time_delay = 5000,
    tId = null

var _guidBase = {}
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
    return getGUID().slice(0,7)+cont+getGUID().slice(21,28)
}
function wbPublic (_content, _time) {
    var content = _content || cont,
        content = wrapContent(content),
        time_delay = _time || time_delay

    console.log(time_delay, content)

    tId = setTimeout(function(){
        
        wb_txt.click()
        wb_txt.focus()
        wb_txt.value = content
        wb_txt.select()

        btn_send.classList.remove('W_btn_a_disable')
        btn_send.click()
        
    }, time_delay)
}
function stopPublic(){
    tId ? clearInterval(tId) : ''
}

_G.wbPublic = wbPublic
_G.stopPublic = stopPublic

})(window)
