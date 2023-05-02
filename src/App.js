import "./sass/style.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Components
import FormComponent from "./pages/FormComponent/FormComponent";
import Users from "./pages/Users/Users";
import UserDetails from "./pages/UserDetails/UserDetails";
import ProtectedRoute from "./utils/ProtectedRoute";
import NotFoundPage from "./pages/NotFound/NotFound";
import ScrollToTop from "./utils/ScrollToTop";

const App = () => {
  return (
    <div className="app" dir="rtl">
      <BrowserRouter basename="/Zajel">
        <ScrollToTop>
          <Routes>
            <Route path="/login" element={<FormComponent />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              }
            />
            <Route path="/drivers/:id" element={<UserDetails />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default App;
