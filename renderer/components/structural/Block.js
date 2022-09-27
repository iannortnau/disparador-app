import styles from "../../styles/components/Block.module.css";



export default function Block(props){

    return (
        <div className={styles.main} style={props.style}>
            {props.children}
        </div>
    );
}
