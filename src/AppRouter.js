import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import Login from './Pages/Login';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;