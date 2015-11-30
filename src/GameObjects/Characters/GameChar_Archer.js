/**
 * Created by yu.liu on 2015/11/2.
 */

var GameChar_Archer = CameCharacterBase.extend({
    _className: "GameChar_Archer",

    ctor:function(defLvl){
        this._super(defLvl);
    },

    /**
     * Animations
     */
    _finishFrameAnimSeqs: function(){
        this._CurrentAction = this._AnimationsInfo[EGameObjectActionType.idle].animateInstances[EGameObjectDirection.EGOD_Down];

        this._super();
    }
    /**
     * Animations End
     */
})
