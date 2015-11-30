/**
 * Created by yu.liu on 2015/10/28.
 */

var GameChar_InfantryMan = CameCharacterBase.extend({
    _className: "GameChar_InfantryMan",

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
