import React,{Component} from 'react'
// import {movies} from "./listMovies";

export default class Favourite extends Component{

    constructor(){

        super();

        this.state={
            allGenres:[],
            currgenre:"All Genres",
            movies:[],
            searchText:'',
            rowLimit:5,
            currpg:1
        }
    }

    componentDidMount(){
        let genres={28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'}

        const movie=JSON.parse(localStorage.getItem("movies") || "[]");

        this.handleGenres(movie,genres);

    }

    handleGenres(movie,genres){

        let temp=[];

        movie.forEach((mov)=>{

            if(!temp.includes(genres[mov.genre_ids[0]])){
                temp.push(genres[mov.genre_ids[0]]);
            }
        })

        temp.unshift("All Genres");

        this.setState({
            allGenres:[...temp],
            movies:[...movie]
        })
    }

    handleGenreChange(gen){
        this.setState({
            currgenre: gen
        })
    }

    sortPopDesc=()=>{
        let temp=this.state.movies;
        temp.sort(function(A,B){
            return B.popularity-A.popularity;
        });
        this.setState({
            movies:[...temp]
        })
    }

    sortPopAsc=()=>{
        let temp=this.state.movies;
        temp.sort(function(A,B){
            return A.popularity-B.popularity;
        });
        this.setState({
            movies:[...temp]
        })
    }

    sortRatingAsc=()=>{
        let temp=this.state.movies;
        temp.sort(function(A,B){
            return A.vote_average-B.vote_average;
        });
        this.setState({
            movies:[...temp]
        })
    }

    sortRatingDesc=()=>{
        let temp=this.state.movies;
        temp.sort(function(A,B){
            return B.vote_average-A.vote_average;
        });
        this.setState({
            movies:[...temp]
        })
    }

    handlePage=(pg)=>{
        this.setState({
            currpg: pg
        })
    }

    handleDelete=(id)=>{
        let narr=[];

        narr=this.state.movies.filter((mov)=>{
            return mov.id!=id;
        })

        this.setState({
            movies:[...narr]
        })

        localStorage.setItem("movies",JSON.stringify(narr));
    }

    
    render(){

        let genres={28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'}

        // const movie=movies.results;
        let filterArr=[];

        if(this.state.searchText===''){
            filterArr=this.state.movies;
        }
        else{
            filterArr= this.state.movies.filter((mov)=>{
                let title=mov.original_title.toLowerCase();
                return title.includes(this.state.searchText.toLowerCase());
            })
        }


        if(this.state.currgenre!="All Genres"){
                filterArr= filterArr.filter((mov)=>{
                   return  genres[mov.genre_ids[0]]==this.state.currgenre;
                })
        }



        let pages=Math.ceil(filterArr.length/this.state.rowLimit);
        let pgsarr=[];

        for(let i=1;i<=pages;i++)
         pgsarr.push(i);

        let si= (this.state.currpg-1)*this.state.rowLimit;
        let ei= si+this.state.rowLimit

        filterArr=filterArr.slice(si,ei);

        return(
            <>
            <div className='row'>
                <div className='col-lg-3 fav-genres col-sm-12'>
                    <ul className="list-group">
                        {this.state.allGenres.map((gen)=>(
                            this.state.currgenre===gen? <li className="list-group-item" style={{background:"#081C4F",color:"#A9FC88", fontWeight:'bold'}}>{gen}</li>
                                                        :<li className="list-group-item" style={{borderColor:"#A9FC88",color:"#081C4F"}} onClick={()=>this.handleGenreChange(gen)}>{gen}</li>
                        ))}
                    </ul>
                </div>
                <div className='col-lg-9 fav-table col-sm-12'>
                    <div className='row'>
                        <input type="text" className='input-group-text col' placeholder='Search' value={this.state.searchText} onChange={(e)=> this.setState({ searchText: e.target.value})} /> 
                        <input type="number" className='input-group-text col' placeholder='Rows per page' value={this.state.rowLimit} onChange={(e)=> this.setState({ rowLimit: e.target.value})}/>
                    </div>

                    <table class="table">
                            <thead>
                                <tr>
                                <th scope="col"></th>
                                <th scope="col">Title</th>
                                <th scope="col">Genre</th>
                                <th scope="col"><i class="fas fa-sort-up" onClick={this.sortPopDesc}/>Popularity<i class="fas fa-sort-down" onClick={this.sortPopAsc}/></th>
                                <th scope="col"><i class="fas fa-sort-up" onClick={this.sortRatingDesc}/>Rating<i class="fas fa-sort-down" onClick={this.sortRatingAsc}/></th>
                                <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filterArr.map((mov)=>(
                                        <tr>
                                            <td><img src={`https://image.tmdb.org/t/p/original${mov.backdrop_path}`} alt={mov.title} style={{width:"5rem",marginRight:"0.5rem"}}></img></td>
                                            <td>{mov.original_title}</td>
                                            <td>{genres[mov.genre_ids[0]]}</td>
                                            <td>{mov.popularity}</td>
                                            <td>{mov.vote_average}</td>
                                            <td> <button type="button" className='btn btn-danger' onClick={()=>this.handleDelete(mov.id)}>Delete</button></td>

                                        </tr>
                                    ))
                                }
                            </tbody>
                    </table>
                    <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        {
                            pgsarr.map((pg)=>(
                                <li class="page-item"><a class="page-link" onClick={()=>this.handlePage(pg)} >{pg}</a></li>
                            ))
                        }
                        
                    </ul>
                </nav>
                </div>
                
            </div>
            </>
        )
    }
}