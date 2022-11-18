import Page from "../../structural/Page";
import Block from "../../structural/Block";
import img from "../../../public/Post de tecnologia cortado.png"
import Image from "next/image";
import { ipcRenderer } from 'electron';
import { useContext, useState } from 'react';
import TextInput from '../../structural/TextInput';
import Button from '../../structural/Button';
import { GlobalContext } from '../../../context/GlobalContext';
import Title from '../../structural/Title';
import Select from 'react-select';
import Line from '../../structural/Line';
import ScriptSelector from '../../structural/ScriptSelector';



export default function ScriptCreate(){
  const {
    setAplication,
    setLoad
  } = useContext(GlobalContext);

  const [name, setName] = useState("");
  const [script, setScript] = useState();
  const [messages, setMessages] = useState();

  function createScript(){
    setLoad(true);
    const args = {
      comand: "createScript",
      data:{
        name:"ROTEIRO:"+name
      }
    }
    ipcRenderer.send("comandChannel",args)
  }

  function deleteScript(){
    setLoad(true);
    const args = {
      comand: "deleteScript",
      data:{
        id:script.value
      }
    }
    ipcRenderer.send("comandChannel",args)
  }

  function getScriptMessages(id){
    const args = {
      comand: "getScriptMessages",
      data:{
        id
      }
    }
    ipcRenderer.send("comandChannel",args);

    ipcRenderer.once("comandChannel",function(event, args) {
      setMessages(null);
      setMessages(args);
      console.log(args);
    });
  }



  return (
    <Page>
      <Block>
        <Image src={img}/>
        <Title
          style={{margin:0,marginTop:10}}
        >
          Criar Roteiro
        </Title>
        <TextInput
          placeholder={"Nome Do Roteiro"}
          onChange={function (aux) {
            setName(aux.target.value);
          }}
        />
        <Button
          value={"CRIAR"}
          onClick={createScript}
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
