/**
 * Created by yu.liu on 2015/11/30.
 */

var GameLayer_InputTest = GameLayerInputBase.extend({
    _className: "GameLayer_InputTest",

    ctor:function () {
        this._super();
    },

    onEnter:function () {
        this._super();

        this.scheduleUpdate();
    },

    onExit: function(){
        this._super();

        this.unscheduleUpdate();
    },

    update:function(dt){
        if(this._bDragging){
            if(this._selectedGameObj){
                var gameScene = this.getGameScene();
                if(gameScene){
                    this.onMoveOnObj(gameScene.getHeroByTouch(this._touchedLoc));
                }
            }
        }
    },

    _registerEventListener: function(){
        this._super();
    },

    onTouchBeganNotify: function(touchLoc){
        this._setDraggingFlag(true, touchLoc);
        var gameScene = this.getGameScene();
        if(gameScene){
            this.onSelectedObj(gameScene.getHeroByTouch(touchLoc), touchLoc);
        }
    },

    onTouchMoveNotify: function(touchLoc){
//        if(this._selectedGameObj){
//            var gameScene = this.getGameScene();
//            if(gameScene){
//                this.onMoveOnObj(gameScene.getHeroByTouch(touchLoc));
//            }
//        }
        this._touchedLoc = touchLoc;
    },

    onTouchEndNotify: function(touchLoc){
        this._setDraggingFlag(false);

        var bShouldMove = true;
        if(this._selectedGameObj && this._moveOnGameObj){
            if(this._moveOnGameObj.isValidEnemyFor(this._selectedGameObj)){
                this._selectedGameObj.setEnemy(this._moveOnGameObj);
                bShouldMove = false;
            }
            else{

            }
        }

        this.onMoveOnObj(null);
        this.onSelectedObj(null, touchLoc, bShouldMove);
    },

    onSelectedObj: function(obj, loc, bMove){
        if(bMove === undefined)
            bMove = false;

        var gamePlayLayer = this.getGamePlayLayer();
        if(gamePlayLayer){
            loc = gamePlayLayer.convertToNodeSpace(loc);
            if(obj){
                if(obj instanceof GameObjectBase){
                    this._selectedGameObj = obj;
                    this._selectedGameObj.onSelected(true);
                }
            }
            else{
                if(this._selectedGameObj){
                    this._selectedGameObj.onSelected(false);

                    var gameScene = this.getGameScene();
                    if(bMove && gameScene && gameScene.canReachThePt(gameScene.clipTouchLoc(loc))){
                        this._selectedGameObj.forceMoveToPt(loc);
                    }
                    this._selectedGameObj = null;
                }
            }
        }
    },

    onMoveOnObj: function(obj){
        if(this._moveOnGameObj !== null && this._moveOnGameObj !== obj){
            this._moveOnGameObj.onMoveOn(false);
        }
        this._moveOnGameObj = obj;
        if(this._moveOnGameObj !== null){
            this._moveOnGameObj.onMoveOn(true);
        }
    }
})