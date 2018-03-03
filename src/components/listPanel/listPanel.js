import React,{Component} from 'react'
import './listPanel.scss'
// import Proptypes from 'prop-types'

class ListPanel extends Component{
    constructor(){
        super(...arguments)
    }
    render(){
        const {name,ar,id,isHot} = this.props.data
        return (
            <li className="listPanel">
                <div className="intro">
                    <p className="title">{name}</p>
                    <p className="subTitle">
                        {
                            isHot?<i className="hot iconfont icon-hot"></i>:null
                        }
                        <span>
                            {
                                ar.length ? ar.map((o,i)=>{
                                    return o.name
                                }).join('/'):name
                            }
                        </span>
                    </p>
                </div>
                <i className="control iconfont icon-play"></i>
            </li>
        )
    }
}

export default ListPanel