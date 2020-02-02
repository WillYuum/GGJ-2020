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
        const x = this.node.getComponent(ProblemManager).getSignals()
        console.log("here", x)
        this.solveHardProblem(DragDrop.instance.assignedBrainsToSlots);
        this.solveMediumProblem(DragDrop.instance.assignedBrainsToSlots);
        this.solveEasyProblem(DragDrop.instance.assignedBrainsToSlots);

    }

    solveHardProblem(collectedBrainChunks) {
        console.log("solving hard problem");
        let KillJerryCondition: boolean = false
        let TrainJerryCondition: boolean = false
        collectedBrainChunks.foreach((brainChunk) => {
            if (brainChunk.getComponent(BrainChunk).selectedBrainPower !== 0 || 1){
                console.log("solving hard problem failed because of wrong pattern")
                return;
            }

            if (brainChunk.getComponent(BrainChunk).selectedBrainPower === 0) {
                KillJerryCondition = true;
            }
            if (brainChunk.getComponent(BrainChunk).selectedBrainPower === 1) {
                TrainJerryCondition = true;
            }
        })

        if (KillJerryCondition && TrainJerryCondition) {
            console.log("finished solving a problem")
        } else {
            DragDrop.instance.BreakTheWholeBrain();
            return;
        }


    }

    solveMediumProblem(collectedBrainChunks) {
        console.log("trying to solve medium problem");
        let TrainJerryCondtion: boolean = false;
        let SmackJarryCondition: boolean = false;

        collectedBrainChunks.foreach((brainChunk) => {
            if (brainChunk.getComponent(BrainChunk).selectedBrainPower !== 0 || 1){
                console.log("there was wrong in pattern in medium");
                return;
            } 

            if (brainChunk.getComponent(BrainChunk).selectedBrainPower === 1) {
                TrainJerryCondtion = true;
            }
            if (brainChunk.getComponent(BrainChunk).selectedBrainPower === 2) {
                SmackJarryCondition = true;
            }
        })

        if (TrainJerryCondtion && SmackJarryCondition) {
            console.log("solved the medium problem");
            return true;
        } else {
            DragDrop.instance.BreakTheWholeBrain();
            return;
        }
    }

    solveEasyProblem(collectedBrainChunks) {
        console.log("solving easy problem")
        let TrainingJerryCondition = false;

        collectedBrainChunks.foreach((brainChunk) => {
            if (brainChunk.getComponent(BrainChunk).selectedBrainPower !== 1) {
                console.log("there was wrong in the pattern in hard");
                return;
            }


            if (brainChunk.getComponent(BrainChunk).selectedBrainPower === 1) {
                TrainingJerryCondition = true;
            }
        })

        if (TrainingJerryCondition) {
            console.log("finished solving easy problem");
        } else {
            DragDrop.instance.BreakTheWholeBrain();
            return;
        }


    }

    // update (dt) {}
}
