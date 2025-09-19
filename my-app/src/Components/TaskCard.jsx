import DeleteIcon from '@mui/icons-material/Delete';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import CreateIcon from '@mui/icons-material/Create';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { useContext } from 'react';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { TaskContext } from '../Context/TaskContext';
import { AlertContext } from '../Context/AlertContext';
// هي مشان الوقت 
import moment from "moment";
import "moment/locale/ar";
import { useState } from 'react';
import { useEffect } from 'react';
moment.locale("ar");


export default function TaskCard(props) {

    const { tasks, setTasks } = useContext(TaskContext);
    const { ShowAndHideMasseg } = useContext(AlertContext)
    const [IsEndTime, SetisEndTime] = useState(false);
    // 


    function HandelEndTime() {
        const CurrntTime = moment();
        const TimeOfEndTask = moment(props.End);

        if (CurrntTime.isAfter(TimeOfEndTask)) {
            SetisEndTime(true)
        } else {
            SetisEndTime(false)
        }
    }


    useEffect(() => {
        HandelEndTime();
    }, [props.End]);



    console.log(props.CompletedAt)

    function HandelDoneTask() {
        const UpdatedTasks = tasks.map(task =>
            task.id === props.id
                ? {
                    ...task,
                    IsCompleted: !task.IsCompleted,
                    CompletedAt: !task.IsCompleted ? moment().toISOString() : null // تخزين وقت الإنهاء
                }
                : task
        );

        setTasks(UpdatedTasks);
        localStorage.setItem("Tasks", JSON.stringify(UpdatedTasks));
        ShowAndHideMasseg("تم إنهاء المهمة بنجاح");
    }


    // خاص ب الديالوغ

    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);

    };

    function handelDeletConferm() {
        const UpdatedTasks = tasks.filter((itme) => {
            if (itme.id == props.id) {
                return false
            }
            else {
                return true
            }
        })
        setTasks(UpdatedTasks)
        localStorage.setItem("Tasks", JSON.stringify(UpdatedTasks));
        setOpen(false)
        ShowAndHideMasseg("تم حذف المهمة ")
    }



    return (
        <>

            {/* خاص ب الديالوغ */}
            <React.Fragment>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle style={{ direction: "rtl" }} id="alert-dialog-title">
                        {"يفضل عدم مسح المهام لاجل الحصول على تقييم دقيق في لوحة الاحصائيات "}
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={handleClose}>تراجع</Button>
                        <Button onClick={handelDeletConferm} autoFocus>حذف </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
            <div className="TaskCard">
                <div style={{ backgroundColor: IsEndTime ? "rgb(255 89 0 / 60%)" : "" }} className={props.IsCompleted ? "Donee" : "TaskTitle"}>{props.title}</div>
                <div className="Desc">{props.Desc}</div>
                <div className="TaskDate">


                    <div className="TaskDateStart">
                        {moment(props.Start).fromNow()} <span>: تاريخ البدء</span>
                    </div>


                    <div className={IsEndTime ? "d-non" : "TaskDateEnd"}>
                        <p><HourglassTopIcon style={{ color: props.IsCompleted ? "transparent" : "" }} fontSize='7px' />   </p>
                        {props.End}
                        <span>:  يجب الانتهاء قبل </span>
                    </div>

                    <div className={IsEndTime ? 'EndTaskTime' : "d-non"} >
                        انتهى وقت المهمة الافتراضي في {props.End}
                    </div>

                    {props.IsCompleted && (
                        <div
                            className='EndTaskTime'
                            style={{ backgroundColor: "green", fontSize: "10px" }}
                        >
                            {moment(props.CompletedAt).calendar()} لقد قمت أنت بإنهاء المهمة في
                        </div>
                    )}




                </div>
                <div className="Icon">
                    <DeleteIcon onClick={() => { setOpen(true) }} className='Delete' color='gold' style={{ marginLeft: "3px", }} />
                    <TaskAltIcon
                        onClick={() => {
                            HandelDoneTask();

                        }}

                        className='done'
                        style={{ marginLeft: "3px", color: props.IsCompleted ? "green" : "gold", display: props.IsCompleted || IsEndTime ? "none" : "block" }} />




                </div>
            </div>
        </>)
}