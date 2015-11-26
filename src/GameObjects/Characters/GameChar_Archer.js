/**
 * Created by yu.liu on 2015/11/2.
 */

var GameChar_Archer = CameCharacterBase.extend({
    _className: "GameChar_Archer",

    ctor:function(){
        this._super();
    },

    /**
     * Animations
     */
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
