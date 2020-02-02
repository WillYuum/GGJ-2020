const { ccclass, property } = cc._decorator;

enum problemTypes {
    VeryHard,
    Hard,
    Medium,
    Easy
}

enum signals {
    fixedVeryHard,
    fixedHard,
    fixedMedium,
    fixedEasy,
}


@ccclass
export default class ProblemManager extends cc.Component {

    @property(cc.RichText) problemText: cc.Label = null

    VeryHardFixed: boolean = false;
    HardFixed: boolean = false;
    MediumFixed: boolean = false;
    EasyFixed: boolean = false;

    ProblemOne: any;
    ProblemTwo: any;
    ProblemThree: any;
    onLoad() {
        this.ProblemOne = {
            text: `<color=${this.handleChangeColor()}>Help me open this Jar!</color>`,
            type: problemTypes.Easy,
        }
        this.ProblemTwo = [{

            text: `<color=${() => this.handleChangeColor()}>Help me get Beth back</color>`,
            type: problemTypes.Easy

        }]
        this.ProblemThree = [{
            text: `<color=${() => this.handleChangeColor()}>Teach me to take two strokes out of my golf game!</color>`,
            type: problemTypes.VeryHard
        },
        {
            text: `<color=${() => this.handleChangeColor()}>Teach me</color><color=${() => this.handleChangeColor()}> to take</color><color=${() => this.handleChangeColor()}> two strokes out of my golf game!</color>`,
            type: problemTypes.Hard
        },
        {
            text: `<color=${() => this.handleChangeColor()}>Teach me to take two strokes out of my gold game!</c>`,
            type: problemTypes.Medium,
        },
        {
            text: `<color=${() => this.handleChangeColor()}Teach me to take two strokes out of my gold game!</c>`,
            type: problemTypes.Easy
        }]
    }


    Problems: Array<any> = [];
    start() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, (event) => {
            if (event.keyCode === cc.macro.KEY.space) {
                this.HandlePlayProblems()
            }
            if (event.keyCode === cc.macro.KEY.a) {
                this.node.emit(signals.fixedVeryHard.toString())
                this.VeryHardFixed = true;

            }
            if (event.keyCode === cc.macro.KEY.s) {
                this.node.emit(signals.fixedHard.toString())
                this.HardFixed = true;
            }
            if (event.keyCode === cc.macro.KEY.d) {
                this.node.emit(signals.fixedMedium.toString())
                this.MediumFixed = true;
            }
            if (event.keyCode === cc.macro.KEY.f) {
                this.node.emit(signals.fixedEasy.toString())
                this.EasyFixed = true
            }
        })

        this.Problems = [
            this.ProblemOne,
            this.ProblemTwo,
            this.ProblemThree,
        ];
        console.log(this.Problems)

    }

    currentProblemIndex: number = 0;
    currentSubProblem: number = 0

    MakeProblemSmaller() {
        this.currentSubProblem += 1
    }

    PlayNextProblem() {
        if (this.currentSubProblem >= this.Problems[this.currentProblemIndex].length - 1) {
            this.currentProblemIndex += 1;
        } else {
            this.MakeProblemSmaller();
        }
    }

    HandlePlayProblems() {
        console.log(this.Problems[this.currentProblemIndex][this.currentSubProblem])
        let problem = this.Problems[this.currentProblemIndex][this.currentSubProblem];
        console.log(problem)
        this.problemText.string = problem.text
        this.PlayNextProblem();
    }

    update(dt) {

    }
    VeryHard = "#8b0000";
    Hard = "#ff0000";
    Medium = "#ffff00";
    Easy = "#00ff00";


    handleChangeColor() {
        this.node.on(signals.fixedVeryHard.toString(), () => {
            if (this.VeryHardFixed) {
                return "#ffffff";
            } else {
                return this.VeryHard;
            }
        })
        this.node.on(signals.fixedHard.toString(), () => {
            if (this.HardFixed) {
                return "#ffffff";
            } else {
                return this.Hard;
            }
        })
        this.node.on(signals.fixedMedium.toString(), () => {
            if (this.MediumFixed) {
                return "#ffffff";
            } else {
                return this.Medium;
            }
        })
        this.node.on(signals.fixedEasy.toString(), () => {
            if (this.EasyFixed) {
                return "#ffffff";
            } else {
                console.log(this.Easy)
                return this.Easy;
            }
        })
    }
}





