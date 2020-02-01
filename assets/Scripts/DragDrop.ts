const { ccclass, property } = cc._decorator;
import BrainChunk from "./BrainChunk"

@ccclass
export default class DragDrop extends cc.Component {

    static instance: DragDrop = null;

    draggable: boolean = false;

    current_dragging_node: cc.Node;

    mouse_x: number = 0;
    mouse_y: number = 0;

    selectBrainChunk: cc.Node;

    init_x: number = 0;
    init_y: number = 0;


    onLoad() {
        DragDrop.instance = this;
        this.node.on(cc.Node.EventType.MOUSE_MOVE, (event) => {
            this.mouse_x = event.getLocation().x;
            this.mouse_y = event.getLocation().y;
        });

        this.node.on(cc.Node.EventType.MOUSE_UP, () => {
            DragDrop.instance.draggable = false;
            if (this.current_dragging_node.getComponent(BrainChunk).hoveringOverSlot) {

            } else {
                DragDrop.instance.current_dragging_node.setPosition(DragDrop.instance.init_x, DragDrop.instance.init_y);

            }
        });
    }

    start() { }

    update(dt) {
        if (DragDrop.instance.draggable) {
            DragDrop.instance.current_dragging_node.x = this.mouse_x - (this.node.width / 2);
            DragDrop.instance.current_dragging_node.y = this.mouse_y - (this.node.height / 2);
        }
    }

    setDraggableObject(nodeObjectToBeDraggable: cc.Node) {

        nodeObjectToBeDraggable.on(cc.Node.EventType.MOUSE_DOWN, (event) => {
            DragDrop.instance.init_x = nodeObjectToBeDraggable.position.x;
            DragDrop.instance.init_y = nodeObjectToBeDraggable.position.y;

            DragDrop.instance.current_dragging_node = nodeObjectToBeDraggable;
            DragDrop.instance.draggable = true;
        });
    }


    DropBrainChunkToSlot(slot: cc.Node, brainChunk: cc.Node) {

    }



}
