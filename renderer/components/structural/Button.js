import styles from "../../styles/components/Button.module.css"
import Line from "./Line";


export default function Button(props){

    return (
        <Line>
            <input
                value={props.value}
                className={styles.input}
                type={"button"}
                onClick={props.onClick}
                style={props.style}
            />
        </Line>
    )
}
