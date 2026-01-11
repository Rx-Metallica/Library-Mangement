import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Books from "./components/books/BooksPage";
import Students from "./components/students/StudentsPage";
import IssueReturnPage from "./components/IssueReturn/IssueReturnPage";
import SearchReportsPage from "./components/searchReport/SearchReporstPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/books" element={<Books />} />
        <Route path="/students" element={<Students />} />
        <Route path="/issue-return" element={<IssueReturnPage />} />
        <Route path="/reports" element={<SearchReportsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
