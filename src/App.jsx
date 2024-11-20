import "./App.css";
import "/public/Font/Font.style.css";
import { Routes, Route } from "react-router-dom";
import CommunityPage from "./pages/Community/CommunityPage";
import QuestionAndAnswerPage from "./pages/QuestionAndAnswer/QuestionAndAnswerPage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import WriterPage from "./pages/PostWrite/WriterPage";
import CommunityPageDetail from "./pages/Community/CommunityPageDetail";
import CalendarPage from "./pages/Calendar/Calendar";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/community" element={<CommunityPage />} />
      <Route path="/community/:id" element={<CommunityPageDetail />} />
      <Route path="/question" element={<QuestionAndAnswerPage />} />
      <Route path="/question/:id" element={<CommunityPageDetail />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/write" element={<WriterPage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/calendar" element={<CalendarPage />} />
    </Routes>
  );
}

export default App;
