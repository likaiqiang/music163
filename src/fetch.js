import axios from 'axios'
// let baseUrl = 'http://localhost:3008'
let baseUrl = 'http://45.32.28.180:3008'
if(process.env.NODE_ENV == 'production'){
  baseUrl = "https://music-163.herokuapp.com/"
}

export const getNewMusic = ()=>{
    return new Promise((resolve,reject)=>{
        axios.get(`${baseUrl}/top/list?idx=0`).then(response=>{
            if(response.data.code == 200){
                return resolve(response.data.playlist.tracks)
            }
            else{
                return reject(response)
            }
        })
    })
}
export const getHotMusic = ()=>{
    return new Promise((resolve,reject)=>{
        axios.get(`${baseUrl}/top/list?idx=1`).then(response=>{
            if(response.data.code == 200){
                resolve(response.data.playlist.tracks)
            }
            else{
                reject(response)
            }
        })
    })
}

export const getSongList = ()=>{
    return new Promise((resolve,reject)=>{
        axios.get(`${baseUrl}/personalized`).then(response=>{
            if(response.data.code == 200){
                return resolve(response.data.result)
            }
            else{
                return  reject(response)
            }
        })
    })
}

export const getMusic = (id)=>{
    return new Promise((resolve,reject)=>{
        axios.get(`${baseUrl}/music/url?id=${id}`).then(response=>{
            if(response.data.code == 200){
                return resolve(response.data.data)
            }
            else{
                return  reject(response)
            }
        })
    })
}
export const getLrc = (id)=>{
    return new Promise((resolve,reject)=>{
        axios.get(`${baseUrl}/lyric?id=${id}`).then(response=>{
            if(response.data.code == 200){
                return resolve(response.data)
            }
            else{
                return  reject(response)
            }
        })
    })
}
export const search = (kw)=>{
    return new Promise((resolve,reject)=>{
        axios.get(`${baseUrl}/search?keywords=${kw}`).then(response=>{
            if(response.data.code == 200){
                return resolve(response.data.result.songs)
            }
            else{
                return  reject(response)
            }
        })
    })
}
