
var HelloWorldLayer = GameLayerBase.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

        var mainscene = ccs.load(res.MainScene_json);
        this.addChild(mainscene.node);

        return true;
    }
});

var HelloWorldScene = GameSceneBase.extend({
    onEnter:function () {
        this._super();
    },

    _initLayer_Background: function(){
        var bgSprite = new cc.Sprite(res.TempBg);
        if(bgSprite){
            var size = cc.director.getWinSize();
            bgSprite.setPosition(cc.p(size.width / 2, size.height / 2));
            return bgSprite;
        }

        return null;
    },

    _initLayer_GamePlay: function(){
        this._Heroes = new Array();
        var gp = new cc.Layer();
        return gp;
    },

    _initLayer_PlayerInput: function(){
        var inputLayer = new GameLayer_InputTest();
        return inputLayer;
    },

    _initLayer_UI: function(){
        //GameLog.c("HelloWorldScene _initLayer_UI()");
    },

    _initLayer_Mask: function(){
        //GameLog.c("HelloWorldScene _initLayer_Mask()");
    },

    _createRoles: function(){
        this._super();

        if(this._layerGamePlay){
            var size = cc.director.getWinSize();
            var hero01 = new GameChar_InfantryMan(5);
            hero01.x = size.width / 4;
            hero01.y = size.height / 2;
            this._layerGamePlay.addChild(hero01);

            var hero02 = new GameChar_Archer(5);
            hero02.x = size.width / 4 * 2;
            hero02.y = size.height / 2;
            this._layerGamePlay.addChild(hero02);

            var hero03 = new GameChar_Sorcerer(5);
            hero03.x = size.width / 4 * 3;
            hero03.y = size.height / 2;
            this._layerGamePlay.addChild(hero03);

            var hero04 = new GameChar_MediEvil(5);
            hero04.x = size.width / 4 * 4;
            hero04.y = size.height / 2;
            this._layerGamePlay.addChild(hero04);

            this._Heroes.push(hero01);
            this._Heroes.push(hero02);
            this._Heroes.push(hero03);
            this._Heroes.push(hero04);
        }
    }
});

