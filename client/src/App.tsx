import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";

function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                    <Route
                        path="*"
                        element={
                            <div>
                                <h2>404 Page not found</h2>
                            </div>
                        }
                    />
                </Routes>
            </Router>

            <Toaster />
        </div>
    );
}

export default App;
