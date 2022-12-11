import styles from "../../../styles/components/ChatMsg.module.css";
import Line from '../Line';
import { ipcRenderer } from 'electron';
import { useEffect } from 'react';

export default function ChatMsg(props){
  const msg = props.msg;
  const fromMe = msg.fromMe;
  const body = msg.body;
  const hasMidia = msg.hasMedia;

  return(
    <Line
      style={{
        justifyContent: fromMe?"flex-end":"flex-start"
      }}
    >
      <div
        className={styles.body}
      >
        {hasMidia&&
          <p
            className={styles.textAlert}
          >
            Mídia abra o WhatsApp para visualizar
          </p>
        }
        <p
          className={styles.text}
        >
          {body}
        </p>
      </div>
    </Line>
  );

}
