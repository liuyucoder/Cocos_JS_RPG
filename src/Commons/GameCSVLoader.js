/**
 * Created by yu.liu on 2015/11/5.
 */

//******************************************************* Data Provider
//! character data struct
var CharDataStruct = {
    sClassName: 0,
    iID: 1,
    iLevel: 2,
    bBase: 3,
    sResPng: 4,
    sResPList: 5,
    sAnimResPrefix: 6,
    fSpriteOffsetX: 7,
    fSpriteOffsetY: 8,
    sLocName: 9,
    fDefaultHP: 10,
    bFlyUnit: 11,
    fDefaultGroundSpeed: 12,
    fDefaultAirSpeed:13

//    iGoldNeed: 4,
//    iFoodNeed: 5,
//    iSoulNeed: 6,
//    fTrainingTime: 7,
//    iDependBuilding1_ID: 8,
//    iDependBuilding1_Lvl: 9,
//    iDependBuilding2_ID: 10,
//    iDependBuilding2_Lvl: 11,
//    iHouseSpace: 12,
//    iHitPoints: 13,
//    fAttackSpeed: 14,
//    fWalkSpeed: 15,
//    fResDamage: 16,
//    fDamage: 17,
//    fDamage2: 18,
//    fWallDamage: 19,
//    bFlying: 20,
//    bRemote: 21,
//    fOffsetX: 22,
//    fOffsetY: 21,
//    bAttackAirTarget: 22,
//    bAttackGroundTarget: 23,
//    iPreferAttackBuildingID: 24,
//    iUpgradeNeedFood: 25,
//    fAttackRangeMin: 26,
//    fAttackRangeMax: 27,
//    fDefaultHP: 28,
//    sMoveEffect: 29,
};

//! character animation data struct
var CharAnimDataStruct = {
    sPrefixName: 0,
    sActionType: 1,
    bWithDir: 2,
    iDefaultDir: 3,
    iFrameNum: 4,
    fFrameInterval: 5,
    iLoop: 6,
    iFileNum: 7,
    iMulAnim: 8,
    iEffectFrame: 9,
    iOwnerID: 10
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
                self.dataProviders[resCSV.CharInfo] = self._csvGameObjDataParse(data, self._charDataParse, url);
                break;
            case resCSV.BuildInfo:
                self.dataProviders[resCSV.BuildInfo] = self._csvGameObjDataParse(data, self._buildDataParse, url);
                break;
            case resCSV.AnimInfo:
                self.dataProviders[resCSV.AnimInfo] = self._csvAnimDataParse(data, self._animDataParse, url);
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
        }
    },

    //******************************************************* Game Object Data
    _csvGameObjDataParse: function(data, optionF, url){
        var targetStr = "\r\n";
        var targetStr1 = ",";
        var startIdx = -1;
        var dataIdx = -1;

        var dataClassName = "";
        var dataID = -1;
        var dataLvl = -1;
        var dataMapByID = new Map();
        var dataMapByClassName = new Map();

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
            if(dataLine === null){
                continue;
            }
            //! Index 0 is Class Name
            //! Index 1 is ID
            //! Index 2 is Level
            dataClassName = dataLine[0];
            dataID = dataLine[1];
            dataLvl = dataLine[2];

            //! Insert ID Map by class name
            if(!dataMapByClassName.containsKey(dataClassName))
                dataMapByClassName.put(dataClassName, dataID);

            //! Insert Data Map by ID
            if(dataMapByID.containsKey(dataID)){
                if(dataMapByID.get(dataID).containsKey(dataLvl)){
                    GameLog.w("_csvGameObjDataParse()  Parse the same Level data.  URL=%s, ID=%s, Level=%s", url, dataID, dataLvl);
                }
                else{
                    dataMapByID.get(dataID).put(dataLvl, dataLine);
                }
            }
            else{
                var dataGroupMap = new Map();
                dataGroupMap.put(dataLvl, dataLine);
                dataMapByID.put(dataID, dataGroupMap);
            }
        }

        var dataTaker = {};
        dataTaker.dataMapByClassName = dataMapByClassName;
        dataTaker.dataMapByID = dataMapByID;

        return dataTaker;
    },

    _charDataParse: function(datas){
        for(var i in CharDataStruct){
            if(CharDataStruct[i] >= datas.length){
                GameLog.w("### _charDataParse()  Character Data do not match CharDataStruct.    ClassName=%s", datas[0]);
                return null;
            }

            switch (CharDataStruct[i]){
//                case CharDataStruct.sClassName:
//                case CharDataStruct.sAnimResPrefix:
//                case CharDataStruct.sResPng:
//                case CharDataStruct.sResPList:
//                case CharDataStruct.sLocName:
                case CharDataStruct.bBase:
                case CharDataStruct.bFlyUnit:
                    datas[CharDataStruct[i]] = Boolean(datas[CharDataStruct[i]]);
                    break;
                case CharDataStruct.iID:
                case CharDataStruct.iLevel:
                    datas[CharDataStruct[i]] = parseInt(datas[CharDataStruct[i]]);
                    break;
                case CharDataStruct.fSpriteOffsetX:
                case CharDataStruct.fSpriteOffsetY:
                case CharDataStruct.fDefaultHP:
                case CharDataStruct.fDefaultGroundSpeed:
                case CharDataStruct.fDefaultAirSpeed:
                    datas[CharDataStruct[i]] = parseFloat(datas[CharDataStruct[i]]);
                    break;
            }
        }

        return datas;
    },

    _buildDataParse: function(datas){
        //GameLog.c("##### _buildDataParse()");
        return datas;
    },

    //! Interface
    getCharIDByClassName: function(ClassName){
        var self = this;
        return self._getIDByClassName(resCSV.CharInfo, ClassName);
    },

    getCharDataByClassName: function(CharName){
       var self = this;
       return self._getDataByClassName(resCSV.CharInfo, CharName);
    },

    getCharDataByID: function(CharID){
        var self = this;
        return self._getDataByID(resCSV.CharInfo, CharID);
    },

    getBuildIDByClassName: function(ClassName){
        var self = this;
        return self._getIDByClassName(resCSV.BuildInfo, ClassName);
    },

    getBuildDataByClassName: function(BuildName){
        var self = this;
        return self._getDataByClassName(resCSV.BuildInfo, BuildName);
    },

    getBuildDataByID: function(BuildID){
        var self = this;
        return self._getDataByID(resCSV.BuildInfo, BuildID);
    },


    _getIDByClassName: function(DataProviderType, ClassName){
        var self = this;
        var res = INDEX_NONE;
        if(self.dataProviders[DataProviderType].dataMapByClassName.containsKey(ClassName))
        {
            res = self.dataProviders[DataProviderType].dataMapByClassName.get(ClassName);
        }
        if(res === INDEX_NONE)
            GameLog.w("###  _getIDByClassName() failed.  DataProviderType=%s ClassName=%s", DataProviderType, ClassName);

        return res;
    },

    //******************************************************* Animaction Data
    _csvAnimDataParse: function(data, optionF, url){
        var targetStr = "\r\n";
        var targetStr1 = ",";
        var startIdx = -1;
        var dataIdx = -1;

        var animPrefixName = "";
        var animActionName = "";
        var animDataMapByPrefixName = new Map();

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
            if(dataLine === null){
                continue;
            }
            //! Index 0 is Animation Prefix Name
            //! Index 1 is Animation Action Tpye
            animPrefixName = dataLine[0];
            animActionName = dataLine[1];

            //! Insert Data Map by Animation Prefix Name
            if(animDataMapByPrefixName.containsKey(animPrefixName)){
                if(animDataMapByPrefixName.get(animPrefixName).containsKey(animActionName)){
                    GameLog.w("_csvAnimDataParse()  Parse the same Action data.  URL=%s, AnimPrefixName=%s, ActionName=%s", url, animPrefixName, animActionName);
                }
                else{
                    animDataMapByPrefixName.get(animPrefixName).put(animActionName, dataLine);
                }
            }
            else{
                var dataGroupMap = new Map();
                dataGroupMap.put(animActionName, dataLine);
                animDataMapByPrefixName.put(animPrefixName, dataGroupMap);
            }
        }

        var dataTaker = {};
        dataTaker.dataMapByID = animDataMapByPrefixName;

        return dataTaker;
    },

    _animDataParse: function(datas){
        for(var i in CharAnimDataStruct){
            if(CharAnimDataStruct[i] >= datas.length){
                GameLog.w("### _animDataParse()  Animation Data do not match CharAnimDataStruct.    AnimPrefixName=%s", datas[0], CharAnimDataStruct[i], datas.length);
                return null;
            }

            switch (CharAnimDataStruct[i]){
                case CharAnimDataStruct.bWithDir:
                    datas[CharAnimDataStruct[i]] = !Boolean(datas[CharAnimDataStruct[i]]);
                    break;
                case CharAnimDataStruct.iDefaultDir:
                case CharAnimDataStruct.iFrameNum:
                case CharAnimDataStruct.iLoop:
                case CharAnimDataStruct.iFileNum:
                case CharAnimDataStruct.iMulAnim:
                case CharAnimDataStruct.iEffectFrame:
                case CharAnimDataStruct.iOwnerID:
                    datas[CharAnimDataStruct[i]] = parseInt(datas[CharAnimDataStruct[i]]);
                    break;
                case CharAnimDataStruct.fFrameInterval:
                    datas[CharAnimDataStruct[i]] = parseFloat(datas[CharAnimDataStruct[i]]);
                    break;
            }
        }

        return datas;
    },

    getAnimDataByPrefix: function(PrefixName){
        var self = this;
        return self._getDataByID(resCSV.AnimInfo, PrefixName);
    },

    _getDataByClassName: function(DataProviderType, ClassName){
        var self = this;
        var res = null;

        if(self.dataProviders[DataProviderType].dataMapByClassName.containsKey(ClassName))
        {
            var id = self.dataProviders[DataProviderType].dataMapByClassName.get(ClassName);
            res = self._getDataByID(DataProviderType, id);
        }

        if(res === null)
            GameLog.w("###  _getDataByClassName() failed.  DataProviderType=%s ClassName=%s", DataProviderType, ClassName);

        return res;
    },

    _getDataByID: function(DataProviderType, ID){
        var self = this;
        var res = null;
        if(self.dataProviders[DataProviderType].dataMapByID.containsKey(ID))
        {
            res = self.dataProviders[DataProviderType].dataMapByID.get(ID);
        }

        if(res === null)
            GameLog.w("###  _getDataByID() failed.  DataProviderType=%s  ID=%s", DataProviderType, ID);

        return res;
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
