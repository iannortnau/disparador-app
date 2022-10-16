import styles from "../../styles/components/AppBlock.module.css";
import Image from 'next/image';
import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';



export default function AppBlock(props){
  const {
    setAplication
  } = useContext(GlobalContext);

  return (
    <div
      className={styles.main}
      style={props.style}
      onClick={function(){
        setAplication(props.page);
      }}
    >
      <Image
        src={props.img}
        width={56}
        height={56}
      />
      <h1 className={styles.title}>{props.title}</h1>
    </div>
  );
}
