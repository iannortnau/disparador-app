import styles from "../../styles/components/LoaderSmall.module.css";



export default function LoaderSmall(props){

    return (
        <div className={styles.loader} style={props.style}/>
    );
}
