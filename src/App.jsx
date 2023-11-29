import Header from './components/Header';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Info from './components/Info';
import Footer from './components/Footer';
import About from './components/About';
import NotFound from './components/NotFound';

import './App.css'

function App() {

  return (
    <div className="App">             
      <BrowserRouter>             
        <Header/> 
            <Routes>
              <Route path="/" exact element={<Info/>}/>
              <Route path="/about" element={<About/>}/>    
              <Route path="*" element={<NotFound/>}/>
            </Routes>           
        <Footer/>                  
      </BrowserRouter>
    </div>
  )
}

export default App
