import styles from "../../styles/components/Title.module.css"
import Line from "./Line";


export default function Title(props){
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
