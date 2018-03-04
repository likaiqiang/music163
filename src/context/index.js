import React from 'react'
const Context = React.createContext()

export class ContextProvider extends React.Component{
    constructor(){
        super(...arguments)
        this.initAudio = this.initAudio.bind(this)
        this.play = this.play.bind(this)
        this.pause = this.pause.bind(this)
        this.control = this.control.bind(this)
        this.state = {
            paused: true,
            audio:null,
            curMusicId:null
        }
    }
    render(){
        const methods = {
            initAudio:this.initAudio,
            play:this.play,
            pause:this.pause,
            control:this.control
        }
        return (
            <Context.Provider value={{data:{...this.state},methods:{...methods}}}>
                {this.props.children}
                <audio controls="true" src={this.state.url} antoplay="true" style={{ display: 'none' }} ref={ref => this.audio = ref} />
            </Context.Provider>
        )
    }
    componentDidMount(){
        this.setState({
            audio:this.audio
        })
    }
    initAudio(url,id){
        this.audio.src = url
        this.play()
        this.setState({
            curMusicId:id
        })
    }
    play(){
        this.audio.play()
        this.setState({
            paused:false
        })
    }
    pause(){
        this.audio.pause()
        this.setState({
            paused:true
        })
    }
    control(){
        this.state.paused?this.audio.play():this.audio.pause()
        this.setState({
            paused:!this.state.paused
        })
    }
}

export const ContextConsumer = Component => {
  return props => (
    <Context.Consumer>
      {context => {
        return <Component context={context} {...props} />
      }}
    </Context.Consumer>
  )
}