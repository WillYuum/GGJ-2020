const { ccclass, property } = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {

    // @property(cc.Label) problemText:cc.Label = null


    onLoad() {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
    }

    start() {

    }

    // update (dt) {}
}
