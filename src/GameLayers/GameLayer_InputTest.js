/**
 * Created by yu.liu on 2015/11/30.
 */

var GameLayer_InputTest = GameLayerInputBase.extend({
    _className: "GameLayer_InputTest",

    ctor:function () {
        this._super();
    },

    _registerEventListener: function(){
        this._super();
    },

    _onTouchBegan: function(touch , event){
        var target = event.getCurrentTarget();
        var gameScene = target.getParent();
        if( gameScene instanceof GameSceneBase){
            gameScene.inputNotify_onTouchBegan(touch.getLocation());
        }
        return true;
    },

    _onTouchMoved: function(touch , event){
        var target = event.getCurrentTarget();
        var gameScene = target.getParent();
        if( gameScene instanceof GameSceneBase){
            gameScene.inputNotify_onTouchMoved(touch.getLocation());
        }
    },

    _onTouchEnded: function (touch, event) {
        var target = event.getCurrentTarget();
        var gameScene = target.getParent();
        if( gameScene instanceof GameSceneBase){
            gameScene.inputNotify_onTouchEnded(touch.getLocation());
        }
    }
})