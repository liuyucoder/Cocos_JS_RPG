/**
 * Created by yu.liu on 2015/11/2.
 */

var GameCharacter_Test02 = CameCharacterBase.extend({
    _className: "GameCharacter_Test02",
    _sGameObjectName: "Fire Woman",

    ctor:function(){
        cc.spriteFrameCache.addSpriteFrames(resPlist_Chars.Char0002_p, resPlist_Chars.Char0002_t);
        this._super();
    },

    /**
     * Animations
     */
    _sAnimResPath: "res/Characters/Sh8.plist",
    _sAnimResName: "Sh8",
    //Idle
    _frameCountIdle: 2,
    _animateIntervalIdle: 0.75,
    //Move
    _frameCountMove: 7,
    _animateIntervalMove: 0.09,
    //Attack1
    _frameCountAttack1: 6,
    _animationInvervalAttack1: 0.12,
    //Attack2
    _frameCountAttack2: 6,
    _animationIntervalAttack2: 0.12,
    //Victory
    _frameCountVictory: 5,
    _animationIntervalVictory: 0.13,

    _createFrameAnimSeqAttack2: function(){
    },

    _finishFrameAnimSeqs: function(){
        this._super();

        this._CurrentAction = this._AnimationsInfo[EGameObjectAnimIdx.EGOAI_Walk][EGameObjectDirection.EGOD_Down];
        if(this._CurrentAction != null && this._MyRootSprite != null)
            this._MyRootSprite.runAction(cc.repeatForever(this._CurrentAction));
    }
    /**
     * Animations End
     */
})
