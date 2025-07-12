import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Ask from "./pages/Ask";
import QuestionView from "./pages/QuestionView";

export default function App() {
  return (
    <BrowserRouter>
      <nav className="p-4 bg-gray-100 flex justify-between">
        <Link to="/" className="font-bold">StackIt</Link>
        <Link to="/ask" className="px-4 py-2 bg-blue-500 text-white rounded">Ask Question</Link>
      </nav>
      <main className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ask" element={<Ask />} />
          <Route path="/questions/:id" element={<QuestionView />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
