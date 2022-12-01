import Page from "../../structural/Page";
import Block from "../../structural/Block";
import img from "../../../public/Post de tecnologia cortado.png";
import Image from "next/image";
import Button from "../../structural/Button";
import { useContext, useEffect, useState } from 'react';
import {GlobalContext} from "../../../context/GlobalContext";
import Title from "../../structural/Title";
import Select from 'react-select';
import Line from '../../structural/Line';
import TextInput from '../../structural/TextInput';
import { ipcRenderer } from 'electron';
import * as readline from 'readline';



export default function UploaderMidiaSearch(props){
  const {
    setMessage
  } = useContext(GlobalContext);
  const options = [
    { value: 0, label: 'Áudio' },
    { value: 1, label: 'Vídeo' },
    { value: 2, label: 'Imagem' }
  ]
  const customStyles = {
    control: (base, state) => ({
      ...base,
      color: "red",
      background: "#3b3b3b",
      borderRadius: "10px",
      borderColor: "#3b3b3b",
      boxShadow: state.isFocused ? null : null,
      width:"299px",
      paddingLeft:'36px',
    }),
    singleValue:(provided) => ({
      ...provided,
      color:'white',
    }),
    option:(provided, { isFocused, isSelected }) => ({
      ...provided,
      borderRadius: "10px",
      backgroundColor: isSelected? "#5bdfe4" : isFocused? "rgba(90,221,226,0.75)": "rgba(0,0,0,0)"
    }),
    menu: (base, state) => ({
      ...base,
      background: "#3b3b3b",
      borderRadius: "10px",
      borderColor: "#3b3b3b",
      boxShadow: state.isFocused ? null : null,
      width:"299px"
    }),
  }
  const [midiaType, setMidiaType] = useState();


  async function search(){

    let comand;
    switch (midiaType.value) {
      case 0:
        comand = "audioSearch";
      case 1:
        comand = "videoSearch";
      case 2:
        comand = "imageSearch";
    }
    const args = {
      comand: comand,
    }
    ipcRenderer.send("fileChannel",args);

    ipcRenderer.once("fileChannel",(event,args)=>{
      props.setMidiaRoute(args);
    });
  }

  return (
    <>
      <Line
        style={{
          marginTop:10,
        }}
      >
        <Select
          placeholder={"Tipo de Midia"}
          options={options}
          onChange={(value)=>{
            setMidiaType(value);
            props.setMidiaType(value);
          }}
          styles={customStyles}
        />
      </Line>

      {midiaType
        ?
        <Button
          value={"ESCOLHER"}
          onClick={search}
        />
        :
        <Button
          style={{
            backgroundColor:"rgba(213,190,59,0.32)"
          }}
          value={"ESCOLHER"}
          onClick={function(){
            setMessage({
              text:"Escolha um tipo de Midia",
              bgColor:"red",
              txColor:"white"
            });
          }}
        />
      }
    </>
  );

}
