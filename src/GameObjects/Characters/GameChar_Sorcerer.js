/**
 * Created by yu.liu on 2015/12/2.
 */

var GameChar_Sorcerer = CameCharacterBase.extend({
    _className: "GameChar_Sorcerer",

    _meleeCD: 4,
    _enemyMeleeDis_Melee: 600,

    ctor:function(defLvl){
        this._super(defLvl);
    },

    _setObjContentSize: function(newSize){
        if(newSize !== undefined){
            this.setContentSize(newSize);
        }
        else{
            this.setContentSize(80, 130);
        }
    },

    _initShadow: function(){
        if(this._ObjShadow === null){
            this._ObjShadow = new cc.Sprite(res.SelectShadow05);
            this._ObjShadow.setScale(0.25);
            this.addChild(this._ObjShadow);
        }

        this._super();

        if(this._SelectedShadow)
        {
            this._SelectedShadow.initWithFile(res.SelectShadow01);
            //this._SelectedShadow.setPosition(this._fSpriteOffsetX, 25);
            this._SelectedShadow.setScale(0.5);
        }
    }
})