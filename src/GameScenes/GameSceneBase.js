/**
 * Created by yu.liu on 2015/10/28.
 */

var EGameStatus = {
    EGS_None: 0,
    EGS_WaitingForHost: 1,
    EGS_PreMatch: 2,
    EGS_BeginMatch: 3,
    EGS_RoundInProgress: 4,
    EGS_RoundOver: 5,
    EGS_EndMatch: 6,
    EGS_Loading: 7
};

var GameSceneBase = cc.Scene.extend({
    _className: "GameSceneBase",
    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
     * @function
     */
    ctor: function(){
        this._super();
    },

    onEnter: function(){
        this._super();

        this._initGameSceneLayers();
    },

    _roundTime: 10,
    _roundCount: 5,
    _roundDuration: 20,
    _roundEndTime: 5,

    _gameStatus: EGameStatus.EGS_None,
    _setGameStatus: function(NewStatus){
        this._gameStatus = NewStatus;

        switch (this._gameStatus){
            case EGameStatus.EGS_None:
                break;
            case EGameStatus.EGS_WaitingForHost:
                break;
            case EGameStatus.EGS_PreMatch:
                break;
            case EGameStatus.EGS_BeginMatch:
                break;
            case EGameStatus.EGS_RoundInProgress:
                break;
            case EGameStatus.EGS_RoundOver:
                break;
            case EGameStatus.EGS_EndMatch:
                break;
            case EGameStatus.EGS_Loading:
                break;
            default :
                break;
        }
    },

    _SelectedGameObj: null,
    onSelectedObj: function(obj, loc){
        loc = this.convertToNodeSpace(loc);
        if(obj){
            if(obj instanceof GameObjectBase){
                this._SelectedGameObj = obj;
                this._SelectedGameObj.onSelected(true);
            }
        }
        else{
            if(this._SelectedGameObj){
                this._SelectedGameObj.onSelected(false);
                if(this.canReachThePt(loc)){
                    this._SelectedGameObj.moveTo(loc);
                }
                this._SelectedGameObj = null;
            }
        }
    },
    canReachThePt: function(pt){
        return true;
    },

    _GameInfo: null,
    _PlayerInfo: null,
    _Heroes: null,

    _layerBg: null,
    _layerGamePlay: null,
    _layerInput: null,
    _layerUI: null,
    _layerMask: null,

    _initGameSceneLayers: function(){
        this._layerBg = this._initLayer_Background();
        if(this._layerBg){
            this.addChild(this._layerBg);
        }
        this._layerGamePlay = this._initLayer_GamePlay();
        if(this._layerGamePlay){
            this.addChild(this._layerGamePlay);
        }
        this._layerInput = this._initLayer_PlayerInput();
        if(this._layerInput){
            this.addChild(this._layerInput);
        }
        this._layerUI = this._initLayer_UI();
        if(this._layerUI){
            this.addChild(this._layerUI);
        }
        this._layerMask = this._initLayer_Mask();
        if(this._layerMask){
            this.addChild(this._layerMask);
        }

        this._initLayersFinish();
    },

    _initGameInfo: function(){
        GameLog.c("GameSceneBase _initGameInfo()");
    },

    _initPlayerInfo: function(){
        GameLog.c("GameSceneBase _initPlayerInfo()");
    },

    _initLayer_Background: function(){
        GameLog.c("GameSceneBase _initLayer_Background()");
        return null;
    },

    _initLayer_GamePlay: function(){
        GameLog.c("GameSceneBase _initLayer_GamePlay()");
        return null;
    },

    _initLayer_PlayerInput: function(){
        GameLog.c("GameSceneBase _initLayer_PlayerInput()");
        return null;
    },

    _initLayer_UI: function(){
        GameLog.c("GameSceneBase _initLayer_UI()");
        return null;
    },

    _initLayer_Mask: function(){
        GameLog.c("GameSceneBase _initLayer_Mask()");
        return null;
    },


    _createRoles: function(){
        GameLog.c("GameSceneBase _createRoles()");
    },

    getRoles: function(){
        return this._Heroes;
    },

    _initLayersFinish: function(){
        if(this._layerBg == null){
            GameLog.w("### _layerBg is null");
        }
        if(this._layerGamePlay == null){
            GameLog.w("### _layerGamePlay is null");
        }
        if(this._layerInput == null){
            GameLog.w("### _layerInput is null");
        }
        if(this._layerUI == null){
            GameLog.w("### _layerUI is null");
        }
        if(this._layerMask == null){
            GameLog.w("### _layerMask is null");
        }

        GameLog.c("GameSceneBase _initLayersFinish()");

        this._createRoles();
    },

    gameSceneBaseTestFun: function(){
        GameLog.c("***********");
    }
})
