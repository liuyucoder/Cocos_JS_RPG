/**
 * Created by yu.liu on 2015/11/2.
 */

var GameCharacter_Test02 = CameCharacterBase.extend({
    _className: "GameCharacter_Test02",

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
    _frameNumIdle: 2,
    _animationTimeIdle: 1,
    //Move
    _frameNumMove: 7,
    _animationTimeMove: 1,
    //Attack1
    _frameNumAttack1: 6,
    _animationTimeAttack1: 0.8,
    //Attack2
    _frameNumAttack2: 6,
    _animationTimeAttack2: 0.8,
    //Victory
    _frameNumVictory: 5,
    _animationTimeVictory: 0.6,

    _createFrameAnimSeqAttack2: function(){
    },

    _finishFrameAnimSeqs: function(){
        this._super();

        this._CurrentAction = cc.animate(this._AnimationsInfo[EGameObjectAnimIdx.EGOAI_Walk][EGameObjectDirection.EGOD_Down]);
        if(this._CurrentAction != null && this._MyRootSprite != null)
            this._MyRootSprite.runAction(cc.repeatForever(this._CurrentAction));
    }
    /**
     * Animations End
     */
})
