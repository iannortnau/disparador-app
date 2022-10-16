import styles from "../../styles/components/AppGrid.module.css";

export default function AppGrid(props){

  return (
    <div className={styles.main} style={props.style}>
      {props.children}
    </div>
  );
}
