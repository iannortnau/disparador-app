import Page from "../structural/Page";
import Block from "../structural/Block";
import QRCode from 'react-qr-code';
import img from "../../public/GetImage.png"
import Image from "next/image";
import Loader from "../structural/Loader";
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { ipcRenderer } from 'electron';
import Title from '../structural/Title';
import Line from '../structural/Line';

export default function QrCode(props){
  const {
    qr,
  } = useContext(GlobalContext);

  useEffect(() => {
    start();
  }, []);

  async function start(){
    const args = {
      comand: "start"
    }
    ipcRenderer.send("comandChannel",args);
  }

  return (
    <Page>
      <Block>
        {qr
          ?
          <>
            <QRCode
              value={qr}
              bgColor={"#476364"}
              fgColor={"#000000"}
            />
            <Line>
              <Title>Abra o aplicativo do WhatsApp e escaneie o QRcode</Title>
            </Line>
          </>
          :
          <>
            <Image
              src={img}
              priority
            />
            <Title>Iniciando WhatsApp</Title>
            <Loader/>
          </>
        }
      </Block>
    </Page>
  );
}
