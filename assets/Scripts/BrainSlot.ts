import DragDrop from "./DragDrop";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BrainSlot extends cc.Component {

    SlotIsAssigned: boolean;

    onLoad() {
        this.SlotIsAssigned = false;
        this.node.addComponent(cc.CircleCollider).radius = 20;
    }

    start() {
        
    }

    // update (dt) {}
}
