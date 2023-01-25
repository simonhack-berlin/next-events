import { useRouter } from "next/router";
import ArrowLeft from "../icons/arrow-left";
import classes from "./back-button.module.css";

function BackButton() {

    const router = useRouter()

    return (
        <button className={classes.btn} onClick={() => router.back()}>
            <span className={classes.icon}><ArrowLeft /></span> <span>Back</span>
        </button>
    ); 
}

export default BackButton;
