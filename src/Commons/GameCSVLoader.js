/**
 * Created by yu.liu on 2015/11/5.
 */

//******************************************************* Data Provider
//! character data struct
//var CharDataStruct = {
//    CharID: 0,
//    CharName: "",
//    CharaLevel: 1
//};

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
                self.dataProviders[resCSV.CharInfo] = self._csvDataParse(data, self._charDataParse);
                break;
            case resCSV.BuildInfo:
                self.dataProviders[resCSV.BuildInfo] = self._csvDataParse(data, self._buildDataParse);
                break;
            default :
                GameLog.w("initDataProvider() faild.   Url=", url);
                break;
        }

        var shouldFinish = true;
        for(var i in resCSV){
            if(!self.dataProviders[resCSV[i]])
            {
                shouldFinish = false;
                break;
            }
        }
        self.initOver = shouldFinish;

        if(self.initOver)
        {
            CSV.releaseAll();

            //! test code
//            for(var i in self.dataProviders)
//            {
//                //GameLog.c("@@@1", self.dataProviders[i]);
//                for(var j in self.dataProviders[i])
//                {
//                    GameLog.c("@@@2", self.dataProviders[i][j]);
//                    for(var m in self.dataProviders[i][j])
//                    {
//                        GameLog.c("@@@3", self.dataProviders[i][j]);
//                        GameLog.c("@@@3", self.dataProviders[i][j][m]);
//                        for(var n in self.dataProviders[i][j][m])
//                        {
//                            GameLog.c("@@@4", self.dataProviders[i][j][m][n]);
//                        }
//                    }
//                }
//            }
        }
    },

    _csvDataParse: function(data, optionF){
        var targetStr = "\r\n";
        var targetStr1 = ",";
        var startIdx = -1;
        var dataIdx = -1;
        var dataTaker = [];
        var dataGroup = [];

        //! remove first line
        startIdx = data.toString().trim().indexOf(targetStr);
        data = data.substring(startIdx + targetStr.length, data.length);

        while(data !== ""){
            var dataStr = "";
            startIdx = data.toString().indexOf(targetStr);
            //GameLog.c("@@@", data);
            if(startIdx !== -1){
                dataStr = data.substring(0, startIdx);
                data = data.substring(startIdx + targetStr.length, data.length);
            }else{
                dataStr = data;
                data = "";
            }

            //! parse line datas
            var datas = [];
            var dataValue = "";
            do{
                dataIdx = dataStr.indexOf(targetStr1);
                if(dataIdx != -1){
                    dataValue = dataStr.substring(0, dataIdx);
                    dataStr = dataStr.substring(dataIdx + targetStr1.length, dataStr.length);
                }
                else{
                    dataValue = dataStr;
                    dataStr = "";
                }
                datas.push(dataValue);
            }while(dataStr.length !== 0);

            var dataLine = optionF(datas);
            if(dataGroup.length <= 0 || dataGroup[0][0] == dataLine[0]){
                dataGroup.push(dataLine);
                if(data === "")
                {
                    dataTaker.push(dataGroup);
                    GameLog.c("@@@1",dataGroup);
                    dataGroup = [];
                }
            }else{
                dataTaker.push(dataGroup);
                GameLog.c("@@@2",dataGroup);
                dataGroup = [];
                dataGroup.push(dataLine);
            }
        }

        return dataTaker;
    },

    _charDataParse: function(datas){
        //GameLog.c("##### _charDataParse()");
        return datas;
    },

    _buildDataParse: function(datas){
        //GameLog.c("##### _buildDataParse()");
        return datas;
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

        GameLog.c("CSV.releaseAll()");
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
