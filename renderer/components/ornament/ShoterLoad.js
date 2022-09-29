import Page from "../structural/Page";
import Block from "../structural/Block";
import img from "../../public/Post de tecnologia cortado.png";
import Image from "next/image";
import Button from "../structural/Button";
import { useContext, useEffect, useState } from 'react';
import {GlobalContext} from "../../context/GlobalContext";
import Title from "../structural/Title";
import { ipcRenderer } from 'electron';
import ProgressBar from '@ramonak/react-progress-bar';
import Loader from '../structural/Loader';

let stopEvent;

export default function Shoter(){
  const {
    numbers,
    setMessage,
    setShoting,
    whatsMessage,
    delay,
    shoting
  } = useContext(GlobalContext);
  const [total, setTotal] = useState(1);

  useEffect(() => {
    stopEvent = false;
    getNumbers();
    console.log(delay);
    return ()=>{
      stopEvent = true;
    }
  }, []);

  function getNumbers(){
    const auxNumbersList = numbers.replaceAll("+","").split("\n");
    const auxNumbersListFinal = [];
    for (let i = 0; i < auxNumbersList.length; i++) {
      if(auxNumbersList[i].length === 12 || auxNumbersList[i].length === 13){
        auxNumbersListFinal.push(auxNumbersList[i]);
      }
      /*
      if(auxNumbersList[i].length === 13){
        auxNumbersListFinal.push(auxNumbersList[i].replace("9",""));
      }
      */

    }
    shot(auxNumbersListFinal,0,auxNumbersListFinal.length);
  }

  async function shot(numbersList,i,total) {
    console.log(i,total);
    if (i < total && !stopEvent) {
      await send(numbersList[i]);
      i++;
      setTimeout(()=>{
        shot(numbersList,i,total);
      },(delay*100));
    }else {
      setShoting(false);
    }
  }

  async function send(number){
    const args = {
      comand: "send",
      data:{
        number: number,
        message:whatsMessage
      }

    }
    ipcRenderer.send("comandChannel",args)
  }

  function stop(){
    setShoting(false);
  }

  return (
    <Page>
      <Block>
        <Image src={img}/>

        <Title style={{ margin:4 }}>Disparando</Title>

        <Loader/>

        <Button
          style={{
            backgroundColor:"rgba(86,16,16,0.71)"
          }}
          value={"CANCELAR"}
          onClick={stop}
        />
      </Block>
    </Page>
  );

}
