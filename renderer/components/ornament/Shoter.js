import styles from "../../styles/components/Main.module.css";
import Page from "../structural/Page";
import Block from "../structural/Block";
import TextInput from "../structural/TextInput";
import img from "../../public/Post de tecnologia cortado.png";
import Image from "next/image";
import Button from "../structural/Button";
import Select from "react-select";
import {useContext, useState} from "react";
import Line from "../structural/Line";
import {GlobalContext} from "../../context/GlobalContext";
import axios from "axios";
import Title from "../structural/Title";
import { ipcRenderer } from 'electron';



export default function Shoter(props){
    const {

    } = useContext(GlobalContext);

    function resp(){
        ipcRenderer.on("responseChannel",(event,response) => {
            console.log(response);
            const code = response.code;

            if(code === "qrcode"){
                setQr(response.data);
            }
            if(code === "authenticated"){
                setWhatsAuthenticated(true);
            }
            if(code === "ready"){
                setWhatsReady(true);
            }
            if(code === "authenticatedError"){

            }
        })
    }

    return (
      <Page>
          <Block>
              <Image src={img}/>
              <Title>
                  Números
              </Title>
              <Button
                value={"BUSCAR"}
                onClick={function (){

                }}
              />
          </Block>
      </Page>
    );

}
