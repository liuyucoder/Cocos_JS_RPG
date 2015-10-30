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
    EGOAI_Walk: 1
//    EGOAI_Attack1: 2,
//    EGOAI_Attack2: 3
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
    _sAnimResPath: "res/Characters/1_4.plist",
    _sAnimResName: "1_4",
    _MyRootSprite: null,
    _CurrentAction: null,

    _initFrameAnimSeqs: function(){
        var self = this;

        if(this._sAnimResPath == "")
        {
            return;
        }

        self._AnimationsInfo = [];
        this._createFrameAnimSeqIdle();




//        GameLog.c("**********");
//        for (var i in self._AnimationsInfo) {
//            GameLog.c("**********_AnimationsInfo[" + i + "].AnimTime="+self._AnimationsInfo[i].AnimTime);
//            GameLog.c("**********_AnimationsInfo[" + i + "].FrameNum="+self._AnimationsInfo[i].FrameNum);
//            GameLog.c("**********_AnimationsInfo[" + i + "].animationInfo.length="+self._AnimationsInfo[i].Animations.length);
//        }
//        GameLog.c("**********");
     },

    _createFrameAnimSeqIdle: function(){
        GameLog.c("createFrameAnimSeqIdle()");
        var self = this;

        var animationBinding = [];
        animationBinding[EGameObjectDirection.EGOD_Down] = EResDirectionId.ERDI_Down;
        animationBinding[EGameObjectDirection.EGOD_RightDown] = EResDirectionId.ERDI_Down;
        animationBinding[EGameObjectDirection.EGOD_Right] = EResDirectionId.ERDI_Right;
        animationBinding[EGameObjectDirection.EGOD_RightTop] = EResDirectionId.ERDI_Top;
        animationBinding[EGameObjectDirection.EGOD_Top] = EResDirectionId.ERDI_Top;
        animationBinding[EGameObjectDirection.EGOD_LeftTop] = EResDirectionId.ERDI_Top;
        animationBinding[EGameObjectDirection.EGOD_Left] = EResDirectionId.ERDI_Right;
        animationBinding[EGameObjectDirection.EGOD_LeftDown] = EResDirectionId.ERDI_Down;
        //Idle
        var animationsIdle = [];
        self._frameNumIdle = 2;
        self._animationTimeIdle = 1;

        for (var i in animationBinding) {
            var animation = new cc.Animation();
            for(var j = 0; j < self._frameNumIdle; j++ )
            {
                var frameName = this._sAnimResName + "_" + EGameObjectAnimIdx.EGOAI_Idle + "_" + animationBinding[i] + "_" + j + ".png";
                var spriteFrame = cc.spriteFrameCache.getSpriteFrame(frameName);
                if(spriteFrame == null)
                {
                    GameLog.w("Cant get Sprite Frame by", frameName);
                    continue;
                }
                animation.addSpriteFrame(spriteFrame);
                GameLog.c(frameName);
            }
            animation.setDelayPerUnit(self._animationTimeIdle / self._frameNumIdle);
            animation.setRestoreOriginalFrame(true);

            animationsIdle.push(animation);
        }

        self._AnimationsInfo.push(animationsIdle);

        this._MyRootSprite = new cc.Sprite();
        this.addChild(this._MyRootSprite);
        this._CurrentAction = cc.animate(this._AnimationsInfo[EGameObjectAnimIdx.EGOAI_Idle][EGameObjectDirection.EGOD_Down]);
         this._MyRootSprite.setFlippedX(true);
        this._MyRootSprite.runAction(cc.repeatForever(this._CurrentAction));
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
        return Damage;
    },



    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
     * @function
     */
    ctor: function(){
        cc.spriteFrameCache.addSpriteFrames(resPlist_Chars.Char0001_p, resPlist_Chars.Char0001_t);
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
