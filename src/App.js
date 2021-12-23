import './App.css';
import Navbar from './Components/navbar'
import Banner from "./Components/banner"
import Movies from "./Components/movies"
import Favourite from './Components/favourites'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'

function App() {
  return (
      <>
      <Router>
         <Navbar/>
         <Routes>

         <Route path="/" element={
            <>
            <Banner/> 
            <Movies/>
            </>
           } /> 
         <Route path="/favourites" element={<Favourite/>} />

         </Routes>
         
         {/* <Banner/>  */}
         {/* <Movies/>
         <Favourite/> */}
      </Router>
      </>
  );
}

export default App;
