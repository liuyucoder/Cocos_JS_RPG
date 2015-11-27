/**
 * Created by yu.liu on 2015/10/28.
 */

var CameCharacterBase = GameObjectBase.extend({
    _className: "CameCharacterBase",

    CharDataMapByLvl: null,
    //
    _AnimationsInfo: [],


    /**
     * Animations
     */
    _initFrameAnimSeqs: function(){
        var res = false;
        if(this._sAnimResPrefix == "")
        {
            GameLog.w(this._className + ": _sAnimResPrefix is Null!");
            return res;
        }

        this._AnimationsInfo = [];

        var animDataMayByActionType = GameDefaultDataProviders.getAnimDataByPrefix(this._sAnimResPrefix);
        if(animDataMayByActionType !== null){
            var keys = animDataMayByActionType.keys();
            if(keys.length > 0){
                for(var i in keys){
                    var actionData = animDataMayByActionType.get(keys[i]);
                    var actionType = EGameObjectActionType[actionData[CharAnimDataStruct.sActionType]];
                    if(actionType !== undefined){
                        var animInfo = {};
                        animInfo.data = actionData;
                        animInfo.animateInstances = this._createCharFrameAnimSeq(actionType,
                                                                                    animInfo.data[CharAnimDataStruct.iFrameNum],
                                                                                    animInfo.data[CharAnimDataStruct.fFrameInterval],
                                                                                    animInfo.data[CharAnimDataStruct.bWithDir],
                                                                                    animInfo.data[CharAnimDataStruct.iDefaultDir]
                                                                                    );
                        this._AnimationsInfo[actionType] = animInfo;
                    }
                    else{
                        GameLog.w("_initFrameAnimSeqs()  ActionType=%s  is undefined.  (AnimName=%s)", actionData[CharAnimDataStruct.sActionType], this._sAnimResPrefix);
                    }
                }

                this._finishFrameAnimSeqs();

                res = true;
            }
        }

        return res;
    },

    _finishFrameAnimSeqs: function(){
        if(this._MyRootSprite == null)
        {
            this._MyRootSprite = new cc.Sprite()
            this.addChild(this._MyRootSprite);

            this.scheduleUpdate();
        }

        if(this._CurrentAction != null && this._MyRootSprite != null){
            this._MyRootSprite.setPosition(this._fSpriteOffsetX, this._fSpriteOffsetY);
            this._MyRootSprite.runAction(cc.repeatForever(this._CurrentAction));
        }
    },

    _refreshAnimOffset: function(){
//        if(this._MyRootSprite == null){
//            this._MyRootSprite.setPosition()
//        }
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

//    _createCharFrameAnimSeq: function(AnimIdx, FrameCount, FrameInterval, SpecialAnimBinding, bRestoreOriginalFrame){
//        var animationBinding = (SpecialAnimBinding == null ? [] : SpecialAnimBinding);
//        if(SpecialAnimBinding == null){
//            animationBinding[EGameObjectDirection.EGOD_Down] = EResDirectionId.ERDI_Down;
//            animationBinding[EGameObjectDirection.EGOD_RightDown] = EResDirectionId.ERDI_Down;
//            animationBinding[EGameObjectDirection.EGOD_Right] = EResDirectionId.ERDI_Right;
//            animationBinding[EGameObjectDirection.EGOD_RightTop] = EResDirectionId.ERDI_Top;
//            animationBinding[EGameObjectDirection.EGOD_Top] = EResDirectionId.ERDI_Top;
//            animationBinding[EGameObjectDirection.EGOD_LeftTop] = EResDirectionId.ERDI_Top;
//            animationBinding[EGameObjectDirection.EGOD_Left] = EResDirectionId.ERDI_Right;
//            animationBinding[EGameObjectDirection.EGOD_LeftDown] = EResDirectionId.ERDI_Down;
//        }
//        var animatesCache = [];
//
//        for (var i in animationBinding) {
//            var animate = null;
//            for(var ii = 0; ii < i; ii++)
//            {
//                if(animationBinding[i] == animationBinding[ii])
//                {
//                    animate = animatesCache[ii];
//                    break;
//                }
//            }
//
//            if(animate == null)
//            {
//                var animation = new cc.Animation();
//                for(var j = 0; j < FrameCount; j++ )
//                {
//                    var frameName = this._sAnimResPrefix + "_" + AnimIdx + "_" + animationBinding[i] + "_" + j + ".png";
//                    var spriteFrame = cc.spriteFrameCache.getSpriteFrame(frameName);
//                    if(spriteFrame == null)
//                    {
//                        GameLog.w("Cant get Sprite Frame by", frameName);
//                        continue;
//                    }
//                    animation.addSpriteFrame(spriteFrame);
//                }
//                animation.setDelayPerUnit(FrameInterval);
//                animation.setRestoreOriginalFrame(bRestoreOriginalFrame == null ? true : bRestoreOriginalFrame);
//
//                animate = cc.animate(animation);
//            }
//
//            animatesCache.push(animate);
//        }
//
//        return animatesCache;
//    },

    _createCharFrameAnimSeq: function(AnimType, FrameCount, FrameInterval, WithDir, DefDirIdx, bRestoreOriginalFrame){
        var animationBinding = [];
        animationBinding[EGameObjectDirection.EGOD_Down] = (WithDir ? EResDirectionId.ERDI_Down : DefDirIdx);
        animationBinding[EGameObjectDirection.EGOD_RightDown] = (WithDir ? EResDirectionId.ERDI_Down : DefDirIdx);
        animationBinding[EGameObjectDirection.EGOD_Right] = (WithDir ? EResDirectionId.ERDI_Right : DefDirIdx);
        animationBinding[EGameObjectDirection.EGOD_RightTop] = (WithDir ? EResDirectionId.ERDI_Top : DefDirIdx);
        animationBinding[EGameObjectDirection.EGOD_Top] = (WithDir ? EResDirectionId.ERDI_Top : DefDirIdx);
        animationBinding[EGameObjectDirection.EGOD_LeftTop] = (WithDir ? EResDirectionId.ERDI_Top : DefDirIdx);
        animationBinding[EGameObjectDirection.EGOD_Left] = (WithDir ? EResDirectionId.ERDI_Right : DefDirIdx);
        animationBinding[EGameObjectDirection.EGOD_LeftDown] = (WithDir ? EResDirectionId.ERDI_Down : DefDirIdx);

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
                    var frameName = this._sAnimResPrefix + "_" + AnimType + "_" + animationBinding[i] + "_" + j + ".png";
                    var spriteFrame = cc.spriteFrameCache.getSpriteFrame(frameName);
                    if(spriteFrame == null)
                    {
                        GameLog.w("Cant get Sprite Frame by &s. AnimType=%s FrameCount=%s", frameName, AnimType, FrameCount);
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

//    _createFrameAnimSeqIdle: function(){
//        //this._AnimationsInfo[EGameObjectActionType.EGOAT_Idle] = this._createCharFrameAnimSeq(EGameObjectActionType.EGOAT_Idle,  this._frameCountIdle, this._animateIntervalIdle);
//    },
//
//    _createFrameAnimSeqMove: function(){
//        //this._AnimationsInfo[EGameObjectActionType.EGOAT_Walk] = this._createCharFrameAnimSeq(EGameObjectActionType.EGOAT_Walk,  this._frameCountMove, this._animateIntervalMove);
//    },
//
//    _createFrameAnimSeqRoadieRun: function(){
//    },
//
//    _createFrameAnimSeqDeath: function(){
//    },
//
//    _createFrameAnimSeqAttack1: function(){
//        //this._AnimationsInfo[EGameObjectActionType.EGOAT_Attack1] = this._createCharFrameAnimSeq(EGameObjectActionType.EGOAT_Attack1,  this._frameCountAttack1, this._animateIntervalAttack1);
//    },
//
//    _createFrameAnimSeqAttack2: function(){
//        //this._AnimationsInfo[EGameObjectActionType.EGOAT_Attack2] = this._createCharFrameAnimSeq(EGameObjectActionType.EGOAT_Attack2,  this._frameCountAttack2, this._animationIntervalAttack2);
//    },
//
//    _createFrameAnimSeqVictory: function()
//    {
//        //var animationBinding = [];
//        //animationBinding[EGameObjectDirection.EGOD_Down] = EResDirectionId.ERDI_Down;
//        //animationBinding[EGameObjectDirection.EGOD_RightDown] = EResDirectionId.ERDI_Down;
//        //animationBinding[EGameObjectDirection.EGOD_Right] = EResDirectionId.ERDI_Down;
//        //animationBinding[EGameObjectDirection.EGOD_RightTop] = EResDirectionId.ERDI_Down;
//        //animationBinding[EGameObjectDirection.EGOD_Top] = EResDirectionId.ERDI_Down;
//        //animationBinding[EGameObjectDirection.EGOD_LeftTop] = EResDirectionId.ERDI_Down;
//        //animationBinding[EGameObjectDirection.EGOD_Left] = EResDirectionId.ERDI_Down;
//        //animationBinding[EGameObjectDirection.EGOD_LeftDown] = EResDirectionId.ERDI_Down;
//
//        //this._AnimationsInfo[EGameObjectActionType.EGOAT_Victory] = this._createCharFrameAnimSeq(EGameObjectActionType.EGOAT_Victory,  this._frameCountVictory, this._animationIntervalVictory, animationBinding);
//    },

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

    update:function(){
        GameLog.c("CameCharacterBase::update().");
    },

    _initDefaultData: function(){
        var self = this;
        var res = false;
        self._GameObjectID = GameDefaultDataProviders.getCharIDByClassName(self._className);
        if(self._GameObjectID !== INDEX_NONE){
            self.CharDataMapByLvl = GameDefaultDataProviders.getCharDataByID(self._GameObjectID);
            if(self.CharDataMapByLvl !== null && !self.CharDataMapByLvl.isEmpty()){
                var keys = self.CharDataMapByLvl.keys();
                if(keys.length > 0){
                    keys.sort();
                    self._GameObjectLvl = keys[0];
                    self._GameObjectLvlMax = keys.length;

                    for(var i in keys){
                        var lvlData = self.CharDataMapByLvl.get(keys[i]);
                        cc.spriteFrameCache.addSpriteFrames(lvlData[CharDataStruct.sResPList], lvlData[CharDataStruct.sResPng]);
                    }

                    self._refreshDefaultData();

                    res = true;
                }
            }
        }

        return res;
    },

    _refreshDefaultData: function(){
        var self = this;
        if(self.CharDataMapByLvl !== null && !self.CharDataMapByLvl.isEmpty() && self.CharDataMapByLvl.containsKey(self._GameObjectLvl)){
            self._bBase = (self.CharDataMapByLvl.get(self._GameObjectLvl))[CharDataStruct.bBase];
            self._sAnimResPrefix = (self.CharDataMapByLvl.get(self._GameObjectLvl))[CharDataStruct.sAnimResPrefix];
            self._fSpriteOffsetX = (self.CharDataMapByLvl.get(self._GameObjectLvl))[CharDataStruct.fSpriteOffsetX];
            self._fSpriteOffsetY = (self.CharDataMapByLvl.get(self._GameObjectLvl))[CharDataStruct.fSpriteOffsetY];
            self._GameObjLocName = (self.CharDataMapByLvl.get(self._GameObjectLvl))[CharDataStruct.sLocName];
            self._fDefaultHealth = (self.CharDataMapByLvl.get(self._GameObjectLvl))[CharDataStruct.fDefaultHP];
            self._bAirUnit = (self.CharDataMapByLvl.get(self._GameObjectLvl))[CharDataStruct.bFlyUnit];
            self._fDefaultGroundSpeed = (self.CharDataMapByLvl.get(self._GameObjectLvl))[CharDataStruct.fDefaultGroundSpeed];
            self._fDefaultAirSpeed = (self.CharDataMapByLvl.get(self._GameObjectLvl))[CharDataStruct.fDefaultAirSpeed];
        }
        else{
            GameLog.w("CameCharacterBase::_refreshDefaultData() failed.");
        }
    },

    init: function () {
        this._super();
        GameLog.c("CameCharacterBase::init()");
        return true;
    }

})
