const { ccclass, property } = cc._decorator;
import BrainChunk from "./BrainChunk"
import BrainSlot from "./BrainSlot"

@ccclass
export default class DragDrop extends cc.Component {

    static instance: DragDrop = null;

    draggable: boolean = false;

    draggingBrainChunk: cc.Node;

    defaultDraggingBrainChunkScale: number;

    mouse_x: number = 0;
    mouse_y: number = 0;

    init_x: number = 0;
    init_y: number = 0;


    onLoad() {
        DragDrop.instance = this;

        DragDrop.instance.node.on(cc.Node.EventType.MOUSE_MOVE, (event) => {
            DragDrop.instance.mouse_x = event.getLocation().x;
            DragDrop.instance.mouse_y = event.getLocation().y;
        });

        DragDrop.instance.node.on(cc.Node.EventType.MOUSE_UP, () => {
            DragDrop.instance.draggable = false;

            //return default scale for draggingBrainChunk
            DragDrop.instance.draggingBrainChunk.scale = DragDrop.instance.defaultDraggingBrainChunkScale;

            //check if brain chunk is over slot to be able to add it to the slot
            if (DragDrop.instance.draggingBrainChunk.getComponent(BrainChunk).hoveringOverSlot) {
                console.log("setting the brain into the slot");

                //set Brain Chunk to specific slot
                DragDrop.instance.draggingBrainChunk.setPosition(this.selectedBrainSlotPos);

                DragDrop.instance.draggingBrainChunk.getComponent(BrainChunk).hoveringOverSlot = false;
                this.assignedBrainsToSlots.push(DragDrop.instance.draggingBrainChunk);
            } else {

                //get brain chunk to it primary position
                DragDrop.instance.draggingBrainChunk.setPosition(DragDrop.instance.init_x, DragDrop.instance.init_y);
                DragDrop.instance.draggingBrainChunk.getComponent(BrainChunk).hoveringOverSlot = false;
            }
        });
    }

    start() { }

    update(dt) {
        if (DragDrop.instance.draggable) {
            DragDrop.instance.draggingBrainChunk.x = this.mouse_x - (this.node.width / 2);
            DragDrop.instance.draggingBrainChunk.y = this.mouse_y - (this.node.height / 2);
        }
    }


    setDraggableObject(BrainChunkToBeDragged: cc.Node) {

        BrainChunkToBeDragged.on(cc.Node.EventType.MOUSE_DOWN, (event) => {
            DragDrop.instance.init_x = BrainChunkToBeDragged.position.x;
            DragDrop.instance.init_y = BrainChunkToBeDragged.position.y;

            DragDrop.instance.draggingBrainChunk = BrainChunkToBeDragged;
            DragDrop.instance.draggable = true;

            //scale up the brainChunk while dragging
            DragDrop.instance.defaultDraggingBrainChunkScale = DragDrop.instance.draggingBrainChunk.scale;
            DragDrop.instance.draggingBrainChunk.scale += 0.05;
        });
    }

    selectedBrainSlotPos: cc.Vec2;
    getBrainSlotPosition(brainSlot: cc.Vec2) {
        DragDrop.instance.selectedBrainSlotPos = brainSlot;
    }

    //keep following up with the brain chunk to see if it used 
    assignedBrainsToSlots: Array<cc.Node> = [];
    BreakTheWholeBrain() {
        console.log("breaking the brain");
        DragDrop.instance.assignedBrainsToSlots.forEach((brainChunk) => {
            brainChunk.setPosition(brainChunk.getComponent(BrainChunk).defaultPos);
        });

        this.ReservedSlots.forEach((brainSlot) => {
            brainSlot.getComponent(BrainSlot).SlotIsAssigned = false;
        })

        //emptying reserved slots
        this.ReservedSlots = [];
    }


    //make the selected slot get assigned as reseverd and keep track of the slots
    ReservedSlots: Array<cc.Node> = [];
    MakeBrainSlotReserved(slot: cc.Node) {
        slot.getComponent(BrainSlot).SlotIsAssigned = true;
        this.ReservedSlots.push(slot);
    }




}
