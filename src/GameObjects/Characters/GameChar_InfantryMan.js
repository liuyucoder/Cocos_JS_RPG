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

        if(this._SelectedShadow)
        {
            this._SelectedShadow.initWithFile(res.SelectShadow00);
            this._SelectedShadow.setPosition(this._fSpriteOffsetX, 25);
            this._SelectedShadow.setScale(0.5);
        }
    }
})
