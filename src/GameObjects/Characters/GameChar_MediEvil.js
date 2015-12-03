/**
 * Created by yu.liu on 2015/12/2.
 */

var GameChar_MediEvil = CameCharacterBase.extend({
    _className: "GameChar_MediEvil",

    ctor:function(defLvl){
        this._super(defLvl);
    },

    _setObjContentSize: function(newSize){
        if(newSize !== undefined){
            this.setContentSize(newSize);
        }
        else{
            this.setContentSize(70, 90);
        }
    },

    _initShadow: function(){
        this._super();

        if(this._SelectedShadow)
        {
            this._SelectedShadow.initWithFile(res.SelectShadow02);
            //this._SelectedShadow.setPosition(this._fSpriteOffsetX, 25);
            this._SelectedShadow.setScale(0.5);
        }
    }
})