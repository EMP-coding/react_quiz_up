import { Container } from 'react-bootstrap'
import {Routes, Route, Link} from "react-router-dom"
import RegisterView from './components/RegisterView'
import QuestionsView from './components/QuestionsView'
import './index.css';




function App() {
  return (
    <Container className=" maincontain mb-4">
      <h1>Hello World</h1>
        <ul>
          <li>
            <Link to="/register">Register</Link>  
          </li>
          <li>
            <Link to="/questions">Questions</Link>  
          </li>
        </ul>
      
      <Routes>
        <Route path="/register" element={<RegisterView />} />
        <Route path="/questions" element={<QuestionsView />} />
      </Routes>
    </Container>
  );
}

export default App
