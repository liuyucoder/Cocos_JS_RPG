/**
 * Created by yu.liu on 2015/11/2.
 */

var GameChar_Archer = CameCharacterBase.extend({
    _className: "GameChar_Archer",

    ctor:function(defLvl){
        this._super(defLvl);
    },

    _initShadow: function(){
        this._super();

        if(this._SelectedShadow)
        {
            this._SelectedShadow.initWithFile(res.SelectShadow06);
            this._SelectedShadow.setPosition(this._fSpriteOffsetX, 25);
            this._SelectedShadow.setScale(0.5);
        }
    }
})
