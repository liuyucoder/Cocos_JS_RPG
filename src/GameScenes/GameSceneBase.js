/**
 * Created by yu.liu on 2015/10/28.
 */

var GameSceneBase = cc.Scene.extend({
    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
     * @function
     */
    ctor:function () {
        this._super();

        GameLog.c("GameSceneBase ctor()");
    }
})
