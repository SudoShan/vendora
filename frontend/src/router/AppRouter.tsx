import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import SignUp from '../pages/Signup';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
    </Routes>
  );
}
