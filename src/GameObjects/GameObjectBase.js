/**
 * Created by yu.liu on 2015/10/28.
 */

var GameObjectBase = cc.Node.extend({
    _className: "GameObjectBase",
    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
     * @function
     */
    ctor: function(){
        GameLog.c("GameObjectBase ctor()");
        this._super();
    },

    /**
     * Initializes the instance of cc.Node
     * @function
     * @returns {boolean} Whether the initialization was successful.
     */
    init: function () {
        GameLog.c("GameObjectBase init()");
        return true;
    }
})
