/**
 * Created by yu.liu on 2015/10/28.
 */

var CameCharacterBase = GameObjectBase.extend({
    _className: "CameCharacterBase",

    CharDataMapByLvl: null,
    //
    _AnimationsInfo: [],
    //Idle
    _frameCountIdle: 1,
    _animateIntervalIdle: 1,
    //Move
    _frameCountMove: 1,
    _animateIntervalMove: 1,
    //Attack1
    _frameCountAttack1: 1,
    _animateIntervalAttack1: 1,
    //Attack2
    _frameCountAttack2: 1,
    _animationIntervalAttack2: 1,
    //Victory
    _frameCountVictory: 1,
    _animationIntervalVictory: 1,


    /**
     * Animations
     */
    _initFrameAnimSeqs: function(){
        if(this._sAnimResPrefix == "")
        {
            GameLog.w(this._className + ": _sAnimResPrefix is Null!");
            return;
        }

        this._AnimationsInfo = [];
        this._createFrameAnimSeqIdle();
        this._createFrameAnimSeqMove();
        this._createFrameAnimSeqRoadieRun();
        this._createFrameAnimSeqDeath();
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
    },


//    /*AnimationCache*/
//    //从SpriteFrameCache中获取每一帧组成动画
//    Vector<SpriteFrame*> sps;
//for (int i = 1; i < 11; i++)
//{
//    char buf[30] = {0};
//    sprintf_s(buf, "fish03_%02d.png", i);
//    auto spfm = SpriteFrameCache::getInstance()->getSpriteFrameByName(buf);
//    sps.pushBack(spfm);
//}
//
//auto animation = Animation::createWithSpriteFrames(sps, 0.2f);
////animation->setLoops(100);
//
////把动画添加到AnimationCache中
//AnimationCache::getInstance()->addAnimation(animation, "fish");
//
////从AnimationCache中获取动画创建一个动画动作
//auto animate = Animate::create(AnimationCache::getInstance()->getAnimation("fish"));
//
//auto sp33 = Sprite::create();
//sp33->setPosition(Vec2(100, 300));
//addChild(sp33, 9);
//
////重复执行这个动画动作
//sp33->runAction(RepeatForever::create(animate));

    _createCharFrameAnimSeq: function(AnimIdx, FrameCount, FrameInterval, SpecialAnimBinding, bRestoreOriginalFrame){
        var animationBinding = (SpecialAnimBinding == null ? [] : SpecialAnimBinding);
        if(SpecialAnimBinding == null){
            animationBinding[EGameObjectDirection.EGOD_Down] = EResDirectionId.ERDI_Down;
            animationBinding[EGameObjectDirection.EGOD_RightDown] = EResDirectionId.ERDI_Down;
            animationBinding[EGameObjectDirection.EGOD_Right] = EResDirectionId.ERDI_Right;
            animationBinding[EGameObjectDirection.EGOD_RightTop] = EResDirectionId.ERDI_Top;
            animationBinding[EGameObjectDirection.EGOD_Top] = EResDirectionId.ERDI_Top;
            animationBinding[EGameObjectDirection.EGOD_LeftTop] = EResDirectionId.ERDI_Top;
            animationBinding[EGameObjectDirection.EGOD_Left] = EResDirectionId.ERDI_Right;
            animationBinding[EGameObjectDirection.EGOD_LeftDown] = EResDirectionId.ERDI_Down;
        }
        var animatesCache = [];

        for (var i in animationBinding) {
            var animate = null;
            for(var ii = 0; ii < i; ii++)
            {
                if(animationBinding[i] == animationBinding[ii])
                {
                    animate = animatesCache[ii];
                    break;
                }
            }

            if(animate == null)
            {
                var animation = new cc.Animation();
                for(var j = 0; j < FrameCount; j++ )
                {
                    var frameName = this._sAnimResPrefix + "_" + AnimIdx + "_" + animationBinding[i] + "_" + j + ".png";
                    var spriteFrame = cc.spriteFrameCache.getSpriteFrame(frameName);
                    if(spriteFrame == null)
                    {
                        GameLog.w("Cant get Sprite Frame by", frameName);
                        continue;
                    }
                    animation.addSpriteFrame(spriteFrame);
                }
                animation.setDelayPerUnit(FrameInterval);
                animation.setRestoreOriginalFrame(bRestoreOriginalFrame == null ? true : bRestoreOriginalFrame);

                animate = cc.animate(animation);
            }

            animatesCache.push(animate);
        }

        return animatesCache;
    },

    _createFrameAnimSeqIdle: function(){
        this._AnimationsInfo[EGameObjectAnimIdx.EGOAI_Idle] = this._createCharFrameAnimSeq(EGameObjectAnimIdx.EGOAI_Idle,  this._frameCountIdle, this._animateIntervalIdle);
    },

    _createFrameAnimSeqMove: function(){
        this._AnimationsInfo[EGameObjectAnimIdx.EGOAI_Walk] = this._createCharFrameAnimSeq(EGameObjectAnimIdx.EGOAI_Walk,  this._frameCountMove, this._animateIntervalMove);
    },

    _createFrameAnimSeqRoadieRun: function(){
    },

    _createFrameAnimSeqDeath: function(){
    },

    _createFrameAnimSeqAttack1: function(){
        this._AnimationsInfo[EGameObjectAnimIdx.EGOAI_Attack1] = this._createCharFrameAnimSeq(EGameObjectAnimIdx.EGOAI_Attack1,  this._frameCountAttack1, this._animateIntervalAttack1);
    },

    _createFrameAnimSeqAttack2: function(){
        this._AnimationsInfo[EGameObjectAnimIdx.EGOAI_Attack2] = this._createCharFrameAnimSeq(EGameObjectAnimIdx.EGOAI_Attack2,  this._frameCountAttack2, this._animationIntervalAttack2);
    },

    _createFrameAnimSeqVictory: function()
    {
        var animationBinding = [];
        animationBinding[EGameObjectDirection.EGOD_Down] = EResDirectionId.ERDI_Down;
        animationBinding[EGameObjectDirection.EGOD_RightDown] = EResDirectionId.ERDI_Down;
        animationBinding[EGameObjectDirection.EGOD_Right] = EResDirectionId.ERDI_Down;
        animationBinding[EGameObjectDirection.EGOD_RightTop] = EResDirectionId.ERDI_Down;
        animationBinding[EGameObjectDirection.EGOD_Top] = EResDirectionId.ERDI_Down;
        animationBinding[EGameObjectDirection.EGOD_LeftTop] = EResDirectionId.ERDI_Down;
        animationBinding[EGameObjectDirection.EGOD_Left] = EResDirectionId.ERDI_Down;
        animationBinding[EGameObjectDirection.EGOD_LeftDown] = EResDirectionId.ERDI_Down;

        this._AnimationsInfo[EGameObjectAnimIdx.EGOAI_Victory] = this._createCharFrameAnimSeq(EGameObjectAnimIdx.EGOAI_Victory,  this._frameCountVictory, this._animationIntervalVictory, animationBinding);
    },

    /**
     * Action
     */
    moverTo: function(TargetLoc){

    },

    ctor:function() {
        this._super();
    },

    onEnter:function () {
        this._super();
        //GameLog.c("CameCharacterBase onEnter()");
    },

    _initDefaultData: function(){
        var self = this;
        var res = false;
        self._GameObjectID = GameDefaultDataProviders.getCharIDByClassName(self._className);
        if(self._GameObjectID !== INDEX_NONE){
            self.CharDataMapByLvl = GameDefaultDataProviders.getCharDataByID(self._GameObjectID);
            if(self.CharDataMapByLvl !== null || self.CharDataMapByLvl.isEmpty()){
                var keys = self.CharDataMapByLvl.keys();
                if(keys.length > 0){
                    keys.sort();
                    self._GameObjectLvl = keys[0];
                    self._GameObjectLvlMax = keys.length;


                    self._bBase = (self.CharDataMapByLvl.get(self._GameObjectLvl))[CharDataStruct.bBase];

                    for(var i in keys){
                        var lvlData = self.CharDataMapByLvl.get(keys[i]);
                        cc.spriteFrameCache.addSpriteFrames(lvlData[CharDataStruct.sResPList], lvlData[CharDataStruct.sResPng]);
                    }
                    self._sAnimResPrefix = (self.CharDataMapByLvl.get(self._GameObjectLvl))[CharDataStruct.sAnimResPrefix];
                    self._fSpriteOffsetX = (self.CharDataMapByLvl.get(self._GameObjectLvl))[CharDataStruct.fSpriteOffsetX];
                    self._fSpriteOffsetY = (self.CharDataMapByLvl.get(self._GameObjectLvl))[CharDataStruct.fSpriteOffsetY];
                    self._GameObjLocName = (self.CharDataMapByLvl.get(self._GameObjectLvl))[CharDataStruct.sLocName];
                    self._fDefaultHealth = (self.CharDataMapByLvl.get(self._GameObjectLvl))[CharDataStruct.fDefaultHP];
                    self._bAirUnit = (self.CharDataMapByLvl.get(self._GameObjectLvl))[CharDataStruct.bFlyUnit];
                    self._fDefaultGroundSpeed = (self.CharDataMapByLvl.get(self._GameObjectLvl))[CharDataStruct.fDefaultGroundSpeed];
                    self._fDefaultAirSpeed = (self.CharDataMapByLvl.get(self._GameObjectLvl))[CharDataStruct.fDefaultAirSpeed];

                    res = true;
                }
            }
        }

        return res;
    },

    init: function () {
        this._super();
        GameLog.c("CameCharacterBase::init()");
        return true;
    }

})
