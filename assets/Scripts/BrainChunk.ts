import DragDrop from "./DragDrop";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BrainChunk extends cc.Component {

    defaultPos: cc.Vec2 = this.node.position;

    // onLoad() {

    // }

    hoveringOverSlot: boolean = false;

    start() {
        this.addComponent(cc.CircleCollider).radius = 455;
        DragDrop.instance.setDraggableObject(this.node);
        cc.director.getCollisionManager().enabled = true;
    }

    // update (dt) {}

    onCollisionEnter(other, self) {
        this.hoveringOverSlot = true;
    }

    onCollisionExit(other, self) {
        this.hoveringOverSlot = false;
    }
}
