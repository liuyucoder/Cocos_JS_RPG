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
        var myHeroes = target.getParent().getRoles();
        //GameLog.c("@@@@1", locationInNode.x, locationInNode.y);
        for(var i in myHeroes){
            var locationInNode = myHeroes[i].convertToNodeSpace(touch.getLocation());
            var s = myHeroes[i].getContentSize();

            var rect = cc.rect(-s.width/2, -s.height/2, s.width, s.height);
            if (cc.rectContainsPoint(rect, locationInNode)) {
                // 需要返回true，否则不会调用后面的onTouchEnded方法
                GameLog.c("@@@@2", myHeroes[i]._className);
                return true;
            }
        }

        return true;
    },

    _onTouchMoved: function(touch , event){
        //GameLog.c("@@@@2");
    },

    _onTouchEnded: function (touch, event) {
        //GameLog.c("@@@@3");
    }
})