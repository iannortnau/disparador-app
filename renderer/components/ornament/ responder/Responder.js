import Page from "../../structural/Page";
import Block from "../../structural/Block";
import img from "../../../public/Post de tecnologia cortado.png";
import Image from "next/image";
import Button from "../../structural/Button";
import { useContext, useEffect, useState } from 'react';
import {GlobalContext} from "../../../context/GlobalContext";
import Title from "../../structural/Title";
import MidiaSelector from '../../structural/midiaSelector/MidiaSelector';
import ChatSelector from '../../structural/chatSelector/ChatSelector';
import { ipcRenderer } from 'electron';
import { fileTypeFromFile } from 'file-type';


export default function Responder(){
  const {
    setAplication,
    setMessage
  } = useContext(GlobalContext);
  const [chat, setChat] = useState(null);

  async function sendMidia(midia){
    const fileType = await fileTypeFromFile(midia.route);
    const whatsMessage = {
      fileRoute: midia.route,
      type: fileType,
      name: "midia."+fileType.ext
    }
    const args = {
      comand: "send",
      data:{
        number: chat.id._serialized,
        midia: whatsMessage
      }

    }
    ipcRenderer.send("comandChannel",args);

    ipcRenderer.once("comandChannel",(event,args)=>{
      if(args){
        setMessage({
          text:"Mídia enviada.",
          bgColor:"green",
          txColor:"white"
        });
      }else{
        setMessage({
          text:"Mídia ERRO.",
          bgColor:"red",
          txColor:"white"
        });
      }
    });
  }

  return (
    <Page>
      <Block>
        <Image src={img}/>

        <Title style={{ margin:8 }}>Responder Contato</Title>

        <ChatSelector
          setChat={setChat}
        />


        <MidiaSelector
          action={sendMidia}
          selectorText={"ENVIAR"}
        />

        <Button
          style={{
            backgroundColor:"rgba(86,16,16,0.71)"
          }}
          value={"VOLTAR"}
          onClick={function(){
            setAplication("ApplicationPanel");
          }}
        />
      </Block>
    </Page>
  );

}
