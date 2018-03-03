import React,{Component} from "react"
import {getHotMusic} from '@/fetch.js'
import ListPanel from '@/components/listPanel/listPanel.js'
import '@/styles/musicList.scss'
import './hot.scss'

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

class Hot extends Component{
    constructor(){
        super(...arguments)
        this.state = {
            data:[]
        }
    }
    render(){
        return (
            <div className="musicList">
                <div className="hotTop">
                    <h3 className="hoticon"></h3>
                    <p className="hottime">更新日期：2月22日</p>
                </div>
                <ul>
                    {
                        this.state.data.map((item,index)=>{
                            return (
                                <div className={"hotList"+" "+(item.isHot?"hot":"")} key={index}>
                                    <div className="number">
                                        {
                                            index<10?'0'+(index+1):(index+1)
                                        }
                                    </div>
                                    <ListPanel key={index} data={{...item}} />
                                </div>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
    componentWillMount(){
        getHotMusic().then(response=>{
            this.setState({
                data:setHot(response.splice(0,15))
            })
        })
    }
}

export default Hot