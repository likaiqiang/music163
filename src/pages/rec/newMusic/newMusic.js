import React from 'react'
import {getNewMusic} from '@/fetch.js'
import ListPanel from '@/components/listPanel/listPanel.js'
import '@/styles/musicList.scss'

function setHot(data){
    if(Array.isArray(data)){
        let arr = []
        data.forEach((item,index)=>{
            if(index<5){
                item['isHot']  = true
            }
            arr[index] = item
        })
        return arr
    }
}

class newMusic extends React.Component{
    constructor(){
        super(...arguments)
        this.state = {
            data:[]
        }
    }
    render(){
        return (
            <div className="musicList">
                <h2>最新音乐</h2>
                <ul>
                    {
                        this.state.data.map((item,index)=>{
                            return <ListPanel key={index} data={{...item}} />
                        })
                    }
                </ul>
            </div>
        )
    }
    componentWillMount(){
        getNewMusic().then(response=>{
            this.setState({
                data:setHot(response.splice(0,10))
            })
        })
    }
}

export default newMusic