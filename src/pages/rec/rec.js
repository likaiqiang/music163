import React,{Component} from "react"
import NewMusic from './newMusic/newMusic'
import SongList from './songList/songList'

class Rec extends Component{
    render(){
        return (
            <div>
                <SongList />
                <NewMusic />
            </div>
        )
    }
}

export default Rec