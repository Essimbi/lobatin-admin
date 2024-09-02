import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Auth from './guards/Auth';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/home" exact element={
          <Auth>
            <Home />
          </Auth>
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;