import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login';
import AdminHome from './component/AdminHome';
import ManagerHome from './component/ManagerHome';
import EmployeeHome from './component/EmployeeHome';
import Register from './Register';
import ManagerList from './component/Managerdetails';
import EmployeeList from './component/Employeedetails';

function App() {
  return(
    <Router>
      <Routes>
        <Route path='/' element={<Login></Login>}></Route>
        <Route path='/AdminHome' element={<AdminHome></AdminHome>}></Route>
        <Route path='/ManagerHome' element={<ManagerHome></ManagerHome>}></Route>
        <Route path='/EmployeeHome' element={<EmployeeHome></EmployeeHome>}></Route>
        <Route path='/Register' element={<Register></Register>}></Route>
        <Route path='/Manager' element={<ManagerList></ManagerList>}></Route>
        <Route path='/Addmanager' element={<Register></Register>}></Route>
        <Route path='/Employee' element={<EmployeeList></EmployeeList>}></Route>
      </Routes>
    </Router>
  )
}

export default App;
