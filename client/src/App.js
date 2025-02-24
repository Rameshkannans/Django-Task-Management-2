import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from "./Components/Home";
import Head from "./Layouts/Head";
import NoPage from "./Layouts/NoPage";
import ShowTasks from "./Components/ShowTasks";
import TaskDetail from "./Components/TaskDetail";
import UpdateTask from "./Components/UpdateTask";
import AddTask from "./Components/AddTask";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Head />}>
            <Route index element={<Home />} />
            <Route path="tasks" element={<ShowTasks />} />
            <Route path="tasks/add" element={<AddTask />} />
            <Route path="tasks/:id" element={<TaskDetail />} /> 
            <Route path="tasks/update/:id" element={<UpdateTask />} /> 
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
