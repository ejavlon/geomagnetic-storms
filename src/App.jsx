import './App.css'
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import {Header} from './components/Header';
import {Home} from './components/Home';
import {Footer} from './components/Footer';
import {Info} from './components/Info';
import {NotFound} from './components/NotFound';

export default function App() {
  return (
    <div className="App">             
      <BrowserRouter>             
        <Header/> 
            <Routes>
              <Route path="/" exact element={<Home/>}/>
              <Route path="/info" element={<Info/>}/>    
              <Route path="*" element={<NotFound/>}/>
            </Routes>           
        <Footer/>                  
      </BrowserRouter>
    </div>
  )
};