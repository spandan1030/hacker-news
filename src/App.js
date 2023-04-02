import './App.css';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import StoriesPage from './components/StoriesPage';
import Navbar from './components/Navbar';
import Welcome from './components/Welcome';
import SearchPage from './components/SearchPage';
import CommentPage from './components/CommentPage';
import Footer from './components/Footer';
import AuthorPage from './components/AuthorPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StoriesPage/>}></Route>
        <Route path="/welcome" element={<Welcome/>}></Route>
        <Route path="/comment/" element={<CommentPage/>} />
        <Route path="/author/" element={<AuthorPage/>}/>
        <Route path="/search/" element={<SearchPage/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
