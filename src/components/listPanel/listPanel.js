import React,{Component} from 'react'
import {Link} from 'react-router-dom'
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
                <Link className="control iconfont icon-play" to={`/playing/${id}`}></Link>
            </li>
        )
    }
}

export default ListPanel