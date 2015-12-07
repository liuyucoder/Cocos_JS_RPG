/**
 * Created by yu.liu on 2015/11/2.
 */

var GameLayerInputBase = cc.Layer.extend({
    _className: "GameLayerInputBase",

    _listeners: null,
    _GameSceneInstance: null,

    _selectedGameObj: null,
    _moveOnGameObj: null,

    _bDragging: false,
    _touchedLoc: cc.p(0,0),
    _setDraggingFlag: function(bDrag, Loc){
        this._bDragging = bDrag;
        if(bDrag){
            this._touchedLoc = Loc;
        }
        else{
            this._touchedLoc = cc.p(0, 0);
        }
    },
    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
     * @function
     */
    ctor:function () {
        this._super();

        this._registerEventListener();
    },

    onExit: function(){
        this._super();

        this._removeEventLister();
    },

    setParent: function (parent) {
        this._super(parent);

        if( parent instanceof GameSceneBase){
            this._GameSceneInstance = GameSceneBase(parent);
        }
    },

    _registerEventListener: function(){
        this._listeners = new Array();

        var listener1 = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this._onTouchBegan,
            onTouchMoved: this._onTouchMoved,
            onTouchEnded: this._onTouchEnded
        });

        cc.eventManager.addListener(listener1, this);

        this._listeners.push(listener1);
    },

    _removeEventLister: function(){
        for(var i in this._listeners){
            cc.eventManager.removeListener(this._listeners[i], this);
        }
    },

    _onTouchBegan: function(touch , event){
        var target = event.getCurrentTarget();
        if( target instanceof GameLayerInputBase){
            target.onTouchBeganNotify(touch.getLocation());
        }
        return true;
    },

    _onTouchMoved: function(touch , event){
        var target = event.getCurrentTarget();
        if( target instanceof GameLayerInputBase){
            target.onTouchMoveNotify(touch.getLocation());
        }
    },

    _onTouchEnded: function (touch, event) {
        var target = event.getCurrentTarget();
        if( target instanceof GameLayerInputBase){
            target.onTouchEndNotify(touch.getLocation());
        }
    },

    onTouchBeganNotify: function(touchLoc){
    },

    onTouchMoveNotify: function(touchLoc){
    },

    onTouchEndNotify: function(touchLoc){
    },

    _gameScene: null,
    getGameScene: function(){
        if(this._gameScene == null){
            var gameScene = this.getParent();
            if( gameScene instanceof GameSceneBase){
                this._gameScene = gameScene;
            }
        }
        return this._gameScene;
    },

    _gamePlayLayer: null,
    getGamePlayLayer: function(){
        if(this._gamePlayLayer == null){
            var gameScene = this.getGameScene();
            if(gameScene){
                this._gamePlayLayer = gameScene.getGamePlayLayer();
            }
        }
        return this._gamePlayLayer;
    }
})