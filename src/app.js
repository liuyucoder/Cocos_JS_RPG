
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
//        var layer = new HelloWorldLayer();
//        this.addChild(layer);

        var size = cc.director.getWinSize();
        var GameObj = new GameCharacter_Test01();
        GameObj.x = size.width / 4;
        GameObj.y = size.height / 4;
        GameObj.init();
        this.addChild(GameObj);
    },

    _initLayer_Background: function(){
        GameLog.c("HelloWorldScene _initLayer_Background()");
    },

    _initLayer_GamePlay: function(){
        GameLog.c("HelloWorldScene _initLayer_GamePlay()");
    },

    _initLayer_PlayerInput: function(){
        GameLog.c("HelloWorldScene _initLayer_PlayerInput()");
    },

    _initLayer_UI: function(){
        GameLog.c("HelloWorldScene _initLayer_UI()");
    },

    _initLayer_Mask: function(){
        GameLog.c("HelloWorldScene _initLayer_Mask()");
    }
});

