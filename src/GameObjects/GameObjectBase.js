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
    _bDrawInfo: false,
    _sGameObjectName: "GameObjectName",

    _bDrawBloodBar: false,
    _BloodBar: null,
    _BloodBarBg: null,
    _BloodBarHeight: 20,
    drawBloodBar: function(){
        return false;
    },
    _ObjShadow: null,
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

    _createFrameAnimSeq: function(AnimIdx, FrameNum, AnimTime, SpecialAnimBinding, bRestoreOriginalFrame){
        var animationBinding = (SpecialAnimBinding == null ? [] : SpecialAnimBinding);
        if(SpecialAnimBinding == null){
            animationBinding[EGameObjectDirection.EGOD_Down] = EResDirectionId.ERDI_Down;
            animationBinding[EGameObjectDirection.EGOD_RightDown] = EResDirectionId.ERDI_Down;
            animationBinding[EGameObjectDirection.EGOD_Right] = EResDirectionId.ERDI_Right;
            animationBinding[EGameObjectDirection.EGOD_RightTop] = EResDirectionId.ERDI_Top;
            animationBinding[EGameObjectDirection.EGOD_Top] = EResDirectionId.ERDI_Top;
            animationBinding[EGameObjectDirection.EGOD_LeftTop] = EResDirectionId.ERDI_Top;
            animationBinding[EGameObjectDirection.EGOD_Left] = EResDirectionId.ERDI_Right;
            animationBinding[EGameObjectDirection.EGOD_LeftDown] = EResDirectionId.ERDI_Down;
        }
        var animations = [];

        for (var i in animationBinding) {
            var animation = null;
            for(var ii = 0; ii < i; ii++)
            {
                if(animationBinding[i] == animationBinding[ii])
                {
                    animation = animations[ii];
                    break;
                }
            }

            if(animation == null)
            {
                animation = new cc.Animation();
                for(var j = 0; j < FrameNum; j++ )
                {
                    var frameName = this._sAnimResName + "_" + AnimIdx + "_" + animationBinding[i] + "_" + j + ".png";
                    var spriteFrame = cc.spriteFrameCache.getSpriteFrame(frameName);
                    if(spriteFrame == null)
                    {
                        GameLog.w("Cant get Sprite Frame by", frameName);
                        continue;
                    }
                    animation.addSpriteFrame(spriteFrame);
                }
                animation.setDelayPerUnit(AnimTime / FrameNum);
                animation.setRestoreOriginalFrame(bRestoreOriginalFrame == null ? true : bRestoreOriginalFrame);
            }

            animations.push(animation);
        }

        return animations;
    },

    _createFrameAnimSeqIdle: function(){
        //GameLog.c("_createFrameAnimSeqIdle()");
        var self = this;
        //Idle
        self._frameNumIdle = 2;
        self._animationTimeIdle = 1;
        self._AnimationsInfo[EGameObjectAnimIdx.EGOAI_Idle] = this._createFrameAnimSeq(EGameObjectAnimIdx.EGOAI_Idle,  self._frameNumIdle, self, self._animationTimeIdle);
    },

    _createFrameAnimSeqMove: function(){
        //GameLog.c("_createFrameAnimSeqMove()");
        var self = this;
        //Idle
        self._frameNumMove = 7;
        self._animationTimeMove = 1;
        self._AnimationsInfo[EGameObjectAnimIdx.EGOAI_Walk] = this._createFrameAnimSeq(EGameObjectAnimIdx.EGOAI_Walk,  self._frameNumMove, self, self._animationTimeMove);
    },

    _createFrameAnimSeqRoadieRun: function(){
    },

    _createFrameAnimSeqDeath: function(){
    },

    _createFrameAnimSeqAttack1: function(){
        //GameLog.c("_createFrameAnimSeqAttack1()");
        var self = this;
        //Idle
        self._frameNumAttack1 = 6;
        self._animationTimeAttack1 = 0.8;
        self._AnimationsInfo[EGameObjectAnimIdx.EGOAI_Attack1] = this._createFrameAnimSeq(EGameObjectAnimIdx.EGOAI_Attack1,  self._frameNumAttack1, self._animationTimeAttack1);
    },

    _createFrameAnimSeqAttack2: function(){
        //GameLog.c("_createFrameAnimSeqAttack2()");
        var self = this;
        //Idle
        self._frameNumAttack2 = 6;
        self._animationTimeAttack2 = 0.8;
        self._AnimationsInfo[EGameObjectAnimIdx.EGOAI_Attack2] = this._createFrameAnimSeq(EGameObjectAnimIdx.EGOAI_Attack2,  self._frameNumAttack2, self._animationTimeAttack2);
    },

    _createFrameAnimSeqVictory: function()
    {
        //GameLog.c("_createFrameAnimSeqVictory()");
        var self = this;
        //Idle
        self._frameNumVictory = 5;
        self._animationTimeVictory = 0.6;

        var animationBinding = [];
        animationBinding[EGameObjectDirection.EGOD_Down] = EResDirectionId.ERDI_Down;
        animationBinding[EGameObjectDirection.EGOD_RightDown] = EResDirectionId.ERDI_Down;
        animationBinding[EGameObjectDirection.EGOD_Right] = EResDirectionId.ERDI_Down;
        animationBinding[EGameObjectDirection.EGOD_RightTop] = EResDirectionId.ERDI_Down;
        animationBinding[EGameObjectDirection.EGOD_Top] = EResDirectionId.ERDI_Down;
        animationBinding[EGameObjectDirection.EGOD_LeftTop] = EResDirectionId.ERDI_Down;
        animationBinding[EGameObjectDirection.EGOD_Left] = EResDirectionId.ERDI_Down;
        animationBinding[EGameObjectDirection.EGOD_LeftDown] = EResDirectionId.ERDI_Down;

        self._AnimationsInfo[EGameObjectAnimIdx.EGOAI_Victory] = this._createFrameAnimSeq(EGameObjectAnimIdx.EGOAI_Victory,  self._frameNumVictory, self._animationTimeVictory, animationBinding);
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
        this._initFrameAnimSeqs();

        return true;
    }
})
