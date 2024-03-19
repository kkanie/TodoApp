import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home.tsx";
import Navbar from "./Components/Navbar.tsx";
import React from "react";
import SingleTodo from "./Components/SingleTodo.tsx";
//adasd
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div>
          <Routes>
            <Route
                path="/"
                element={<Home />}
            />
            <Route
                path="/todo/:todoID"
                element={<SingleTodo/>}
            />
          </Routes>
        </div>
      </BrowserRouter>

    </div>
  );
}

export default App;
