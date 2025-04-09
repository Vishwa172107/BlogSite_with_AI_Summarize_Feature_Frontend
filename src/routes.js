import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import FollowList from "./pages/FollowList";
import PostDetail from "./pages/PostDetail";

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/profile/:id" element={<UserProfile />} />
                <Route path="/post/:id" element={<PostDetail />} />
                <Route path="/profile/:id/followers" element={<FollowList type="followers" />} />
                <Route path="/profile/:id/following" element={<FollowList type="following" />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;
