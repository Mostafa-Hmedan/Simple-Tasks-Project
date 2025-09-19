import Grid from "@mui/material/Grid";
import TaskCard from "../Components/TaskCard";

import { useContext, useEffect, useMemo } from "react";
import { TaskContext } from "../Context/TaskContext";

export default function NTasks() {
    const { tasks, setTasks } = useContext(TaskContext);

    const TasksNotDonee = useMemo(() => {
        return tasks.filter(task => task.IsCompleted === false);
    }, [tasks]);

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
            {

                TasksNotDonee == "" ?
                    <div className="BoxInfo">   هنا سيتم عرض المهمات التي لم تنجزها بعد </div>
                    :
                    <Grid container spacing={4}>
                        {TasksNotDonee.map((task) => (
                            <Grid item xs={12} sm={6} md={4} key={task.id}>
                                <TaskCard
                                    id={task.id}
                                    title={task.title}
                                    Desc={task.Desc}
                                    Start={task.Start}
                                    End={task.End}
                                    IsCompleted={task.IsCompleted}
                                />
                            </Grid>
                        ))}
                    </Grid>
            }

        </div>
    );
}
