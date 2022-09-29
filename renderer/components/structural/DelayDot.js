import styles from "../../styles/components/DelayDot.module.css";
import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';




export default function DelayDot(props){
  const {
    delay
  } = useContext(GlobalContext);

  return (
    <div
      className={styles.main}
      style={{backgroundColor:delay === props.value ? "#1e4849" : "#337172"}}
      onClick={()=>{
        props.onClick(props.value);
      }}
    >
      <h1
        className={styles.text}
      >
        {props.value}
      </h1>
    </div>
  );
}
