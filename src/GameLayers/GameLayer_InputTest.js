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
            var myHeroes = gameScene.getRoles();
            //GameLog.c("@@@@1", locationInNode.x, locationInNode.y);
            for(var i in myHeroes){
                var locationInNode = myHeroes[i].convertToNodeSpace(touch.getLocation());
                //var s = myHeroes[i].getContentSize();
                //var rect = cc.rect(-s.width/2 + myHeroes[i].getRootSpriteOffsetPT().x, -s.height/2 + myHeroes[i].getRootSpriteOffsetPT().y, s.width, s.height);
                //var locationInNode = myHeroes[i]._MyRootSprite.convertToNodeSpace(touch.getLocation());
                //var rect = cc.rect(myHeroes[i].getContentSize());
                //var rect = cc.rect(-s.width/2, -s.height/2, s.width, s.height);
                if (cc.rectContainsPoint(myHeroes[i].getObjValidRect(), locationInNode)) {
                    gameScene.onSelectedObj(myHeroes[i], touch.getLocation());
                    return true;
                }
            }
        }

        return true;
    },

    _onTouchMoved: function(touch , event){
        //GameLog.c("@@@@2");
    },

    _onTouchEnded: function (touch, event) {
        var target = event.getCurrentTarget();
        var gameScene = target.getParent();
        if( gameScene instanceof GameSceneBase){
            gameScene.onSelectedObj(null, touch.getLocation());
        }
    }
})