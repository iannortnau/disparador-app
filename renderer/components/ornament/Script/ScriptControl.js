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



export default function ScriptControl(){
  const {
    scriptsList,
    setAplication,
  } = useContext(GlobalContext);

  const [name, setName] = useState("");

  function createScript(){
    const args = {
      comand: "createScript",
      data:{
        name:"!ROTEIRO!:"+name
      }
    }
    ipcRenderer.send("comandChannel",args)
  }

  function deleteScript(id){
    const args = {
      comand: "deleteScript",
      data:{
        id
      }
    }
    ipcRenderer.send("comandChannel",args)
  }

  return (
    <Page>
      <Block>
        <Image src={img}/>
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
      <Block>
        {scriptsList.map(function(script) {
          return(
            <Button
              key={script.id}
              value={script.name}
              onClick={function() {
                deleteScript(script.id);
              }}
            />
          )
        })}
      </Block>
    </Page>
  );
}
