import styles from "../../styles/components/OnOff.module.css"



export default function OnOff(props){
  const color = props.status?"rgba(30,110,13,0.86)":"#561010DB";
  const title = props.title;
  return (
    <div
      className={styles.main}
      style={{backgroundColor:color}}
    >
      <h1
        className={styles.text}
      >
        {title}
      </h1>
    </div>
  )
}
