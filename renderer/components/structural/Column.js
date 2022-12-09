import styles from "../../styles/components/Column.module.css";



export default function Column(props){

    return (
        <div
          className={styles.main}
          style={props.style}
          onClick={props.onClick}
        >
            {props.children}
        </div>
    );
}
