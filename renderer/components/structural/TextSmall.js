import styles from "../../styles/components/TextSmall.module.css"
import Line from "./Line";


export default function TextSmall(props){
    return (
        <Line>
            <h1
                className={styles.title}
                style={props.style}
            >
                {props.children}
            </h1>
        </Line>
    )
}
