/**
 * Created by yu.liu on 2015/11/5.
 */

//******************************************************* Data Provider
//! character data struct
var CharDataStruct = {
    CharID: 0,
    CharName: "",
    CharaLevel: 1
};

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
                self.dataProviders[resCSV.CharInfo] = self._csvDataParse(data, self._charDataParse, url);
                break;
            case resCSV.BuildInfo:
                self.dataProviders[resCSV.BuildInfo] = self._csvDataParse(data, self._buildDataParse, url);
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
//                GameLog.c("#### %s #### Begin", i);
//                var arr1 = self.dataProviders[i].keys();
//                for(var m= 0; m < arr1.length; m++){
//                    GameLog.c("#### ID=%s  ", arr1[m]);
//                    var dataGroup = self.dataProviders[i].get(arr1[m]);
//                    var arr2 = dataGroup.keys();
//                    for(var n = 0; n < arr2.length; n++)
//                    {
//                        GameLog.c("## Lvl=%s  Data=%s", arr2[n], dataGroup.get(arr2[n]));
//                    }
//                }
//                GameLog.c("#### %s #### End", i);
//            }
        }
    },

    _csvDataParse: function(data, optionF, url){
        var targetStr = "\r\n";
        var targetStr1 = ",";
        var startIdx = -1;
        var dataIdx = -1;
        var dataTaker = [];
        var dataGroup = [];

        var dataID = -1;
        var dataLvl = -1;
        var dataMap = new Map();

        //! remove first line
        startIdx = data.toString().trim().indexOf(targetStr);
        data = data.substring(startIdx + targetStr.length, data.length);

        while(data !== ""){
            var dataStr = "";
            startIdx = data.toString().indexOf(targetStr);
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
            //! Index 0 is ID, Index 1 is Lvl
            dataID = dataLine[0];
            dataLvl = dataLine[1];
            if(dataMap.containsKey(dataID))
            {
                if(dataMap.get(dataID).containsKey(dataLvl))
                {
                    GameLog.w("_csvDataParse()  Parse the same Level data.  URL=%s, ID=%s, Level=%s", url, dataID, dataLvl);
                }
                else
                {
                    dataMap.get(dataID).put(dataLvl, dataLine);
                }
            }
            else
            {
                var dataGroupMap = new Map();
                dataGroupMap.put(dataLvl, dataLine);
                dataMap.put(dataID, dataGroupMap);
            }
        }

        return dataMap;
    },

    _charDataParse: function(datas){
        //GameLog.c("##### _charDataParse()");
        return datas;
    },

    _buildDataParse: function(datas){
        //GameLog.c("##### _buildDataParse()");
        return datas;
    },

    //! Interface
    getCharDataByName: function(CharName){
    },
    getCharDataByID: function(CharID){
//            for(var i in self.dataProviders)
//            {
//                GameLog.c("#### %s #### Begin", i);
//                var arr1 = self.dataProviders[i].keys();
//                for(var m= 0; m < arr1.length; m++){
//                    GameLog.c("#### ID=%s  ", arr1[m]);
//                    var dataGroup = self.dataProviders[i].get(arr1[m]);
//                    var arr2 = dataGroup.keys();
//                    for(var n = 0; n < arr2.length; n++)
//                    {
//                        GameLog.c("## Lvl=%s  Data=%s", arr2[n], dataGroup.get(arr2[n]));
//                    }
//                }
//                GameLog.c("#### %s #### End", i);
//            }
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
