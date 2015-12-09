/**
 * Created by yu.liu on 2015/10/28.
 */

var bDrawObjRect = false;

var EGameObjectType = {
    EGOT_Building: 0,
    EGOT_Character:1,
    EGOT_Unknown: 2
};

var ETeamNum = {
    ETT_0: 0,
    ETT_1: 1,
    ETT_Unknown: 2
};

var EGameObjectState = {
    EGOS_Idle: 0,
    EGOS_Walk: 1,
    EGOS_RoadieRun: 2,
    EGOS_DBNO: 3,
    EGOS_Dying: 4,
    EGOS_Attack:5
};

var EGameObjectAnimDirection = {
    EGOD_Down: 0,
    EGOD_RightDown: 1,
    EGOD_Right: 2,
    EGOD_RightTop: 3,
    EGOD_Top: 4,
    EGOD_LeftTop: 5,
    EGOD_Left: 6,
    EGOD_LeftDown: 7
};

var EResDirectionId = {
    ERDI_Down: 1,
    ERDI_Right: 2,
    ERDI_Top: 3
};

//var EGameObjectActionType ={
//    EGOAT_Idle: 0,
//    EGOAT_Walk: 1,
//    EGOAT_Attack1: 2,
//    EGOAT_Attack2: 3,
//    EGOAT_Victory: 9
//};


var EGameObjectActionType ={
    idle: 0,
    walk: 1,
    attack: 2,
    attack2: 3,
    victory: 9
};

var GameObjectBase = cc.Node.extend({
    _className: "GameObjectBase",

    /**
     * ===================  GameObject Default Data  ===================
     */
    _GameObjLocName: "",
    _GameObjectID: -1,
    _GameObjectLvl: 1,
    _bBase: false,
    _GameObjectLvlMax: 0,
    _sAnimResPrefix: "",
    _fSpriteOffsetX: 0,
    _fSpriteOffsetY: 0,
    _MyRootSpritePath: "",
    _fDefaultHealth: 1,
    _bAirUnit: false,
    _fDefaultGroundSpeed: 0,
    _fDefaultAirSpeed: 0,

    /**
     * GameObject
     */
    _eGameObjectType: EGameObjectType.EGOT_Unknown,

    //
    _RectPt_LB: null,
    _RectPt_RT: null,
    setRectPtLB: function(pt){
        this._RectPt_LB = pt;
    },
    setRectPtRT: function(pt){
        this._RectPt_RT = pt;
    },
    getRectPtLB: function(){
        return this._RectPt_LB;
    },
    getRectPtRT: function(){
        return this._RectPt_RT;
    },
    getRootSpriteOffsetPT: function(){
        return cc.p(this._fSpriteOffsetX, this._fSpriteOffsetY);
    },
    getObjValidRect: function(){
        var s = this.getContentSize();
        //var rect = cc.rect(-s.width/2 + this._fSpriteOffsetX, -s.height/2 + this._fSpriteOffsetY, s.width, s.height);
        //return cc.rect(-s.width/2 + this._fSpriteOffsetX, -s.height/2 + this._fSpriteOffsetY, s.width, s.height);
        return cc.rect(-s.width/2, 0, s.width, s.height);
    },

    //_iDefaultLvl: -1,
    _eGameObjectDirection: EGameObjectAnimDirection.EGOD_Down,
    _eTeamNum: ETeamNum.ETT_Unknown,
    getTeamNum: function(){
        return this._eTeamNum;
    },
    setTeamNum: function(teamType){
        this._eTeamNum = teamType;
    },
    isInTheSameTeam: function(obj){
        return (obj.getTeamNum() === this.getTeamNum())
    },
    isValidEnemyFor: function(obj){
        return (obj !== this && obj.getTeamNum() !== this.getTeamNum());
    },
    hasValidEnemy: function(testPbj){
        if(testPbj === undefined){
            testPbj = this._enemy;
        }
        if(testPbj && testPbj.isValidEnemyFor(this)){
            return true;
        }
        return false;
    },

    _bPlayer: false,
    _bNPC: false,

    //AI
    _enemy: null,
    setEnemy: function(newEnemy){
        this._enemy = newEnemy;
    },
    getEnemy: function(){
        return this._enemy;
    },
    _fireTarget:null,
    setFireTarget: function(newFireTarget){
        this._fireTarget = newFireTarget;
    },
    getFireTarget: function(){
        return this._fireTarget;
    },
    _followTarget: null,

    //
    _eGameObjState: EGameObjectState.EGOS_Idle,

    //
    _bCanRoadieRun: false,
    _bCanBeForcedToRoadieRun: false,// if designer tells us to, we can roadie run (e.g. for guys we don't want roadie running normally, but their skeleton supports it)
    _bCanBlindFire: false,

    //
    _bTakeDamaged: false,
    _fCurrentHealth: 0,

    //
    _bRenderObjInfo: false,
    _bDrawHPBar: false,
    _HPBar: null,
    _HPBg: null,
    _HPBarHeight: 20,
    _ObjShadow: null,
    _SelectedShadow: null,
    _MoveOnShadow: null,
    //
    _Vehicle: null,

    //
    _bUseFrameAnimation: true,
    _MyRootSprite: null,
    getRootSpriteLoc: function(){
        if(this._MyRootSprite)
            return this._MyRootSprite.getPosition();
        return this.getPosition();
    },
    _CurrentAction: null,

    levelUp: function(NewLvl){
        var newLevel = -1;
        if(NewLvl === undefined){
            newLevel = this._GameObjectLvl + 1;
        }
        else{
            newLevel = NewLvl;
        }

        if(newLevel > this._GameObjectLvlMax || newLevel <= this._GameObjectLvl){
            GameLog.w("levelUp()  failed.  Level up to Lvl_%s failed.  New Level is unvalid.  (ClassName=%s)", newLevel, this._className);
            return false;
        }

        this._GameObjectLvl = newLevel;

        this._refreshDefaultData();
        this._initRenderObjInfo();
        return true;
    },

    /**
     * ===================  Draw information function  ===================Begin
     */
    _renderObjInfo: function(HideAll){
    },

    _initRenderObjInfo: function(){
        this._initShadow();
        this._initFrameAnimSeqs();
        this._initHPBar();
    },

    _initHPBar: function(){
        if(this._HPBg === null)
        {
            this._HPBg = new cc.Sprite(res.HPProgressBarBg);
            this._HPBg.setScale(0.15);
            this._HPBg.setAnchorPoint(cc.p(0.5, 0));
            this._HPBg.setPosition(this._fSpriteOffsetX, this.getContentSize().height + this._HPBarHeight);
            this.addChild(this._HPBg);

            if(this._HPBar === null)
            {
                this._HPBar = new cc.Sprite(res.HPProgressBar);
                this._HPBar.setAnchorPoint(cc.p(0, 0));
                this._HPBar.setPosition(2, 0);
                this._HPBg.addChild(this._HPBar);
            }
        }
    },

    drawBloodBar: function(bShow){
        if(this._HPBg)
        {
            this._HPBg.setVisible(bShow);
        }
    },

    _initShadow: function(){
        if(this._SelectedShadow === null)
        {
            this._SelectedShadow = new cc.Sprite();
            this.addChild(this._SelectedShadow);
            this._SelectedShadow.setVisible(false);
        }
        if(this._MoveOnShadow === null)
        {
            this._MoveOnShadow = new cc.Sprite();
            this.addChild(this._MoveOnShadow);
            this._MoveOnShadow.setVisible(false);
        }
    },

    showObjShadow: function(bShow){
        if(this._ObjShadow){
            this._ObjShadow.setVisible(bShow);
        }
    },

    showSelectedShadow: function(bShow){
        if(this._SelectedShadow){
            this._SelectedShadow.setVisible(bShow);
        }
    },

    showMoveOnShadow: function(bShow){
        if(this._MoveOnShadow){
            this._MoveOnShadow.setVisible(bShow);
        }
    },

    onSelected: function(bSelected){
        this.showSelectedShadow(bSelected);
    },

    onMoveOn: function(bMoveOn){
        this.showMoveOnShadow(bMoveOn);
    },
    /**
     * ====================================================================End
     */
    _gameTimeDelta: 0,

    _lastMoveTickTime: 0,

    _meleeCD: 2,
    _enemyMeleeDis_Melee: 100,
    _lastMeleeTime: 0,
    isMeleeRange: function(loc){
        if(cc.pDistance(this.getPosition(), loc) <= this._enemyMeleeDis_Melee){
            return true;
        }
        return false;
    },
    canEngageMelee: function(){
        if(this._bForceMoveToPt || this._eGameObjState === EGameObjectState.EGOS_Attack || (this._gameTimeDelta - this._lastMeleeTime) < this._meleeCD){
            return false;
        }
        return true;
    },
    setLastMeleeTime: function(){
        this._lastMeleeTime = this._gameTimeDelta;
    },
    doMeleeAttack: function(){
        this._eGameObjectDirection = this.getFaceDir(this._enemy.getPosition());
        this.goToAttackState(this._eGameObjectDirection);
    },



    /**
     * ==========================  Animation  =============================Begin
     */

    /**
     * Resource file name rule:
     * GameObjeID + "_" + GameObjectLvl         eg.  "1_1"
     *
     * Animation res path:
     * GameObjeID + "_" + GameObjectLvl + "_" + AnimationID + "_"  _eGameObjectDirection + "_" + FrameIdx       eg.  "1_4_0_1_0"
     */

    _initFrameAnimSeqs: function(){
     },

    _finishFrameAnimSeqs: function(){
    },
    /**
     * ====================================================================End
     */
    changeGameObjState: function(NewState){
        this.stopAllActions();

        if(this._eGameObjState === NewState){
            return;
        }
        this._eGameObjState = NewState;
        //GameLog.c("@@@ changeGameObjState()   NewState=", this._eGameObjState);
    },

    goToIdleState: function(AnimDir){
        this.changeGameObjState(EGameObjectState.EGOS_Idle);
    },

    goToMoveState: function(AnimDir){
        this.changeGameObjState(EGameObjectState.EGOS_Walk);
    },

    goToAttackState: function(AnimDir){
        this.changeGameObjState(EGameObjectState.EGOS_Attack);
    },


    _MoveToPt: null,
    _bForceMoveToPt: false,
    _MoveToAction: null,

    _getMoveToAction: function(){
        if(this._MoveToAction === null){
            this._MoveToAction = new cc.MoveTo();
        }
        return this._MoveToAction;
    },

    moveToPt: function(moveToPt){
        this._MoveToPt = moveToPt;
        this._eGameObjectDirection = this.getFaceDir(this._MoveToPt);
        this.goToMoveState(this._eGameObjectDirection);
    },

    moveToTarget: function(){},

    forceMoveToPt: function(moveToPt){
        this._bForceMoveToPt = true;
        this.moveToPt(moveToPt);
    },

    moveFinishCallBack: function(){
        this._bForceMoveToPt = false;
    },

    attackFinishCallBack: function(){},

    flippedRootSpriteX: function(bFlipped){
        if(this._MyRootSprite){
            this._MyRootSprite.setFlippedX(bFlipped);
        }
    },

    getFaceDir: function(pt){
        var DirType = EGameObjectAnimDirection.EGOD_Down;

        if(pt){
            var subX = pt.x - this.getPosition().x;
            var subY = pt.y - this.getPosition().y;
            //! move to right
            if(subX > 0){
                this.flippedRootSpriteX(false);
                var angleX = cc.pAngle(cc.p(1, 0), cc.p(subX, subY));
                if(subY === 0 || angleX < 0.52){
                    //GameLog.c("### Face Right.");
                    DirType = EGameObjectAnimDirection.EGOD_Right;
                }
                else{
                    if(subY > 0){
                        var angleY = cc.pAngle(cc.p(0, 1), cc.p(subX, subY));
                        if(angleY < 0.52){
                            //GameLog.c("### Face Top(R).");
                            DirType = EGameObjectAnimDirection.EGOD_Top;
                        }
                        else{
                            //GameLog.c("### Face Right Top.");
                            DirType = EGameObjectAnimDirection.EGOD_RightTop;
                        }
                    }
                    else{
                        var angle_Y = cc.pAngle(cc.p(0, -1), cc.p(subX, subY));
                        if(angle_Y < 0.52){
                            //GameLog.c("### Face Down(R).");
                            DirType = EGameObjectAnimDirection.EGOD_Down;
                        }
                        else{
                            //GameLog.c("### Face Right Down.");
                            DirType = EGameObjectAnimDirection.EGOD_RightDown;
                        }
                    }
                }
            }
            else if(subX < 0){
                this.flippedRootSpriteX(true);
                var angle_X = cc.pAngle(cc.p(-1, 0), cc.p(subX, subY));
                if(subY === 0 || angle_X < 0.52){
                    //GameLog.c("### Face Left.");
                    DirType = EGameObjectAnimDirection.EGOD_Left;
                }
                else{
                    if(subY > 0){
                        var angleY = cc.pAngle(cc.p(0, 1), cc.p(subX, subY));
                        if(angleY < 0.52){
                            //GameLog.c("### Face Top(L).");
                            DirType = EGameObjectAnimDirection.EGOD_Top;
                        }
                        else{
                            //GameLog.c("### Face Left Top.");
                            DirType = EGameObjectAnimDirection.EGOD_LeftTop;
                        }
                    }
                    else{
                        var angle_Y = cc.pAngle(cc.p(0, -1), cc.p(subX, subY));
                        if(angle_Y < 0.52){
                            //GameLog.c("### Face Down(L).");
                            DirType = EGameObjectAnimDirection.EGOD_Down;
                        }
                        else{
                            //GameLog.c("### Face Left Down.");
                            DirType = EGameObjectAnimDirection.EGOD_LeftDown;
                        }
                    }
                }
            }
            else{
                this.flippedRootSpriteX(false);
                if(subY > 0){
                    //GameLog.c("### move to Top.");
                    DirType = EGameObjectAnimDirection.EGOD_Top;
                }
                else if(subY < 0){
                    //GameLog.c("### move to Down.");
                    DirType = EGameObjectAnimDirection.EGOD_Down;
                }
                else{
                    GameLog.c("### no need to move.");
                }
            }
        }

        return DirType;
    },

    clearMoveInfo: function(){
        this._MoveToPt = null;
    },

    canTakeDamage: function(){
        return this._bTakeDamaged;
    },

    takeDamaged: function(Damage){
        return Damage;
    },

    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
     * @function
     */
    ctor: function(defLvl){
        if(defLvl !== undefined){
            this._iDefaultLvl = defLvl;
        }

        this._super();

        //! 1: Load data from csv
        if(this._initDefaultData()){
            this._setObjContentSize();
            //! 2: Init Render Info
            this._initRenderObjInfo();
        }
        else{
            GameLog.w("GameObjectBase::_initDefaultData() failed.   className=%s", this._className);
        }
    },

    _initDefaultData: function(){
        GameLog.c("GameObjectBase::_initDefaultData()");
        return false;
    },

    _setObjContentSize: function(newSize){

    },

    _refreshDefaultData: function(){

    },

    _refreshAnimOffset: function(){

    },

    /**
     * Initializes the instance of cc.Node
     * @function
     * @returns {boolean} Whether the initialization was successful.
     */
    init: function () {
        GameLog.c("GameObjectBase::init()");
        return true;
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
        this._gameTimeDelta += dt;
    }
})
