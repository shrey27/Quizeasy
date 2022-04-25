import { Routes, Route } from 'react-router-dom';
import Homepage from '../pages/homepage';
import Landing from '../pages/landing';

// Routes
export const LANDING = '/';
export const HOMEPAGE = '/homepage';
export const NOTFOUND = '*';

export const availableRoutes = (
  <Routes>
    <Route path={LANDING} element={<Landing />} />
    <Route path={HOMEPAGE} element={<Homepage />} />
  </Routes>
);
