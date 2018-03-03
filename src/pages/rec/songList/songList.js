import React,{Component} from 'react'
import {getSongList} from '@/fetch.js'
import './songlist.scss'

class SongList extends Component{
    constructor(){
        super(...arguments)
        this.state = {
            data:[]
        }
    }
    render(){
        return (
            <div className="songList">
                <h2>推荐歌单</h2>
                <ul>
                    {
                        this.state.data.map((item,index)=>{
                            return (
                                <li key={index}>
                                    <div className="pic">
                                        <img src={item.picUrl} />
                                        <div className="playCount">
                                            <i className="iconfont icon-headseterji"></i>
                                            <span>
                                                {
                                                    item.playCount>10000?(item.playCount/10000).toFixed(2)+'万':item.playCount
                                                }
                                            </span>
                                        </div>
                                    </div>
                                    <p style={{'WebkitBoxOrient': 'vertical'}}>{item.name}</p>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
    componentDidMount(){
        getSongList().then(response=>{
            this.setState({
                data:response.splice(0,6)
            })
        })
    }
}

export default SongList