const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {




    onLoad() {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
    }

    start() {

    }

    // update (dt) {}
}
