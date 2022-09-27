import styles from "../../styles/components/Loader.module.css";



export default function Loader(props){

    return (
        <div className={styles.loader} style={props.style}/>
    );
}
