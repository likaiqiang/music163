import React, { Component } from "react"
import { getMusic, getLrc } from '@/fetch.js'
import {ContextConsumer} from '@/context/index.js'

import './playing.scss'

class Playing extends Component {
    constructor() {
        super(...arguments)
        this.play = this.play.bind(this)
        this.pause = this.pause.bind(this)
        this.activeProgressBar = this.activeProgressBar.bind(this)
        this.processLrc = this.processLrc.bind(this)
        this.control = this.control.bind(this)
        this.scrollLrc = this.scrollLrc.bind(this)
        this.state = {
            lrc: [],
            lrcActive: null,
            lrcTop:20
        }
    }
    render() {
        var {paused} = this.props.context.data
        var bgImages = paused ? '/images/暂停.png' : '/images/播放.png'

        return (
            <div className="playing">
                <div className="songWrap">
                    <div className="song">
                        <img src="http://p1.music.126.net/cF2FiKNbFPpkka230v8FOQ==/109951163143716711.webp?imageView&thumbnail=1080y1080&quality=75&tostatic=0&type=webp" />
                        <div className="play" style={{ backgroundImage: `url(${bgImages})` }} onClick={this.control}></div>
                    </div>
                </div>
                <div className="lrcWrap">
                    <ul ref={ref => this.lrc = ref}>
                        {
                            this.state.lrc.map((item, index) => {
                                return (
                                    <li key={index} className={this.state.lrcActive == index ? 'active' : ''}>{item[1]}</li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="processBar" ref={ref => this.progressBar = ref}>
                    <div className="process" ref={ref => this.progress = ref}></div>
                    <div className="processBtn" ref={ref => this.progressBtn = ref}></div>
                </div>
            </div>
        )
    }
    componentDidMount() {
        var id = this.props.match.params.id
        var curMusicId = this.props.context.data.curMusicId
        this.progressStartX = (document.documentElement.clientWidth - parseInt(this.progressBar.offsetWidth)) / 2
        var _this = this
        if(typeof id != 'undefined' && id != curMusicId){
            getMusic(id).then(response => {
                this.props.context.methods.initAudio(response[0].url,response[0].id)
                this.progressTimer = setInterval(this.activeProgressBar,300)
            })
            getLrc(id).then(response => {
                this.setState({
                    lrc: this.processLrc(response.lrc.lyric)
                })
            })
        }
        else{
            this.progressTimer = setInterval(this.activeProgressBar, 300)
            this.setState({
                lrcTop:this.props.context.data.lrcTop,
                lrc:this.props.context.data.lrc
            })
        }
        this.progressBtn.addEventListener('touchstart', function (e) {
            clearInterval(_this.progressTimer)
        })
        this.progressBtn.addEventListener('touchmove', function (e) {
            var percent = (e.touches[0].pageX - _this.progressStartX) / parseInt(_this.progressBar.offsetWidth)
            if (percent > 1) percent = 1
            else if (percent < 0) percent = 0
            _this.progressBtn.style.left = percent * 100 + '%'
            _this.progress.style.width = percent * 100 + '%'
        })
        this.progressBtn.addEventListener('touchend', function (e) {
            var percent = (e.changedTouches[0].pageX - _this.progressStartX) / parseInt(_this.progressBar.offsetWidth)
            _this.props.context.data.audio.currentTime = _this.props.context.data.audio.duration * percent
            _this.progressTimer = setInterval(_this.activeProgressBar, 300)
        })
    }
    componentWillUnmount() {
        clearInterval(this.progressTimer)
        var lrcTop = parseInt(getComputedStyle(this.lrc).top)
        this.props.context.methods.saveLrcTop(lrcTop)
        this.props.context.methods.saveLrc(this.state.lrc)
    }
    play() {
        this.props.context.methods.play()
        this.progressTimer = setInterval(this.activeProgressBar, 300)
    }
    pause() {
        this.props.context.methods.pause()
    }
    control() {
        this.props.context.methods.control()
    }
    activeProgressBar() {
        var percentNum = Math.floor((this.props.context.data.audio.currentTime / this.props.context.data.audio.duration) * 10000) / 100 + '%';
        if(this.props.context.data.audio.currentTime / this.props.context.data.audio.duration >=1){
            this.props.context.methods.pause()
        }
        this.progress.style.width = percentNum;
        this.progressBtn.style.left = percentNum;
        this.scrollLrc()
    }
    processLrc(lrcStr) {
        var lineArr = lrcStr.split('\n');

        var timeReg = /\[\d{2}:\d{2}.\d{3}\]/g;
        var result = [];

        for (var i in lineArr) {
            var time = lineArr[i].match(timeReg);
            if (!time) continue;
            var curStr = lineArr[i].replace(timeReg, '');
            for (var j in time) {
                var t = time[j].slice(1, -1).split(':');
                var curSecond = parseInt(t[0], 10) * 60 + parseFloat(t[1]);
                result.push([curSecond, curStr]);
            }
        }

        result.sort(function (a, b) {
            return a[0] - b[0];
        })
        return result
    }
    scrollLrc() {
        var lyricsLiArr = this.state.lrc
        var li = this.lrc.querySelector('li')
        if (lyricsLiArr) {
            for (var i = 0; i < lyricsLiArr.length - 1; i++) {
                var curT = lyricsLiArr[i][0];
                var nexT = lyricsLiArr[i + 1][0];
                var curtTime = this.props.context.data.audio.currentTime;
                if ((curtTime > curT) && (curtTime < nexT)) {
                    this.setState({
                        lrcActive: i
                    })
                    this.lrc.style.top = 20 - 18 * i + 'px'
                    break
                }
            }
        }
    }
}

export default ContextConsumer(Playing)