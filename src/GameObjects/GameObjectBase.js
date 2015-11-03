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

var EGameObjectAnimIdx ={
    EGOAI_Idle: 0,
    EGOAI_Walk: 1,
    EGOAI_Attack1: 2,
    EGOAI_Attack2: 3,
    EGOAI_Victory: 9
};

var GameObjectBase = cc.Node.extend({
    _className: "GameObjectBase",


    /**
     * GameObject
     */
    _eGameObjectType: EGameObjectType.EGOT_Unknown,

    //
    _GameObjectID: -1,
    _GameObjectLvl: 0,
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
    _fDefaultGroundSpeed: 0,

    //
    _bTakeDamaged: false,
    _fDefaultHealth: 1000,
    _fCurrentHealth: 1000,

    /**
     * GameObject Draw information    Begin
     */
    _bRenderObjInfo: false,
    _renderObjInfo: function(HideAll){
    },
    _initRenderObjInfo: function(){
        this._initShadow();
        this._initFrameAnimSeqs();
        this._initBloodBar();
    },

    _sGameObjectName: "GameObjectName",

    _bDrawBloodBar: false,
    _BloodBar: null,
    _BloodBarBg: null,
    _BloodBarHeight: 20,
    _initBloodBar: function(){
    },
    drawBloodBar: function(bShow){
        if(this._BloodBarBg)
        {
            this._BloodBarBg.setVisible(bShow);
        }
    },
    _ObjShadow: null,
    _initShadow: function(){
    },
    _Vehicle: null,
    /**
     * GameObject Draw Information    End
     */

    /**
     * Resource file name rule:
     * GameObjeID + "_" + GameObjectLvl         eg.  "1_1"
     *
     * Animation res path:
     * GameObjeID + "_" + GameObjectLvl + "_" + AnimationID + "_"  _eGameObjectDirection + "_" + FrameIdx       eg.  "1_4_0_1_0"
     */

    /**
     * GameObject Animation Begin
     *
     */
    _bUseFrameAnimation: true,
    _sAnimResPath: "",
    _sAnimResName: "",
    _MyRootSpritePath: "",
    _MyRootSprite: null,
    _CurrentAction: null,

    _initFrameAnimSeqs: function(){
     },

    _finishFrameAnimSeqs: function(){
    },
    /**
     * GameObject Animation End
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
    ctor: function(){
        this._super();
        //GameLog.c("GameObjectBase ctor()");
    },

    /**
     * Initializes the instance of cc.Node
     * @function
     * @returns {boolean} Whether the initialization was successful.
     */
    init: function () {
        //GameLog.c("GameObjectBase init()");
        this._initRenderObjInfo();

        return true;
    }
})
