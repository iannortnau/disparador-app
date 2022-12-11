import styles from "../../../styles/components/ChatShower.module.css";
import TextSmall from '../TextSmall';
import { useContext, useEffect, useState } from 'react';
import ChatItem from './ChatItem';
import LoaderSmall from '../LoaderSmall';

export default function ChatShower(props){
  const [chat, setChat] = useState(null);
  const chatData = props.data||[];
  const chatType = props.chatType;
  const loadChat = props.loadChat;

  useEffect(() => {
    setChat(null);
  }, [chatData]);


  return(
    <>
      <div
        className={styles.body}
      >
        {loadChat&&
          <LoaderSmall/>
        }

        {chatData.length===0&&!loadChat&&
          <TextSmall
            style={{opacity:0.5}}
          >
            Nada para ser mostrado aqui
          </TextSmall>
        }
        {chatData.length>0&&!chat&&!loadChat&&
          <div
            className={styles.block}
          >
            {chatData.map(function(chat) {
              if(chat.unreadCount>0 && chatType.value === 1){
                return (
                  <ChatItem
                    key={chat.id._serialized}
                    item={chat}
                    setChat={props.setChat}
                  />
                );
              }
              if(chat.unreadCount===0 && chatType.value === 0){
                return (
                  <ChatItem
                    key={chat.id._serialized}
                    item={chat}
                    setChat={props.setChat}
                  />
                );
              }
              if(chatType.value === -1){
                return (
                  <ChatItem
                    key={chat.id._serialized}
                    item={chat}
                    setChat={props.setChat}
                  />
                );
              }
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
