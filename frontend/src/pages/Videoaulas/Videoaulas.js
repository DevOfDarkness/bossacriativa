import React, { useState, useEffect } from 'react';
import '../../global.css';
import './Videoaulas.css';
import { Row, Col } from 'react-grid-system';
import api from '../../services/api'
import ReactPlayer from 'react-player'

class VideoAulas extends React.Component{
     constructor(props){
         super(props)
         this.state={
             data: [],
             perPage: 8
         }
         this.__onClick = this.__onClick.bind(this)
     }
     async loadData(page){
        const response = await api.get(`/lessons?page=${page}`)
         this.setState({ total: response.data.total })
         this.setState({ data: response.data.data })
         this.setState({ pageNumbers: Math.ceil(this.state.total / this.state.perPage)})
     }
     range(start, stop, step) {
        if (typeof stop == 'undefined') {

            stop = start;
            start = 0;
        }
    
        if (typeof step == 'undefined') {
            step = 1;
        }
    
        if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
            return [];
        }
    
        var result = [];
        for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
            result.push(i);
        }
    
        return result;
    };
    componentDidMount(){
        const { page } = this.props.match.params
        this.loadData(page)
     }
    
    componentDidUpdate(prevProps){
        const { page } = this.props.match.params
        if( page !== prevProps.match.params.page ){
            this.loadData(page)
        }
     }
     __onClick(val){
        this.loadData(val)
     }
     
      render(){
          const pgNmb = this.range(1,this.state.pageNumbers+1)
          const lessons = this.state.data
      return (
        <div className="videoaulas-container">
            <div className="video-contents">
                <header className="title-home">VIDEO AULAS EM DESTAQUE</header>
                    <ul>
                         {lessons.map(video=>
                            <li key={video.id}>
                            <p><strong>Título:</strong>{video.title}</p>
                            <ReactPlayer
                             url={video.url} 
                             width='100%' 
                             height='100%'
                             controls
                            />
                            <strong>Descrição:</strong>
                            <p>{video.description}</p>
                        </li>
                        )}
                    </ul>
                    {pgNmb.map(val=>
                        <button value={val} className="btns" onClick={() => this.__onClick(val)} >{val}</button>
                    )}
                </div>
            </div>
    
        )
    }
}
export default VideoAulas;
  