
import { Routes, Route } from "react-router-dom"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { amber, deepPurple, orange } from '@mui/material/colors';
import './style.css'
import HomePage from "./Pages/HomePage"
import AddTaskPage from "./Pages/AddTaskPage";
import MyTasks from "./Pages/MyTasks";
import TasksDone from "./Pages/TasksDone";
import NTasks from "./Pages/NTasks";
import AlertMassage from "./Components/AlertMassage";

import { useState } from "react";
import { AlertContext } from "./Context/AlertContext";
import DashBoard from "./Pages/DashBoard";
import IntroPage from "./Pages/IntroPage";

export default function App() {

  const [State, setState] = useState(false);
  const [Massege, SetMassege] = useState("ssss");


  const ShowAndHideMasseg = (Mas) => {
    setState(true);
    SetMassege(Mas)
    setTimeout(() => {
      setState(false);
    }, 2000)
  };


  const theme = createTheme({
    status: {
      danger: orange[500],
    },

    typography: {
      fontFamily: ["A"]

    },

    palette: {
      primary: {
        main: deepPurple[900],
      },
      secondary: {
        main: deepPurple[500],
      },
      third: {
        main: deepPurple[300],
      },
      text: {
        main: deepPurple[50]
      },
      gold: {
        main: amber[400]
      }


    },
  });


  return (
    <ThemeProvider theme={theme}>

      <AlertContext.Provider value={{ ShowAndHideMasseg }}>

        <AlertMassage open={State} Massege={Massege} />


        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route index element={<IntroPage />} />

            <Route path="AddTask" element={<AddTaskPage />} />
            <Route path="MyTasks" element={<MyTasks />} />
            <Route path="TasksDone" element={<TasksDone />} />
            <Route path="NTasks" element={<NTasks />} />
            <Route path="DashBoard" element={<DashBoard />} />
          </Route>



        </Routes>
      </AlertContext.Provider>
    </ThemeProvider>
  )

}