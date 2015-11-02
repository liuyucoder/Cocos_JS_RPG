/**
 * Created by yu.liu on 2015/10/28.
 */

var GameCharacter_Test01 = CameCharacterBase.extend({
    _className: "GameCharacter_Test01",

    ctor:function(){
        cc.spriteFrameCache.addSpriteFrames(resPlist_Chars.Char0001_p, resPlist_Chars.Char0001_t);
        this._super();
    },

    /**
     * Animations Begin
     */
    _sAnimResPath: "res/Characters/1_4.plist",
    _sAnimResName: "1_4",
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

    _finishFrameAnimSeqs: function(){
        this._super();

        this._CurrentAction = cc.animate(this._AnimationsInfo[EGameObjectAnimIdx.EGOAI_Walk][EGameObjectDirection.EGOD_Top]);
        if(this._CurrentAction != null && this._MyRootSprite != null)
            this._MyRootSprite.runAction(cc.repeatForever(this._CurrentAction));
    }
    /**
     * Animations End
     */
})
