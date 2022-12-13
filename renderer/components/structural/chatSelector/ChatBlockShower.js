import styles from "../../../styles/components/ChatBlockShower.module.css";
import Image from 'next/image';
import { ipcRenderer } from 'electron';
import { useEffect, useState } from 'react';
import Column from '../Column';
import Line from '../Line';
import TextSmall from '../TextSmall';
import ChatMsg from './ChatMsg';
import Button from '../Button';


export default function ChatBlockShower(props){
  const chat = props.chat;
  const [chatData, setChatData] = useState(null);

  useEffect(() => {
    getChatData();
  }, []);

  function getChatData(){
    const args = {
      comand: "getContactsData",
      data: {
        chat: chat
      }
    }
    ipcRenderer.send("comandChannel",args);

    ipcRenderer.once("comandChannel",(event,args)=>{
      setChatData(args);
    });
  }

  return(
    <>
      <div
        className={styles.body}
      >
        {chatData&&
          <Column
            style={{margin:5}}
          >
            <Line
              style={{
                width:"100%",
                paddingRight:20,
                paddingBottom:4
              }}
            >
              <div style={{display:'flex',borderRadius: '20px', overflow: 'hidden'}}>
                <Image src={chatData.image}
                       width={40}
                       height={40}
                />
              </div>
              <TextSmall
                style={{fontSize:15}}
              >
                {chat.name}
              </TextSmall>
            </Line>
            <div
              className={styles.block}
            >
              {chatData.msg.reverse().map((item)=>{
                return(
                  <ChatMsg
                    key={item.id._serialized}
                    msg={item}
                  />
                );
              })}
            </div>
            <Line
              style={{
                width:"100%",
                borderColor: "#477f81",
              }}
            >
              <Button
                style={{
                  width:"50%",
                  backgroundColor:"rgb(89,55,55)",
                  fontSize:12
                }}
                value={"VOLTAR"}
                onClick={function(){
                  props.setPreSelectedChat(null);
                }}
              />
            </Line>
          </Column>
        }

      </div>
    </>
  );
}