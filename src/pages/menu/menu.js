import React,{Component} from 'react'
import {Route,NavLink,Redirect,Switch} from 'react-router-dom'

import './menu.scss'

const isMatch = (match,location)=>{
    return match && (match.path == location.path)
}

const Menu = (props)=>(
    <ul className="menu">
        <li>
            <NavLink to={`${props.route.path}/rec`}>推荐音乐</NavLink>
        </li>
        <li>
            <NavLink to={`${props.route.path}/hot`}>热歌榜</NavLink>
        </li>
        <li>
            <NavLink to={`${props.route.path}/search`}>搜索</NavLink>
        </li>
    </ul>
)

export default Menu