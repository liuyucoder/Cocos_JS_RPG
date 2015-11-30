/**
 * Created by yu.liu on 2015/11/2.
 */

var GameLayerInputBase = cc.Layer.extend({
    _className: "GameLayerInputBase",

    _listeners: null,
    _GameSceneInstance: null,
    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
     * @function
     */
    ctor:function () {
        this._super();

        this._registerEventListener();
    },

    setParent: function (parent) {
        this._super(parent);
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

    _onTouchBegan: function(touch , event){
        return false;
    },

    _onTouchMoved: function(touch , event){
    },

    _onTouchEnded: function (touch, event) {
    }
})