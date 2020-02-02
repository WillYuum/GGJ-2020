import { get } from "http";

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

    // onLoad () {}

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
                console.log("emmiting")
                this.node.emit(signals.fixedEasy.toString())
                console.log("done emmiting")

                this.EasyFixed = true
            }
        })
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
        let problem = this.Problems[this.currentProblemIndex][this.currentSubProblem];
        this.problemText.string = `${problem.text ? problem.text : ''} ${problem.type2 ? problem.type2 : ""} ${problem.text3 ? problem.text3 : ""}`;
        console.log(this.problemText.string)
        this.PlayNextProblem();
    }

    HardColor = "#8b0000";
    MediumColor = "#ff0000";
    EasyColor = "#ffff00";
    DoneColor = "#ffffff"


    update(dt) {
    }

    Problems = [
        //Problem One
        [
            {
                text: `<color=${this.EasyColor}>Help me open this Jar!</c>`,
                type: problemTypes.Easy,
            },
        ],
        //Problem Two
        [
            {
                text: `<color=${this.HardColor}>Teach me to take two strokes out of my golf game!</c>`,
                type: problemTypes.VeryHard,
            },
            {
                text: `<color=${this.HardColor}>Teach me to take </c>`,
                type: problemTypes.Hard,
                text2: `<color=${this.MediumColor}> two strokes out</c>`,
                type2: problemTypes.Medium,
                text3: `<color=${this.EasyColor}>of my golf game!</c>`,
                type3: problemTypes.Easy,
            },
            {
                text: `<color=${this.MediumColor}>Teach me to take two</color>`,
                type: problemTypes.Medium,
                text2: `<color=${this.EasyColor}>strokes out of my gold game!</color>`,
                type2: problemTypes.Easy,
            },
        ]
    ]
}