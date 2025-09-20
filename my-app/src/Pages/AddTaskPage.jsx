import { useState, useContext, } from "react";
import { TextField, Button, Box } from "@mui/material";
import { v4 as uuid } from "uuid";
import { TaskContext } from "../Context/TaskContext"
import { AlertContext } from "../Context/AlertContext";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export default function AddTaskPage() {

    const GoTo = useNavigate()

    const { ShowAndHideMasseg } = useContext(AlertContext)
    const { tasks, setTasks } = useContext(TaskContext);
    const [task, setTask] = useState({
        title: "",
        Desc: "",
        End: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTask = {
            id: uuid(),
            title: task.title,
            Desc: task.Desc,
            Start: moment().toISOString(), // تاريخ البداية تلقائي
            End: task.End,
            IsCompleted: false,
            CompletedAt: ""
        };

        const UpdatedTasks = [...tasks, newTask]
        setTasks(UpdatedTasks);

        localStorage.setItem("Tasks", JSON.stringify(UpdatedTasks));
        ShowAndHideMasseg("تمت إضافة المهمة بنجاح ")
        GoTo("/MyTasks")


    };

    return (
        <div className="AddTaskForm">
            <div className="titlePage">إضافة مهمة </div>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: "flex", flexDirection: "column", gap: 2, m: "auto", mt: 5 }}
            >
                <TextField
                    label="العنوان"
                    value={task.title}
                    onChange={(e) => setTask({ ...task, title: e.target.value })}
                    required
                />

                <TextField
                    label="الوصف"
                    multiline
                    rows={3}
                    value={task.Desc}
                    onChange={(e) => setTask({ ...task, Desc: e.target.value })}
                    required

                />

                <TextField
                    label="تاريخ النهاية"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={task.End}
                    onChange={(e) => setTask({ ...task, End: e.target.value })}
                    required

                />

                <Button type="submit" variant="contained" color="secondary">
                    إضافة المهمة
                </Button>
            </Box>
        </div>
    );
}
