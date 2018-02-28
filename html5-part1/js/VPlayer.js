let VPlayer = class {
    constructor(videoClassName, playListClassName, vSource, enableLogging = false) {
        this.videoPlayer = document.querySelector(`video.${videoClassName}`);
        this.videoSource = document.querySelector(`source.${videoClassName}`);
        this.PL_className = playListClassName;
        this.vSource = vSource;
        this.pbQueue = new Map();
        this.pbQueueArr = [];
        this.pbTypeConseq = true;
        this.lastVideo = {};
        this.isLoaded = false;
        this.shuffled = false;
        this.useLogger = enableLogging;
    }

    get pbConseq() {
        return this.pbTypeConseq;
    }

    set pbConseq(pb_type) {
        this.pbTypeConseq = pb_type;
        // if (!pb_type) this.queueShuffle();
    }

    togglePlayPause(vID = this.pbQueueIter.next().value, posterStr = '') {
        if (this.lastVideo.id !== undefined && this.lastVideo.id === vID) { // видео с таким id в данный момент уже загружено
            if (this.videoPlayer.paused) {
                this.videoPlayer.play();
            } else {
                if (this.isLoaded) {
                    this.videoPlayer.pause();
                } else {
                    this.logger('Video was not loaded yet...');
                }
            }
        } else { // видео с таким id НЕ загружено в плеер
            if (this.lastVideo.id !== undefined) this.setTimePlayBackPosition(0);
            let vType = this.pbQueue.get(vID);
            if (vType === undefined) vType = document.querySelector(`#pl_${vID}`).dataset.vtype;
            if (posterStr === '') posterStr = `img/${vID}_snapshot.jpg`;
            let pl_elem = document.querySelector(`#pl_${vID}`).dataset.src;
            let v_src = (pl_elem) ? pl_elem : `${this.vSource}${vID}.${vType}`;
            VPlayer.togglePL_state(vID, this.lastVideo.id);

            document.querySelector('.vplayer-ctitle').innerHTML =
                document.querySelector(`#pl_${vID} .card-title`).innerText;
            document.querySelector('.vplayer-ctext').innerHTML =
                document.querySelector(`#pl_${vID} .card-text`).innerText;
            if (this.videoPlayer.canPlayType(`video/${vType}`) === '') {  // формат видео не поддерживается браузером
                this.logger(`формат видео 'video/${vType}' не поддерживается вашим браузером`);
                return false;
            }
            setTimeout(() => {
                this.videoPlayer.pause();
                this.isLoaded = false;
                this.videoSource.setAttribute('src', v_src);
                this.videoSource.setAttribute('type', `video/${vType}`);
                this.videoPlayer.setAttribute('poster', posterStr);
                this.videoPlayer.dataset.src_id = vID;
                this.videoPlayer.load();
                let playPromise = this.videoPlayer.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        // Automatic playback started!
                        this.isLoaded = true;
                        this.logger(`Video ${vID} is loaded!`);
                        // We can now safely pause video...
                    })
                        .catch(error => {
                            this.logger('Auto-play was prevented with error: ', error);
                        });
                }
            }, 500);
            this.lastVideo.id = vID;
            this.lastVideo.src = v_src;
            this.lastVideo.type = `video/${vType}`;
            this.lastVideo.poster = posterStr;
        }
        return this.isLoaded;
    }

    resumePB() {
        if (this.pbQueue.size !== 0 || this.isPaused()) {
            if (undefined !== this.lastVideo.id) {
                this.videoPlayer.play();
            } else {
                this.togglePlayPause();
            }
        } else if (this.pbQueue.size === 0) {
            this.queueCreate();
            this.togglePlayPause();
        }
    }

    pausePB() {
        if (!this.isPaused()) this.videoPlayer.pause();
    }

    stopPB() {
        if (undefined !== this.lastVideo.id && this.videoPlayer.currentTime > 0) {
            this.pausePB();
            this.videoPlayer.currentTime = 0;
        }
    }

    isPaused() {
        return (this.videoSource.getAttribute('src') !== '' && this.videoPlayer.paused && !this.videoPlayer.ended);
    }

    /**
     * Sets time to rewind current video playback to
     * @param pos - time position in seconds or as a relation to 1 (if relative set to true)
     * @param relative
     */
    setTimePlayBackPosition(pos, relative = false) {
        if (!this.isLoaded) return;
        this.videoPlayer.currentTime = (relative) ? pos * this.videoPlayer.duration : pos;
    }

    toggleMute(state) {
        this.videoPlayer.muted = state;
        return (this.videoPlayer.muted) ? 0 : this.videoPlayer.volume;
    }

    setVolume(vol) {
        this.videoPlayer.volume = vol;
    }

    /**
     * создает очередь из текущего контента плейлиста,
     * в случае триггера случайного воспроизведения - также перемешивает очередь
     */
    queueCreate() {
        if (this.pbQueue.size === 0) {
            let PL = document.querySelectorAll(`.${this.PL_className}`), id, vType;
            if (PL.length !== 0) {
                for (let elem of PL) {
                    id = elem.getAttribute('id').substr(3);
                    vType = elem.dataset.vtype;
                    this.pbQueue.set(id, vType);
                }
                this.logger('Очередь воспроизведения создана:', this.pbQueue);
            } else {
                return false;
            }
            if (!this.pbConseq && !this.shuffled) {
                this.pbQueue = new Map(this.queueShuffle(this.pbQueue));
                this.logger('очередь воспроизведения перемешана:', this.pbQueue);
                this.shuffled = true;
            }
            this.pbQueueArr = [...this.pbQueue.keys()];
            this.pbQueueIter = this.pbQueue.keys();
            // this.resumePB();
            return true;
        }
    }

    queueAddTo(id, vType) {
        if (this.pbQueue.size !== 0) {
            this.pbQueue.set(id, vType);
            this.logger('Очередь воспроизведения расширена:', this.pbQueue);
        }
        if (this.lastVideo.id === id) VPlayer.togglePL_state(id, null);
    }

    queueDelFrom(id) {
        // if (this.pbQueue.size === 0) return;
        if (this.pbQueue.size !== 0) {
            this.pbQueue.delete(id);   //this.pbQueue.splice(this.pbQueue.indexOf(id), 1);
            this.pbQueueArr.splice(this.pbQueueArr.indexOf(id), 1);
        }
        if (this.pbQueue.size === 0) {
            this.logger('Очередь воспроизведения очищена');
        } else {
            this.logger('Очередь воспроизведения уменьшена:', this.pbQueue);
        }
    }

    queueShuffle(map_obj) {
        if (map_obj.size <= 1) return;
        let arr = [];
        map_obj.forEach((val, key) => {
            arr.push([key, val]);
        });
        arr.sort(function (a, b) {
            return Math.random() - 0.5;
        });
        return arr;
    }

    /**
     * запускается только когда стартует очередное видео из плейлиста (не после паузы)
     * @return {*}
     */
    playFromQueue() {
        if (this.pbQueue.size !== 0) {
            let nextInQueue = this.pbQueueIter.next();
            this.logger('this.pbQueueIter.next().done? - ', nextInQueue.done);
            if (!nextInQueue.done) {
                this.togglePlayPause(nextInQueue.value);
                return true;
            } else {
                this.queueEmpty();
                return false;
            }
        } else {
            this.queueCreate();
        }
    }

    playIDFromQueue(forward = true) {
        if (this.pbQueueArr.length === 0) {  // создаем очередь воспроизведения
            this.queueCreate();
        }

        let pl_length = this.pbQueueArr.length - 1;
        let id = this.lastVideo.id;
        let newId;

        if (undefined === id) {  // video never played yet
            newId = (forward) ? this.pbQueueArr[0] : this.pbQueueArr[pl_length];
        } else {   // we have an id of last played video
            let curVideoPos = Math.max(0, this.pbQueueArr.indexOf(id));
            if (forward) {
                newId = (curVideoPos === pl_length) ? this.pbQueueArr[0] : this.pbQueueArr[++curVideoPos];
            } else {
                newId = (curVideoPos === 0) ? this.pbQueueArr[pl_length] : this.pbQueueArr[--curVideoPos];
            }
        }
        this.togglePlayPause(newId);
    }

    queueEmpty() {
        if (this.pbQueue.size === 0) return;
        this.pbQueue.clear();
        this.shuffled = false;
        this.logger('Очередь воспроизведения очищена');
    }

    /**
     * Подсветка в плейлисте текущего воспроизводимого видео
     * @param currID
     * @param prevID
     */
    static togglePL_state(currID, prevID) {
        let elem;
        if (prevID !== undefined && prevID !== null) {
            elem = document.querySelector(`#pl_${prevID}`);
            if (elem !== null) {
                elem.classList.add('bg-light');
                elem.classList.remove('bg-warning', 'border-success');
            }
        }
        if (currID !== prevID) {
            elem = document.querySelector(`#pl_${currID}`);
            if (elem !== null) {
                elem.classList.remove('bg-light');
                elem.classList.add('bg-warning', 'border-success');
            }
        }
    }

    logger() {
        if (this.useLogger) console.log(...arguments);
    }
};

export let myVP = new VPlayer('vplayer', 'vplist', 'vlib/', false);