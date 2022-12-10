import styles from "../../../styles/components/ChatShower.module.css";
import TextSmall from '../TextSmall';
import { useContext, useEffect, useState } from 'react';
import ChatDisplay from './ChatDisplay';

export default function ChatShower(props){
  const [chat, setChat] = useState(null);
  const chatData = props.data||[];

  useEffect(() => {
    setChat(null);
  }, [chatData]);


  return(
    <>
      <div
        className={styles.body}
      >
        {chatData.length===0&&
          <TextSmall
            style={{opacity:0.5}}
          >
            Nada para ser mostrado aqui
          </TextSmall>
        }
        {chatData.length>0&&!chat&&
          <div
            className={styles.block}
          >
            {chatData.map(function(item) {
              return (
                <p>
                  chat
                </p>
              );
            })}
          </div>
        }

        {/*chat&&
          <ChatDisplay
            item={chat}
            setChat={(item)=>{
              props.setChat(item);
              setChat(item)
            }}
          />
        */}
      </div>
    </>
  );
}
