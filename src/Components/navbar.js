import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import "../App.css"

export default class Navbar extends Component{

    render(){
        return(

            <div style={{background:"#081C4F",display:'flex',justifyContent:"space-between",padding:0.5}}>
                <Link to="/" style={{textDecoration: 'None'}}><h1 style={{color:"#A9FC88",margin:'1.5rem'}}>CineTrack</h1>
                </Link>

                <Link to="/favourites" style={{textDecoration: 'None'}}><h4 style={{color:'#A9FC88',margin: '2rem'}}>Favourites</h4>
                </Link>
            </div>
        )
    }
}