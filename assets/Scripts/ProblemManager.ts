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

    static readonly signals = signals;

    getSignals() {
        return signals;
    }

    @property(cc.RichText) problemText: cc.Label = null;

    VeryHardFixed: boolean = false;
    HardFixed: boolean = false;
    MediumFixed: boolean = false;
    EasyFixed: boolean = false;

    // onLoad () {}

    start() {

        this.scheduleOnce(() => this.HandlePlayProblems(), 3)
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
        if (this.Problems[this.currentProblemIndex].length === this.currentProblemIndex) {
            this.problemText.string = "Jerry can live in peace, so do meeseeks :D"
        }

        let problem = this.Problems[this.currentProblemIndex][this.currentSubProblem];
        this.problemText.string = `${problem.text ? problem.text : ''} ${problem.type2 ? problem.type2 : ""} ${problem.text3 ? problem.text3 : ""}`;
        this.getCurrentProblems(problem);
        console.log(this.problemText.string)
        this.PlayNextProblem();
    }
    currentProblems: Array<any> = []
    getCurrentProblems(problem) {
        problem.type ? this.currentProblems.push(problem.type) : null;
        problem.type2 ? this.currentProblems.push(problem.type2) : null;
        problem.type3 ? this.currentProblems.push(problem.type3) : null;
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
                text: `<color=${this.MediumColor}>Teach me to take two</c>`,
                type: problemTypes.Medium,
                text2: `<color=${this.EasyColor}>strokes out of my gold game!</c>`,
                type2: problemTypes.Easy,
            },
        ]
    ]
}