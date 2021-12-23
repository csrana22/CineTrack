import React,{Component} from 'react'
// import { movies } from './listMovies'
import axios from 'axios'

export default class Movies extends Component{

    constructor(){
        super();
        this.state={
            hover:'',
            pgarr:[1],
            currpg: 1,
            movies:[],
            favourite:[]
        }
    }

    componentDidMount(){
        // Do the side-effect work here
        
        this.changeMovies(); 
    }

    changeMovies= async()=>{

        const res=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=a35e11fe1abb25d573260a2f77b65979&language=en-US&page=${this.state.currpg}`)
        let data=res.data;
        
        this.setState({
            movies:[...data.results]
        })

    }

    handleNext= ()=>{

        let tempArr=[];

        for(let i=1;i<=this.state.pgarr.length+1;i++){

            tempArr.push(i);
        }

        this.setState({
            pgarr:[...tempArr],
            currpg: this.state.currpg+1
        },this.changeMovies);
    }

    handlePrev= ()=>{
        
        if(this.state.currpg != 1){
            this.setState({
                currpg: this.state.currpg-1
            },this.changeMovies)
        }
    }

    handleClick=(pg)=>{

        if(pg!= this.state.currpg){
            this.setState({
                currpg: pg
            },this.changeMovies);
        }
    }
    
    handleFav=(mov)=>{

        let oldData= JSON.parse(localStorage.getItem('movies') || '[]');
        if(this.state.favourite.includes(mov.id)){
                oldData=oldData.filter((m)=> m.id != mov.id)
        }
        else{
            oldData.push(mov);
        }

        localStorage.setItem("movies",JSON.stringify(oldData));

        let temp= oldData.map((obj)=> obj.id);

        this.setState({
            favourite:[...temp]
        })
    }

    render(){
        // let movie=movies.results;

        return(

            <>
                { this.state.movies.length==0  ?
                <div className="text-center spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
                </div>  :
               
                <div>
                    <h3 className='text-center' style={{marginTop:"2vh",color:"#081C4F"}}><strong>Trending!</strong></h3>
            
                    <div className='movie-list'>
                        {
                        this.state.movies.map((movObj)=>(
                            <div className="card movie-card" onMouseEnter={()=>(this.setState({hover: movObj.id}))}   onMouseLeave={()=>(this.setState({hover: ''}))}>
                    

                            <img className="movie-img card-img-top" src={`https://image.tmdb.org/t/p/original${movObj.backdrop_path}`} alt={movObj.title}/>
                            
                                <h5 className="card-title movie-title">{movObj.original_title}</h5>
                                <div className='btn-wrapper'>
                                
                                {
                                 this.state.hover==movObj.id && <a className='btn btn-primary movie-btn' onClick={()=>this.handleFav(movObj)} style={{background:"#081C4F"}}>{this.state.favourite.includes(movObj.id)?"Remove from favourites":"Add to Favourites"}</a>
                                } 

                                </div>
                            </div>
                        ))
                        }
                    </div>

                    <div style={{display: "flex",justifyContent: "center"}}>
                    <nav aria-label="Page navigation example">
                    <ul class="pagination">

                    <li class="page-item"><a class="page-link" onClick={this.handlePrev}>Previous</a></li>

                    {
                        this.state.pgarr.map((pg)=>(
                            <li class="page-item"><a class="page-link" onClick={()=>this.handleClick(pg)}>{pg}</a></li>
                        ))
                    }
                    
                    <li class="page-item"><a class="page-link" onClick={this.handleNext}>Next</a></li>

                    </ul>
                    </nav>
                    </div>
                </div>


                }
               
            </>
        )
    }
}