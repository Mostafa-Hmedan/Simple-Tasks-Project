import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import AddTaskPage from "./AddTaskPage";

export default function IntroPage() {
    return (<>

        <div className="BoxInfo">
            أضف مهمتك الاولى
            <Link to='/AddTask'>
                <Button color="secondary" style={{marginRight:"20px"}} variant="contained">إضافة </Button>
            </Link>

        </div>
        <div className="BoxInfo">الموقع قيد التطوير وسيتم إضافة العديد من الإضافات الى الحالية

            <br />
            تجربة ممتعة
            <br />
            Mostafa Al Hamde
        </div>


    </>
    )
}

