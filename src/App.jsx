import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import StudentTable from "./Pages/Student/StudentTable";
import CreateStudent from "./Pages/Student/CreateStudent.tsx";
import ViewDetails from "./Pages/Student/ViewDetails";
import EditStudent from "./Pages/Student/EditStudent";
import Layout from "./Layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/student/create" element={<CreateStudent />}></Route>
          <Route path="/student/:studentId" element={<ViewDetails />}></Route>
          <Route
            path="/student/edit/:studentId"
            element={<EditStudent />}
          ></Route>
          <Route index element={<StudentTable />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
