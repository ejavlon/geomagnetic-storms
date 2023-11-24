import './App.css'
import Header from './components/Header';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Info from './components/Info';

function App() {

  return (
    <div className="App">             
      <BrowserRouter>             
        <Header/> 
            <Routes>
              <Route path="/" exact element={<Info/>}/>
              {/* <Route path="/blog" element={<Blog/>}/>               */}
            </Routes>           
        {/* <Footer/>                   */}
      </BrowserRouter>
    </div>
  )
}

export default App
