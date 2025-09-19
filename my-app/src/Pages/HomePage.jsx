import Container from '@mui/material/Container';
import { Link, Outlet } from 'react-router-dom';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useState } from 'react';

export default function HomePage() {


    const SideBarLinks = [
        { name: "الصفحة الرأيسية", path: "/", icon: <HomeIcon /> },
        { name: " إضافة مهمة", path: "/AddTask", icon: <AddIcon /> },
        { name: "جميع مهماتي ", path: "/MyTasks", icon: <AssignmentIcon /> },
        { name: "مهماتي المنجزة ", path: "/TasksDone", icon: <TaskAltIcon /> },
        { name: "مهماتي  غير المنجزة ", path: "/NTasks", icon: <HourglassTopIcon /> },
        { name: "لوحة التقييم ", path: "/DashBoard", icon: <HourglassTopIcon /> },
    ]

    const [Open, SetOpen] = useState(true)

    function opencloseSidbar() {
        Open ? SetOpen(false) : SetOpen(true)
    }
    function CloseSidbar() {
        Open ? SetOpen(true) : SetOpen(true)
    }

    return (

        <div className='HomePage'>
            <div className="header">
                <Container className='d-flex' maxWidth="lg">
                    <div className='toggel'><DensityMediumIcon onClick={opencloseSidbar} style={{ cursor: "pointer" }} /></div>

                    <Button style={{ fontSize: "25px", color: "gold", fontWeight: "900" }} variant="text">مهماتي</Button>


                </Container>
            </div>

            <div color='third' className={Open ? "SidBar" : "ClosSidBare"}>
                {
                    SideBarLinks.map((link, index) => (
                        <Button
                            onClick={CloseSidbar}
                            key={index}
                            component={Link}
                            to={link.path}
                            style={{ margin: "5px 5px " }}
                            endIcon={link.icon}
                            color='secondary'
                            variant="contained">
                            {link.name}
                        </Button>

                    ))
                }
            </div>


            <div className='SubPages'>
                <div className="Popup">
                    <Outlet />
                </div>
            </div>


        </div>
    )
}

