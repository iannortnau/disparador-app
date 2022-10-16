import styles from "../../styles/components/TextInput.module.css"
import Line from "./Line";


export default function TextInputArea(props){
    return (
        <Line>
            <textarea
                className={styles.input}
                onChange={props.onChange}
                placeholder={props.placeholder}
                style={props.style}
                value={props.value}
            />
        </Line>
    )
}
