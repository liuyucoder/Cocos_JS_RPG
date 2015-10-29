/**
 * Created by yu.liu on 2015/10/28.
 */

var CameCharacterBase = GameObjectBase.extend({
    _className: "CameCharacterBase",
    /**
     * Animations
     */
    _bUseFrameAnimation: true,

    ctor:function(){
        GameLog.c("CameCharacterBase ctor()");
        this._super();
    },

    init: function () {
        GameLog.c("CameCharacterBase init()");
        return true;
    }
})
