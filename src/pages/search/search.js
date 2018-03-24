import React,{Component} from "react"
import "./search.scss"
class Search extends Component{
    constructor(){
        super(...arguments)
        this.state = {
            value:''
        }
        this.inputChange = this.inputChange.bind(this)
        this.clear = this.clear.bind(this)
    }
    render(){
        return (
            <div>
                <form className="searchWrap">
                    <i className="searchIcon iconfont icon-search"></i>
                    <input type="text" value={this.state.value} onChange={this.inputChange}/>
                    {
                        this.state.value.trim().length>0?<i className="searchClear iconfont icon-close" onClick={this.clear}></i>:null
                    }
                </form>
                <ul>
                    <li>当那一天来临</li>
                </ul>
            </div>
        )
    }
    inputChange(e){
        this.setState({
            value:e.target.value
        })
    }
    clear(){
        this.setState({
            value:''
        })
    }
}

export default Search