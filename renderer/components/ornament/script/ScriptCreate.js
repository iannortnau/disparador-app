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
import TextSmall from '../../structural/TextSmall';



export default function ScriptCreate(){
  const {
    setAplication,
    setLoad
  } = useContext(GlobalContext);

  const [name, setName] = useState("");

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
      <Block
        style={{marginTop:20}}
      >
        <Title
          style={{margin:0,marginTop:10}}
        >
          ATENÇÃO
        </Title>
        <TextSmall>
          Isso criará um grupo arquivado com o prefixo !ROTEIRO! seguido pelo nome do roteiro que você criou, nesse grupo você deve colocar as mensagens, imagens e áudios na forma e ordem que desejar, ao usar esse roteiro no Disparador, as mensagens serão enviadas no mesmo formato e ordem do Roteiro(Grupo) selecionado.
        </TextSmall>
      </Block>

    </Page>
  );
}
