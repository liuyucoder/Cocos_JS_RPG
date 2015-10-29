/**
 * Created by yu.liu on 2015/10/28.
 */

var g_OpenGameLog = true;

var GameLog = function(){
    this.flag = 0;
}

GameLog.c = function(){
    var bakLog = cc.log;
    if(g_OpenGameLog)
    {
        bakLog.call(this, "GameLog[Common] >>" + cc.formatStr.apply(cc, arguments));
    }
}

GameLog.w = function(){
    var bakLog = cc.log;
    if(g_OpenGameLog)
    {
        bakLog.call(this, "GameLog[Warning] >>" + cc.formatStr.apply(cc, arguments));
    }
}

GameLog.e = function(){
    var bakLog = cc.log;
    if(g_OpenGameLog)
    {
        bakLog.call(this, "GameLog[Error] >>" + cc.formatStr.apply(cc, arguments));
    }
}
