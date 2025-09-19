import Grid from "@mui/material/Grid";
import TaskCard from "../Components/TaskCard";
import { Link } from 'react-router-dom';
import { useContext, useEffect } from "react";
import { TaskContext } from "../Context/TaskContext";



export default function MyTasks() {
    const { tasks, setTasks } = useContext(TaskContext);
    useEffect(() => {
        const StorageTasks = JSON.parse(localStorage.getItem("Tasks"));
        if (StorageTasks) {
            setTasks(StorageTasks);
        }
        else {
            setTasks([])
        }
    }, []); // [] يعني رح يشتغل مرة وحدة عند تحميل الصفحة

    return (
        <div>
            <Grid container spacing={2}>
                {tasks.map((task) => (
                    <Grid item xs={6} sm={6} md={4} key={task.id}>
                        <TaskCard
                            id={task.id}
                            title={task.title}
                            Desc={task.Desc}
                            Start={task.Start}
                            End={task.End}
                            IsCompleted={task.IsCompleted}
                            CompletedAt={task.CompletedAt} // <--- هذا مهم
                        />
                    </Grid>
                ))}
            </Grid>
            <Link to='/AddTask'>
                <div className="Addbtn">+</div>
            </Link>

        </div>
    );
}
