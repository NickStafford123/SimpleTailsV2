import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegLoginPage from "./pages/RegLoginPage";
import HomePage from "./pages/HomePage";
import AddDrinkPage from "./pages/AddDrinkPage";
import DetailsPage from "./pages/DetailsPage";
import UpdatePage from "./pages/UpdatePage";
import ProtectedRoute from "./components/ProtectedRoute";
import './app.css'



function App() {
  const isAuthenticated = localStorage.getItem('token')


  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegLoginPage />} />
        <Route path="/home" element={ <ProtectedRoute> <HomePage /> </ProtectedRoute> } />
        <Route path="/add" element={ <ProtectedRoute> <AddDrinkPage /> </ProtectedRoute> } />
        <Route path="/:id" element={<ProtectedRoute> <DetailsPage /> </ProtectedRoute>} />
        <Route path="/update/:id" element={ <ProtectedRoute> <UpdatePage /> </ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;


