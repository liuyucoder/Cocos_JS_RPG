/**
 * Created by yu.liu on 2015/10/28.
 */

var EGameObjectType = {
    EGOT_Building: 0,
    EGOT_Character:1,
    EGOT_Unknown: 2
};

var ETeamNum = {
    ETT_0: 0,
    ETT_1: 1,
    ETT_Unknown: 2
};

var EGameObjectState = {
    EGOS_Idle: 0,
    EGOS_Walk: 1,
    EGOS_RoadieRun: 2,
    EGOS_DBNO: 3,
    EGOS_Dying: 4
};

var EGameObjectDirection = {
    EGOD_Down: 0,
    EGOD_RightDown: 1,
    EGOD_Right: 2,
    EGOD_RightTop: 3,
    EGOD_Top: 4,
    EGOD_LeftTop: 5,
    EGOD_Left: 6,
    EGOD_LeftDown: 7
};

var EResDirectionId = {
    ERDI_Down: 1,
    ERDI_Right: 2,
    ERDI_Top: 3
};

//var EGameObjectActionType ={
//    EGOAT_Idle: 0,
//    EGOAT_Walk: 1,
//    EGOAT_Attack1: 2,
//    EGOAT_Attack2: 3,
//    EGOAT_Victory: 9
//};


var EGameObjectActionType ={
    idle: 0,
    walk: 1,
    attack: 2,
    attack2: 3,
    victory: 9
};

var GameObjectBase = cc.Node.extend({
    _className: "GameObjectBase",

    /**
     * ===================  GameObject Default Data  ===================
     */
    _GameObjLocName: "",
    _GameObjectID: -1,
    _GameObjectLvl: 1,
    _bBase: false,
    _GameObjectLvlMax: 0,
    _sAnimResPrefix: "",
    _fSpriteOffsetX: 0,
    _fSpriteOffsetY: 0,
    _MyRootSpritePath: "",
    _fDefaultHealth: 1,
    _bAirUnit: false,
    _fDefaultGroundSpeed: 0,
    _fDefaultAirSpeed: 0,

    /**
     * GameObject
     */
    _eGameObjectType: EGameObjectType.EGOT_Unknown,

    //
    _iDefaultLvl: -1,
    _eGameObjectDirection: EGameObjectDirection.EGOD_Down,
    _eTeamNum: ETeamNum.ETT_Unknown,
    _bPlayer: false,
    _bNPC: false,

    //
    _eGameObjState: EGameObjectState.EGOS_Idle,

    //
    _bCanRoadieRun: false,
    _bCanBeForcedToRoadieRun: false,// if designer tells us to, we can roadie run (e.g. for guys we don't want roadie running normally, but their skeleton supports it)
    _bCanBlindFire: false,

    //
    _bTakeDamaged: false,
    _fCurrentHealth: 0,

    //
    _bRenderObjInfo: false,
    _bDrawHPBar: false,
    _HPBar: null,
    _HPBg: null,
    _HPBarHeight: 20,
    _ObjShadow: null,
    //
    _Vehicle: null,

    //
    _bUseFrameAnimation: true,
    _MyRootSprite: null,
    _CurrentAction: null,

    levelUp: function(NewLvl){
        var newLevel = -1;
        if(NewLvl === undefined){
            newLevel = this._GameObjectLvl + 1;
        }
        else{
            newLevel = NewLvl;
        }

        if(newLevel > this._GameObjectLvlMax || newLevel <= this._GameObjectLvl){
            GameLog.w("levelUp()  failed.  Level up to Lvl_%s failed.  New Level is unvalid.  (ClassName=%s)", newLevel, this._className);
            return false;
        }

        this._GameObjectLvl = newLevel;

        this._refreshDefaultData();
        this._initRenderObjInfo();
        return true;
    },

    /**
     * ===================  Draw information function  ===================Begin
     */
    _renderObjInfo: function(HideAll){
    },

    _initRenderObjInfo: function(){
        this._initShadow();
        this._initFrameAnimSeqs();
        this._initHPBar();
    },

    _initHPBar: function(){
    },

    drawBloodBar: function(bShow){
        if(this._HPBg)
        {
            this._HPBg.setVisible(bShow);
        }
    },

    _initShadow: function(){
    },
    /**
     * ====================================================================End
     */

    /**
     * ==========================  Animation  =============================Begin
     */

    /**
     * Resource file name rule:
     * GameObjeID + "_" + GameObjectLvl         eg.  "1_1"
     *
     * Animation res path:
     * GameObjeID + "_" + GameObjectLvl + "_" + AnimationID + "_"  _eGameObjectDirection + "_" + FrameIdx       eg.  "1_4_0_1_0"
     */

    _initFrameAnimSeqs: function(){
     },

    _finishFrameAnimSeqs: function(){
    },
    /**
     * ====================================================================End
     */


    canTakeDamage: function(){
        return this._bTakeDamaged;
    },

    takeDamaged: function(Damage){
        return Damage;
    },

    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
     * @function
     */
    ctor: function(defLvl){
        if(defLvl !== undefined){
            this._iDefaultLvl = defLvl;
        }

        this._super();

        //! 1: Load data from csv
        if(this._initDefaultData()){
            //! 2: Init Render Info
            this._initRenderObjInfo();
        }
        else{
            GameLog.w("GameObjectBase::_initDefaultData() failed.   className=%s", this._className);
        }
    },

    _initDefaultData: function(){
        GameLog.c("GameObjectBase::_initDefaultData()");
        return false;
    },

    _refreshDefaultData: function(){

    },

    _refreshAnimOffset: function(){

    },

    /**
     * Initializes the instance of cc.Node
     * @function
     * @returns {boolean} Whether the initialization was successful.
     */
    init: function () {
        GameLog.c("GameObjectBase::init()");
        return true;
    }
})
