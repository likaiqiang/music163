import React,{Component} from "react"
import ListPanel from '@/components/listPanel/listPanel.js'
import {search} from '@/fetch.js'
import "./search.scss"
class Search extends Component{
    constructor(){
        super(...arguments)
        this.state = {
            value:'',
            data:[]
        }
        this.inputChange = this.inputChange.bind(this)
        this.clear = this.clear.bind(this)
        this.submit = this.submit.bind(this)
    }
    render(){
        return (
            <div>
                <form className="searchWrap" onSubmit={this.submit}>
                    <i className="searchIcon iconfont icon-search"></i>
                    <input type="text" value={this.state.value} onChange={this.inputChange}/>
                    {
                        this.state.value.trim().length>0?<i className="searchClear iconfont icon-close" onClick={this.clear}></i>:null
                    }
                </form>
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
    submit(e){
        e.preventDefault()
        var value = this.state.value.trim()
        if(value.length){
            search(value).then(response=>{
                this.setState({
                    data:response
                })
            })
        }
    }
}

export default Search