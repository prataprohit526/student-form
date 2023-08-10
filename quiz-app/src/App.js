import './App.css';
import GoogleAuth from './components/Auth/GoogleAuth';
import {Route,Routes} from 'react-router-dom'
import GoogleRedirect from './components/Auth/GoogleRedirect';
import Home from './components/Home/Home';
import StudentProfile from './components/Student Profile/Profile'
import EducatorProfile from './components/Teacher Profile/Profile'

function App() {
  return (
    <div className="App container-fluid p-0 m-0 overflow-hidden">

      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='auth' element={<GoogleAuth/>} />
        <Route path='auth/register' element={<GoogleRedirect/>} />
        <Route path='profile/student/*' element={<StudentProfile/>}/>
        <Route path='profile/educator/*' element={<EducatorProfile/>}/>
      </Routes>
    </div>
  );
}

export default App;
