import * as C from './styles'
import Header from './Components/Theme/Header/Header'
import Footer from './Components/Theme/Footer/Footer'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home'
import GamePage from './Pages/GamePage'
import Platforms from './Pages/Platforms';
import Register from './Pages/User/Register';
import Login from './Pages/User/Login';
import { useSelector } from 'react-redux';
import MyFavoriteGames from './Pages/User/MyFavoriteGames';
import Profile from './Pages/User/Profile';
import Genres from './Pages/Genres';
import ReleasingGames from './Pages/GameNav/ReleasingGames';
import GamesRating from './Pages/GameNav/GamesRating';

function App() {

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  return (
    <BrowserRouter>
      <div className="App">
        <Header item={userInfo} />

        <C.Container> {/* tag main */}

          <Routes>
            {/* <Route path='/genre' element={<GenreHome />} /> */}
            <Route path='/genre/:slug' element={<Genres />} />
            <Route path='/games/releases' element={<ReleasingGames />} />
            <Route path='/games/ratings' element={<GamesRating />} />
            <Route path='/user/profile' element={<Profile />} />
            <Route path='/user/my-favorite-games' element={<MyFavoriteGames />} />
            <Route path='/user/register' element={<Register />} />
            <Route path='/user/login' element={<Login />} />
            <Route path='/platforms/:slug' element={<Platforms />} />
            <Route path='/game/:slug' element={<GamePage />} />
            <Route path='/' element={<Home />} />
          </Routes>

        </C.Container>

        <Footer />
      </div >
    </BrowserRouter >
  );
}

export default App;
