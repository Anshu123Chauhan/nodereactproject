
import Header from './component/Header';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Footer from './component/Footer';
import "./style/Global.css";
import Signup from './component/Signup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateComponent from './component/PrivateComponent';
import Login from './component/Login';
import AddProducts from './component/AddProducts';
import ProductList from './component/ProductList';
import UpdateProducts from './component/UpdateProduct';
function App() {
  return (
    
    <div className="App">
      <ToastContainer />
      <header className="App-header">
        <BrowserRouter>
        <Header />
        <Routes>
          <Route element={<PrivateComponent />}>
          <Route path="/" element={<ProductList />}/>
          <Route path="/add" element={<AddProducts />}/>
          <Route path="/update/:id" element={<UpdateProducts />}/>
          <Route path="/profile" element={<h1>Profile</h1>}/>
          <Route path="/logout" element={<h1>Logout </h1>}/>
          </Route>
          <Route path="/register" element={<Signup />}/>
          <Route path="/login" element={<Login />}/>
        </Routes>
        </BrowserRouter>
      </header>
     
      <Footer />
    </div>
  );
}

export default App;
