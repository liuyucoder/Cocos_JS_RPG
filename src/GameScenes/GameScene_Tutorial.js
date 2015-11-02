/**
 * Created by yu.liu on 2015/11/2.
 */

var GameScene_Tutorial = GameSceneBase.extend({
    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
     * @function
     */
    ctor:function () {
        this._super();

        GameLog.c("GameScene_Tutorial ctor()");
    }
})