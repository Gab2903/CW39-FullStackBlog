import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PostDetailsPage from "./pages/PostDetailsPage";
import CreatePostPage from "./pages/CreatePostPage";

const App = () => (
  <>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies/:id" element={<PostDetailsPage />} />
        <Route path="/create-post" element={<CreatePostPage />} />
      </Routes>
    </Router>
    <div className="flex justify-end text-[#d5c3aa]">&copy; GIS 2024</div>
  </>
);

export default App;
