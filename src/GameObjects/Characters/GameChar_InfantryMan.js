/**
 * Created by yu.liu on 2015/10/28.
 */

var GameChar_InfantryMan = CameCharacterBase.extend({
    _className: "GameChar_InfantryMan",

    ctor:function(){
        this._super();
    },

    /**
     * Animations Begin
     */
    //Idle
    _frameCountIdle: 2,
    _animateIntervalIdle: 0.75,
    //Move
    _frameCountMove: 7,
    _animateIntervalMove: 0.09,
    //Attack1
    _frameCountAttack1: 6,
    _animateIntervalAttack1: 0.12,
    //Attack2
    _frameCountAttack2: 6,
    _animationIntervalAttack2: 0.12,
    //Victory
    _frameCountVictory: 5,
    _animationIntervalVictory: 0.13,

    _finishFrameAnimSeqs: function(){
        this._super();

        this._CurrentAction = this._AnimationsInfo[EGameObjectAnimIdx.EGOAI_Victory][EGameObjectDirection.EGOD_Down];
        if(this._CurrentAction != null && this._MyRootSprite != null)
            this._MyRootSprite.runAction(cc.repeatForever(this._CurrentAction));

//        var testArr = [];
//        var test = {};
//        test[EGameObjectAnimIdx.EGOAI_Idle] = 6;
//        testArr.push(test);
//        var test1 = {};
//        test1[EGameObjectAnimIdx.EGOAI_Idle] = 10;
//        testArr.push(test1);
//        for(var i in  testArr)
//        {
//            GameLog.c("@" + testArr[i][EGameObjectAnimIdx.EGOAI_Idle]);
//        }
    }
    /**
     * Animations End
     */
})
