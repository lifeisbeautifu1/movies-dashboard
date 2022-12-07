import { Routes, Route } from 'react-router-dom';

import { MovieDetails, MovieForm, Home, Main } from './pages';

export const App = () => {
  return (
    <Routes>
      <Route path='/*' element={<Main />}>
        <Route path='movie/form' element={<MovieForm />} />
        <Route path='movie/:id' element={<MovieDetails />} />
        <Route path='*' element={<Home />} />
      </Route>
    </Routes>
  );
};

export default App;
