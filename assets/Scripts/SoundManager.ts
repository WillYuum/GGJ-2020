
const MAX_AUDIO = 10;
const MAX_NUM_SAME_TIME = 4;
const PATH_BGM = 'audio/bgm';
const PATH_SFX = 'audio/sfx';

enum signals {
    load_complete
}

class SoundManager {
    static readonly signals = signals;

    emitter: cc.Node = new cc.Node('Sound');

    get signals() {
        return signals;
    }

    onload() {
        this.emitter.on(
            this.signals.load_complete.toString(),
            () => {
                console.log("hi")
                console.log(this._audioSfxs)
            }
        )

        this.loadAllAudio()
    }


    _audioBgms: any = {};

    _audioSfxs: any = {};

    _playingClips: any = [];

    _settings: any;

    constructor() {
        console.log('Constructed: SOUND MANAGER.');
        this._audioBgms = {};
        this._audioSfxs = {};
        this._settings = {};

        cc.audioEngine.setMaxAudioInstance(MAX_AUDIO);
        cc.director.on(cc.Director.EVENT_AFTER_SCENE_LAUNCH, () => {
            this._playingClips = [];
            cc.log('stop all sound');
            cc.audioEngine.stopAll();
        });

        // this.loadSetting();
    }

    //   resume_audio_context() {
    //     let canvas = cc.find('Canvas');
    //     if (canvas) {
    //       canvas.on(cc.Node.EventType.TOUCH_END, () => {
    //         let context = cc.sys.__audioSupport.context;
    //         if (context && context.state === 'suspended' ||
    //             context.state === 'interrupted') {
    //           context.resume();
    //         }
    //       }, this, true);
    //     }
    //   }

    // NOTE: This needs to be called during the loading process
    bgm_loaded = false;
    sfx_loaded = false;
    loadAllAudio(): Promise<any> {
        console.log('Attempt to load audio');
        let promises = [];
        let promiseBgm = new Promise((resolve, reject) => {
            cc.loader.loadResDir(
                PATH_BGM, cc.AudioClip, (error, audioClips: cc.AudioClip[]) => {
                    if (error) {
                        console.warn('Error loading BGM dir');
                        reject(error);
                    } else {
                        audioClips.forEach((audioClip: cc.AudioClip) => {
                            let id = audioClip.name;
                            this._audioBgms[id] = audioClip;
                        });
                        // PICK WHICH MUSIC TO PLAY NOW
                        this.bgm_loaded = true;
                        if (this.sfx_loaded) {
                            this.emitter.emit(
                                SoundManager.signals.load_complete.toString());
                        }
                        console.log('Loaded BGM ' + JSON.stringify(this._audioBgms));
                        resolve();
                    }
                });
        });

        let promiseSfx = new Promise((resolve, reject) => {
            cc.loader.loadResDir(
                PATH_SFX, cc.AudioClip, (error, audioClips: cc.AudioClip[]) => {
                    if (error) {
                        console.warn('Error loading SFX dir');
                        reject(error);
                    } else {
                        audioClips.forEach((audioClip: cc.AudioClip) => {
                            let id = audioClip.name;
                            this._audioSfxs[id] = audioClip;
                        });
                        this.sfx_loaded = true;
                        if (this.bgm_loaded) {
                            this.emitter.emit(
                                SoundManager.signals.load_complete.toString());
                        }
                        console.log('Loaded SFX ' + JSON.stringify(this._audioSfxs));
                        resolve();
                    }
                });
        });

        promises.push(promiseBgm);
        promises.push(promiseSfx);
        return Promise.all(promises);
    }

    get isEnableBGM() {
        return this._getBGMVolume() > 0;
    }

    get isEnableSfx() {
        return this._getSfxVolume() > 0;
    }

    _getBGMVolume() {
        let volume = this._settings.bgmVolume;
        if (volume === undefined) {
            volume = 1;
        }
        return volume;
    }

    _getSfxVolume() {
        let volume = this._settings.sfxVolume;
        if (volume === undefined) {
            volume = 1;
        }
        return volume;
    }

    setBGMVolume(value) {
        for (let clipInstance of this._playingClips) {
            if (this._audioBgms[clipInstance.id]) {
                cc.audioEngine.setVolume(
                    clipInstance.clip,
                    value === undefined ? clipInstance.volume : value);
            }
        }

        this._settings.bgmVolume = value;

        // this.saveSetting();
    }

    setSfxVolume(value) {
        for (let clipInstance of this._playingClips) {
            if (this._audioSfxs[clipInstance.id]) {
                cc.audioEngine.setVolume(
                    clipInstance.clip,
                    value === undefined ? clipInstance.volume : value);
            }
        }

        this._settings.sfxVolume = value;

        // this.saveSetting();
    }

    muteAll() {
        this._updateVolume(0);
    }

    unmuteAll() {
        this._updateVolume();
    }

    _updateVolume(volume?: number) {
        for (let clipInstance of this._playingClips) {
            cc.audioEngine.setVolume(
                clipInstance.clip,
                volume === undefined ? clipInstance.volume : volume);
        }
    }

    stopBGM(id: string) {
        let audioClip = this._audioBgms[id];
        if (!audioClip) {
            return;
        }
        this.stop(id, true);
    }

    stopSfx(id: string) {
        let audioClip = this._audioSfxs[id];
        if (!audioClip) {
            return;
        }
        this.stop(id);
    }

    stop(id: string, pause: boolean = false) {
        for (let i = this._playingClips.length; i >= 0; i--) {
            let current = this._playingClips[i];
            if (!current) {
                this._playingClips.splice(i, 1);
                continue;
            }
            if (current.id !== id) {
                continue;
            }
            // if (pause) {
            //   cc.audioEngine.pause(current.clip);
            // }
            // else {
            cc.audioEngine.stop(current.clip);
            // }
            this._playingClips.splice(i, 1);
        }
    }

    playBGM(id: string, loop: boolean = true, volume: number = 1) {
        let audioClip = this._audioBgms[id];
        if (!audioClip) {
            console.warn('Audio clip not loaded! ' + String(id));
            return;
        }
        volume *= this._getBGMVolume();
        this.play(id, audioClip, loop, volume);
    }

    playSfx(id: string, loop: boolean = false, volume: number = 1) {
        let audioClip = this._audioSfxs[id];
        if (!audioClip) {
            console.warn('Audio clip not loaded! ' + String(id));
            return;
        }
        volume *= this._getSfxVolume();
        if (volume > 0) {
            this.play(id, audioClip, loop, volume);
        } else {
            console.warn('Volume too low' + String(id));
        }
    }

    play(id: string, audioClip: cc.AudioClip, loop: boolean, volume: number) {
        // if (!Config.instance || !Config.instance.sounds_enabled()) {
        //     console.log("Sound disabled.");
        //     return;
        //   }
        this.resume_audio_context();

        // console.log("Attempt to play " + String(id));
        let current = this._playingClips.find((child) => child.id === id);
        if (current && !this.canPlayNew(id, loop, volume, current)) {
            console.warn('Cannot play new! ' + String(id));
            return;
        }
        if (cc.sys.OS_ANDROID === cc.sys.os &&
            this._playingClips.length > MAX_AUDIO) {
            let index = this._playingClips.findIndex((child) => !child.loop);
            let clips = this._playingClips.splice(index, 1);
            cc.audioEngine.stop(clips[0].clip);
        }

        let clipId = cc.audioEngine.play(audioClip, loop, volume);
        cc.audioEngine.setVolume(clipId, volume);
        cc.audioEngine.setFinishCallback(clipId, () => {
            let index = this._playingClips.findIndex(
                (child) => child.id === id && child.clip === clipId);
            this._playingClips.splice(index, 1);
        });
        this._playingClips.push({
            id: id,
            clip: clipId,
            loop: loop,
            volume: volume,
        });
    }

    canPlayNew(id: string, loop: boolean, volume: number, current: {
        id: string; clip: number; loop: boolean; volume: number
    }) {
        if (loop !== current.loop) {
            cc.warn('╮(๑•́ ₃•̀)╭');
            return false;
        } else if (loop && cc.audioEngine.getVolume(current.clip) === 0) {
            cc.audioEngine.setVolume(current.clip, volume);
            return false;
        } else if (loop) {
            return false;
        }
        if (cc.sys.OS_ANDROID !== cc.sys.os) {
            return true;
        }
        let clipCount = 0;
        for (let clipInstance of this._playingClips) {
            clipCount += clipInstance.id === id ? 1 : 0;
        }
        if (clipCount >= MAX_NUM_SAME_TIME) {
            cc.audioEngine.setVolume(current.clip, volume);
            return false;
        }
        return true;
    }

    saveSetting() {
        cc.sys.localStorage.setItem('kiki:sound', JSON.stringify(this._settings));
    }

    loadSetting() {
        let jsonStr = cc.sys.localStorage.getItem('kiki:sound');
        this._settings = {};
        try {
            this._settings = JSON.parse(jsonStr) || {};
        } finally {
        }
    }
}

const sound = new SoundManager;

export default sound;