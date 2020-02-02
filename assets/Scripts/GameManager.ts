import DragDrop from "./DragDrop";
import ProblemManager from "./ProblemManager";
import BrainChunk from "./BrainChunk";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {

    onLoad() {
        cc.director.getCollisionManager().enabled = true;
    }

    start() {

    }

    HelpJerry() {
        this.solveHardProblem(DragDrop.instance.assignedBrainsToSlots)

    }

    solveHardProblem(collectedBrainChunks) {
        let KillJerryCondition: boolean = false
        let TrainJerryCondition: boolean = false
        collectedBrainChunks.foreach((brainChunk) => {
            if (brainChunk.getComponent(BrainChunk).selectedBrainPower === 0) {
                KillJerryCondition = true;
            }
            if (brainChunk.getComponent(BrainChunk).selectedBrainPower === 1) {
                TrainJerryCondition = true;
            }
        })

        if (KillJerryCondition && TrainJerryCondition) {
            return true
        } else {
            DragDrop.instance.BreakTheWholeBrain();
        }


    }

    solveMediumProblem(collectedBrainChunks) {
        let TrainJerryCondtion: boolean = false;
        let SmackJarryCondition: boolean = false;

        collectedBrainChunks.foreach((brainChunk)=>{
            if(brainChunk.getComponent(BrainChunk).selectedBrainPower === 1){
                TrainJerryCondtion = true;
            }
            if(brainChunk.getComponent(BrainChunk).selectedBrainPower === 1){
                SmackJarryCondition = true;
            }
        })

        if(TrainJerryCondtion && SmackJarryCondition){
            return true
        }else{
            DragDrop.instance.BreakTheWholeBrain()
        }
    }

    solveSmallProblem() {

    }

    // update (dt) {}
}
