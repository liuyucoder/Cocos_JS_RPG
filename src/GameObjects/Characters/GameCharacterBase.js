/**
 * Created by yu.liu on 2015/10/28.
 */

var CameCharacterBase = GameObjectBase.extend({
    _className: "CameCharacterBase",

    ctor:function(){
        this._super();
        //GameLog.c("CameCharacterBase ctor()");
    },

    init: function () {
        this._super();
        //GameLog.c("CameCharacterBase init()");
        return true;
    },


    /**
     * Animations
     */
    _initFrameAnimSeqs: function(){
        var self = this;

        if(this._sAnimResName == "")
        {
            return;
        }

        self._AnimationsInfo = [];
        this._createFrameAnimSeqIdle();
        this._createFrameAnimSeqMove();
        //this._createFrameAnimSeqRoadieRun();
        //this._createFrameAnimSeqDeath();
        this._createFrameAnimSeqAttack1();
        this._createFrameAnimSeqAttack2();
        this._createFrameAnimSeqVictory();


        this._finishFrameAnimSeqs();
    },

    _finishFrameAnimSeqs: function(){
        if(this._MyRootSprite == null)
        {
            this._MyRootSprite = new cc.Sprite()
        }

        this.addChild(this._MyRootSprite);
        this._CurrentAction = cc.animate(this._AnimationsInfo[EGameObjectAnimIdx.EGOAI_Victory][EGameObjectDirection.EGOD_Down]);
        this._MyRootSprite.runAction(cc.repeatForever(this._CurrentAction));
    }
})
