import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FormValidation from './FormValidation';
import LoginForm from './Login'; 
import DashBoard from './Dashboard';
import ProtectedRoute from './ProtectedRoute';
import AddCart from './AddCart';
import Task from './Task.Jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormValidation />} />
        <Route path="/Login" element={<LoginForm />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<DashBoard />} />} />
        <Route path='/addCart' element={<AddCart />} />
        <Route path='/task' element ={<Task/>}/>
      </Routes>
    </Router>
  );
}

export default App;
