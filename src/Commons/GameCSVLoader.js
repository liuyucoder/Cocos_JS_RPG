/**
 * Created by yu.liu on 2015/11/5.
 */

//******************************************************* Data Provider
var GameDefaultDataProviders = {
    initOver: false,
    dataProviders: {},
    initDataProvider: function(url, data){
        var self = this;
        if(self.initOver){
            GameLog.w("initDataProviders() Finished.");
            return;
        }
        switch (url){
            case resCSV.CharInfo:
                GameLog.c("initDataProvider() Url=", url);
                self.dataProviders[resCSV.CharInfo] = "@Chars";
                break;
            case resCSV.BuildInfo:
                GameLog.c("initDataProvider() Url=", url);
                self.dataProviders[resCSV.BuildInfo] = "@Build";
                break;
            default :
                GameLog.w("initDataProvider() faild.   Url=", url);
                break;
        }

        var shouldFinish = true;
        for(var i in resCSV){
            if(!self.dataProviders[resCSV[i]])
            {
                shouldFinish =false;
                //GameLog.c("@@@@@@ ", resCSV[i]);
                break;
            }
        }
        self.initOver = shouldFinish;

        if(self.initOver)
        {
            CSV.releaseAll();
        }
    }
};

//******************************************************* CSV

var CSV = {
    cache: {},
    parse: function(url,data){
        var self = this;
        var loaderData = self.cache[url];
        if (loaderData)
        {
            GameLog.w("CSV.parse()  Reparse data. Url=", url);
        }
//        if (data === "")
//        {
//            GameLog.w("CSV.parse()  Data is Null. Url=", url);
//        }

        self.cache[url] = data;

        GameDefaultDataProviders.initDataProvider(url, data);
    },

    getData: function(url){
        var self = this;
        var loaderData = self.cache[url];
        if (!loaderData)
        {
            GameLog.w("CSV.getData()  Invalid Url=", url);
        }
        return loaderData;
    },

    release: function(url){
        var self = this;
        var loaderData = self.cache[url];
        if (!loaderData)
        {
            GameLog.w("CSV.release()  Invalid Url=", url);
            return;
        }

        //GameLog.c("CSV.release()  Url=", url);
        delete self.cache[url];
    },

    releaseAll: function(){
        var cache = this.cache;
        for (var key in cache)
            delete cache[key];

        //GameLog.c("CSV.releaseAll()");
    }
};

cc._csvLoader = {
    load : function(realUrl, url, res, cb){
        cc.loader.loadTxt(realUrl, function(err, txt){
            if(err)
                return cb(err);
            cb(null, txt);

            CSV.parse(url, txt);

            cc.loader.release(url);
        });
    }
};
cc.loader.register(["csv"], cc._csvLoader);
