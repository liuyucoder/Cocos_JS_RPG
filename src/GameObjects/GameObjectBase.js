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
    EGOD_Top: 0,
    EGOD_LeftTop: 1,
    EGOD_RightTop: 2,
    EGOD_Left: 3,
    EGOD_Right: 4,
    EGOD_LeftDown: 5,
    EGOD_RightDown: 6
};


var GameObjectBase = cc.Node.extend({
    _className: "GameObjectBase",


    /**
     * GameObject
     */
    _eGameObjectType: EGameObjectType.EGOT_Unknown,

    //
    _eGameObjectDirection: EGameObjectDirection.EGOD_Top,
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
    _bDrawInfo: false,
    _sGameObjectName: "GameObjectName",

    _bDrawBloodBar: false,
    _BloodBar: null,
    _BloodBarBg: null,
    _BloodBarHeight: 20,
    drawBloodBar: function(){

    },
    _ObjShadow: null,
    _Vehicle: null,
    /**
     * GameObject Draw Information    End
     */


    /**
     * GameObject Animation Begin
     */
    _sAnimResPath: "",

    _initFrameAnimSeqs: function(){
        var self = this;

        if(this._sAnimResPath == "")
        {
            return;
        }

        self._AnimFrameSeq_Idle = [];
        self._AnimFrameSeq_Move = [];
        self._AnimFrameSeq_RoadieRun = [];
        self._AnimFrameSeq_Death = [];

        for (var i in EGameObjectDirection) {
            self._AnimFrameSeq_Idle.push(this._createFrameAnimSeqIdle(EGameObjectDirection[i]));
            self._AnimFrameSeq_Move.push(this._createFrameAnimSeqMove(EGameObjectDirection[i]));
            self._AnimFrameSeq_RoadieRun.push(this._createFrameAnimSeqRoadieRun(EGameObjectDirection[i]));
            self._AnimFrameSeq_Death.push(this._createFrameAnimSeqDeath(EGameObjectDirection[i]));
        }
     },

    _createFrameAnimSeqIdle: function(Dir){
        GameLog.c("createFrameAnimSeqIdle() Dir=", Dir);
        return Dir;
    },

    _createFrameAnimSeqMove: function(Dir){
        GameLog.c("createFrameAnimSeqMove() Dir=", Dir);
        return Dir;
    },

    _createFrameAnimSeqRoadieRun: function(Dir){
        GameLog.c("createFrameAnimSeqRoadieRun() Dir=", Dir);
        return Dir;
    },

    _createFrameAnimSeqDeath: function(Dir){
        GameLog.c("createFrameAnimSeqDeath() Dir=", Dir);
        return Dir;
    },
    /**
     * GameObject Animation End
     */



    canTakeDamage: function(){
        return this._bTakeDamaged;
    },

    takeDamaged: function(Damage){

    },



    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
     * @function
     */
    ctor: function(){
        GameLog.c("GameObjectBase ctor()");
        this._super();
    },

    /**
     * Initializes the instance of cc.Node
     * @function
     * @returns {boolean} Whether the initialization was successful.
     */
    init: function () {
        GameLog.c("GameObjectBase init()");
        this._initFrameAnimSeqs();
        return true;
    }
})
