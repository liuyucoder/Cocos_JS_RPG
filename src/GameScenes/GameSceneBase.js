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

    _GameInfo: null,
    _PlayerInfo: null,

    _layerBg: null,
    _layerGamePlay: null,
    _layerInput: null,
    _layerUI: null,
    _layerMask: null,

    _initGameSceneLayers: function(){
        this._initLayer_Background();
        this._initLayer_GamePlay();
        this._initLayer_PlayerInput();
        this._initLayer_UI();
        this._initLayer_Mask();
    },

    _initGameInfo: function(){
        GameLog.c("GameSceneBase _initGameInfo()");
    },

    _initPlayerInfo: function(){
        GameLog.c("GameSceneBase _initPlayerInfo()");
    },

    _initLayer_Background: function(){
        GameLog.c("GameSceneBase _initLayer_Background()");
    },

    _initLayer_GamePlay: function(){
        GameLog.c("GameSceneBase _initLayer_GamePlay()");
    },

    _initLayer_PlayerInput: function(){
        GameLog.c("GameSceneBase _initLayer_PlayerInput()");
    },

    _initLayer_UI: function(){
        GameLog.c("GameSceneBase _initLayer_UI()");
    },

    _initLayer_Mask: function(){
        GameLog.c("GameSceneBase _initLayer_Mask()");
    }

})
