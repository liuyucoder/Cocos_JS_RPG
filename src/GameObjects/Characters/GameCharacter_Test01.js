/**
 * Created by yu.liu on 2015/10/28.
 */

var GameCharacter_Test01 = CameCharacterBase.extend({
    _className: "GameCharacter_Test01",

    ctor:function(){
        cc.spriteFrameCache.addSpriteFrames(resPlist_Chars.Char0001_p, resPlist_Chars.Char0001_t);
        this._super();
        //GameLog.c("GameCharacter_Test01 ctor()");
    },

    /**
     * Animations
     */
    _sAnimResPath: "res/Characters/1_4.plist",
    _sAnimResName: "1_4"
})
