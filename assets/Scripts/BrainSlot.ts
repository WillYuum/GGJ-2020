import DragDrop from "./DragDrop";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BrainSlot extends cc.Component {

    SlotIsAssigned: boolean;

    onLoad() {
        this.SlotIsAssigned = false;
    }

    start() {
        
    }

    // update (dt) {}
}
