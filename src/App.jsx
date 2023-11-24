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
              {/* <Route path="/" exact element={<Info/>}/>                        
              <Route path="/projects" element={<Projects/>}/>  
              <Route path="/blog" element={<Blog/>}/>
              <Route path="/blog/:id" element={<Post/>}/>            
              <Route path="/auth/6nf4rd5" element={<Login/>}/>
              <Route path="/admin/6nf4rd5" element={<Controller/>} />              
              <Route path="*" element={<Page404/>}/>               */}
            </Routes>           
        {/* <Footer/>                   */}
      </BrowserRouter>
    </div>
  )
}

export default App
