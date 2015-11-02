/**
 * Created by yu.liu on 2015/10/28.
 */

var CameCharacterBase = GameObjectBase.extend({
    _className: "CameCharacterBase",

    ctor:function(){
        this._super();
    },

    init: function () {
        this._super();
        //GameLog.c("CameCharacterBase init()");
        return true;
    },


    /**
     * Animations
     */
    //
    _AnimationsInfo: [],
    //Idle
    _frameNumIdle: 1,
    _animationTimeIdle: 1,
    //Move
    _frameNumMove: 1,
    _animationTimeMove: 1,
    //Attack1
    _frameNumAttack1: 1,
    _animationTimeAttack1: 1,
    //Attack2
    _frameNumAttack2: 1,
    _animationTimeAttack2: 1,
    //Victory
    _frameNumVictory: 1,
    _animationTimeVictory: 1,

    _initFrameAnimSeqs: function(){
        if(this._sAnimResName == "")
        {
            GameLog.w(this._className + ": _sAnimResName is Null!");
            return;
        }

        this._AnimationsInfo = [];
        this._createFrameAnimSeqIdle();
        this._createFrameAnimSeqMove();
        this._createFrameAnimSeqRoadieRun();
        this._createFrameAnimSeqDeath();
        this._createFrameAnimSeqAttack1();
        this._createFrameAnimSeqAttack2();
        this._createFrameAnimSeqVictory();


        this._finishFrameAnimSeqs();
    },

    _finishFrameAnimSeqs: function(){
        if(this._MyRootSprite == null)
        {
            this._MyRootSprite = new cc.Sprite()
        }
        this.addChild(this._MyRootSprite);
    },

    _createCharFrameAnimSeq: function(AnimIdx, FrameNum, AnimTime, SpecialAnimBinding, bRestoreOriginalFrame){
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
        this._AnimationsInfo[EGameObjectAnimIdx.EGOAI_Idle] = this._createCharFrameAnimSeq(EGameObjectAnimIdx.EGOAI_Idle,  this._frameNumIdle, this._animationTimeIdle);
    },

    _createFrameAnimSeqMove: function(){
        this._AnimationsInfo[EGameObjectAnimIdx.EGOAI_Walk] = this._createCharFrameAnimSeq(EGameObjectAnimIdx.EGOAI_Walk,  this._frameNumMove, this._animationTimeMove);
    },

    _createFrameAnimSeqRoadieRun: function(){
    },

    _createFrameAnimSeqDeath: function(){
    },

    _createFrameAnimSeqAttack1: function(){
        this._AnimationsInfo[EGameObjectAnimIdx.EGOAI_Attack1] = this._createCharFrameAnimSeq(EGameObjectAnimIdx.EGOAI_Attack1,  this._frameNumAttack1, this._animationTimeAttack1);
    },

    _createFrameAnimSeqAttack2: function(){
        this._AnimationsInfo[EGameObjectAnimIdx.EGOAI_Attack2] = this._createCharFrameAnimSeq(EGameObjectAnimIdx.EGOAI_Attack2,  this._frameNumAttack2, this._animationTimeAttack2);
    },

    _createFrameAnimSeqVictory: function()
    {
        var animationBinding = [];
        animationBinding[EGameObjectDirection.EGOD_Down] = EResDirectionId.ERDI_Down;
        animationBinding[EGameObjectDirection.EGOD_RightDown] = EResDirectionId.ERDI_Down;
        animationBinding[EGameObjectDirection.EGOD_Right] = EResDirectionId.ERDI_Down;
        animationBinding[EGameObjectDirection.EGOD_RightTop] = EResDirectionId.ERDI_Down;
        animationBinding[EGameObjectDirection.EGOD_Top] = EResDirectionId.ERDI_Down;
        animationBinding[EGameObjectDirection.EGOD_LeftTop] = EResDirectionId.ERDI_Down;
        animationBinding[EGameObjectDirection.EGOD_Left] = EResDirectionId.ERDI_Down;
        animationBinding[EGameObjectDirection.EGOD_LeftDown] = EResDirectionId.ERDI_Down;

        this._AnimationsInfo[EGameObjectAnimIdx.EGOAI_Victory] = this._createCharFrameAnimSeq(EGameObjectAnimIdx.EGOAI_Victory,  this._frameNumVictory, this._animationTimeVictory, animationBinding);
    }
})
