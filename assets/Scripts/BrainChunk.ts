import DragDrop from "./DragDrop";
import BrainSlot from "./BrainSlot"

const { ccclass, property } = cc._decorator;

@ccclass
export default class BrainChunk extends cc.Component {

    defaultPos: cc.Vec2;

    // onLoad() {

    // }

    hoveringOverSlot: boolean;

    start() {
        this.defaultPos = this.node.getPosition();
        this.hoveringOverSlot = false;

        this.addComponent(cc.CircleCollider).radius = 300;
        DragDrop.instance.setDraggableObject(this.node);
        cc.director.getCollisionManager().enabled = true;
    }

    // update (dt) {}

    onCollisionEnter(other, self) {
        console.log("Brain Chunk is hovering over", other.node.name)
        console.log(other)

        //check if the slot is reserved
        console.log(other.getComponent(BrainSlot).SlotIsAssigned);
        this.node.on(cc.Node.EventType.MOUSE_UP, () => {
            if (!other.getComponent(BrainSlot).SlotIsAssigned) {

                this.hoveringOverSlot = true;

                DragDrop.instance.getBrainSlotPosition(other.node.getPosition());
                DragDrop.instance.MakeBrainSlotReserved(other.node);
            } else {
                DragDrop.instance.draggingBrainChunk.setPosition(DragDrop.instance.selectedBrainSlotPos);
            }
        })
    }

    onCollisionExit(other, self) {
        console.log("Brain Chunk is out");
        this.hoveringOverSlot = false;
    }
}
