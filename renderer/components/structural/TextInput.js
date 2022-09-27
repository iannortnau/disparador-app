import styles from "../../styles/components/TextInput.module.css"
import Line from "./Line";


export default function TextInput(props){
    return (
        <Line>
            <input
                className={styles.input}
                type={"text"}
                onChange={props.onChange}
                placeholder={props.placeholder}
            />
        </Line>
    )
}
