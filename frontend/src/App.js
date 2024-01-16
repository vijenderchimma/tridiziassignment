import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import EmployeeForm from './components/EmployeeForm'


const App = () => (
  <BrowserRouter>
  <Routes>
    <Route path = "/" Component={Home}/>
    <Route path = "/employeeform" Component={EmployeeForm} />
  </Routes>
  </BrowserRouter>
)

export default App;
