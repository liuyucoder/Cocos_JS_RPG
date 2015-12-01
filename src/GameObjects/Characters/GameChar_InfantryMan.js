/**
 * Created by yu.liu on 2015/10/28.
 */

var GameChar_InfantryMan = CameCharacterBase.extend({
    _className: "GameChar_InfantryMan",

    ctor:function(defLvl){
        this._super(defLvl);
    },

    _initShadow: function(){
        this._super();

        if(this._SelectShadow)
        {
            this._SelectShadow.initWithFile(res.SelectShadow00);
            this._SelectShadow.setPosition(this._fSpriteOffsetX, 25);
            this._SelectShadow.setScale(0.5);
        }
    }
})
