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



export default function ScriptDelete(){
  const {
    setAplication,
    setLoad
  } = useContext(GlobalContext);

  const [name, setName] = useState("");
  const [script, setScript] = useState();

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

  return (
    <Page>
      <Block>
        <Image src={img}/>
        <Title
          style={{margin:0,marginTop:10}}
        >
          Roteiros Criados
        </Title>
        <ScriptSelector
          onChange={setScript}
        />
        <Button
          style={{
            backgroundColor:script?"rgba(86,16,16,0.71)":"rgba(86,16,16,0.58)"
          }}
          value={"DELETAR"}
          onClick={function(){
            if(script){
              deleteScript();
            }
          }}
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
