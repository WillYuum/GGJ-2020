const { ccclass, property } = cc._decorator;

@ccclass
export default class Meeseeks extends cc.Component {


    @property(cc.ProgressBar) stressLevelBar: cc.ProgressBar = null;

    startingStressLevel: number = 1;
    currentStressLevel: number;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.currentStressLevel = this.startingStressLevel
        this.stressLevelBar.progress = this.startingStressLevel;
    }

    start() {

    }

    update (dt) {}

    IncrementPressure(amount: number) {
        this.stressLevelBar.progress += amount;
    }

    DecreasePressure(amount: number) {
        this.stressLevelBar.progress -= amount;
    }
}
