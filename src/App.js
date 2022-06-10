import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserData from './pages/UserData';
import './App.css';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
       <Routes>
         <Route  path="/" element={<UserData />} />
         <Route  path="/editUser/:id" element={<EditUser />} />
         <Route exact path="/addUser" element={<AddUser />} />
       </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
