import Page from "../structural/Page";
import Block from "../structural/Block";
import img from "../../public/Post de tecnologia cortado.png";
import Image from "next/image";
import Button from "../structural/Button";
import { useContext, useEffect } from 'react';
import {GlobalContext} from "../../context/GlobalContext";
import Title from "../structural/Title";
import { ipcRenderer } from 'electron';
import TextInputArea from '../structural/TextInputArea';
import Delay from '../structural/Delay';



export default function Shoter(){
  const {
    setWhatsMessage,
    whatsMessage,
    setNumbers,
    numbers,
    setMessage,
    setShoting
  } = useContext(GlobalContext);

  useEffect(() => {
    setNumbers(null);
    setWhatsMessage(null);
  }, []);

  function shot(){
    if(whatsMessage&&numbers){
      setShoting(true);
    }else{
      setMessage({
        text:"Todos os campos são obrigatórios",
        bgColor:"red",
        txColor:"white"
      })
    }
  }

  function logOut(){
    const args = {
      comand: "logOut"
    }
    ipcRenderer.send("comandChannel",args)
  }

  return (
    <Page>
      <Block>
        <Image src={img}/>

        <Title style={{ margin:4 }}>Mensagem</Title>
        <TextInputArea
          onChange={(aux)=>{
            setWhatsMessage(aux.target.value);
          }}
          style={{
            height:75,
            marginTop:0,
            width:"80%"
          }}
        />

        <Title style={{ margin:4 }}>Números</Title>
        <TextInputArea
          onChange={(aux)=>{
            setNumbers(aux.target.value);
          }}
          style={{
            marginTop:0,
            height:75,
            width:"80%"
          }}
        />

        <Title style={{ margin:4 }}>Intervalo</Title>
        <Delay/>

        <Button
          value={"DISPARAR"}
          onClick={shot}
        />
        <Button
          style={{
            backgroundColor:"rgba(86,16,16,0.71)"
          }}
          value={"SAIR WHATS"}
          onClick={logOut}
        />
      </Block>
    </Page>
  );

}
