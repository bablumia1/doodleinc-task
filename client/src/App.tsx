import Header from "./components/Header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer/Footer";
import Register from "./pages/Register";
import Login from "./pages/Login";
import "react-toastify/dist/ReactToastify.css";
import Toast from "./components/Toast/Toast";
import GuestRoute from "./components/ApplicationRoute/GuestRoute";
import PrivateRoute from "./components/ApplicationRoute/PrivateRoute";
import Profile from "./pages/Profile";
import CreateBlog from "./pages/CreateBlog";
import UpdateBlog from "./pages/UpdateBlog";
import Blog from "./pages/Blog";

function App() {
  return (
    <BrowserRouter>
      <Toast />
      <Header />
      <div className="z-0 min-h-screen px-4 mx-auto mt-5 max-w-7xl">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/" element={<GuestRoute />}>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>

          <Route path="/" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/blog-create" element={<CreateBlog />} />
            <Route path="/profile/blog-update/:id" element={<UpdateBlog />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
