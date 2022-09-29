import styles from "../../styles/components/TextInput.module.css"
import Line from "./Line";


export default function TextInput(props){
    return (
        <Line>
            <input
                className={styles.input}
                type={props.type}
                onChange={props.onChange}
                placeholder={props.placeholder}
                style={props.style}
            />
        </Line>
    )
}
