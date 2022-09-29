import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import Load from '../components/ornament/Load';
import Autenticate from '../components/ornament/Autenticate';
import QrCode from '../components/ornament/QrCode';
import Shoter from '../components/ornament/Shoter';
import ShoterLoad from '../components/ornament/ShoterLoad';
import Status from '../components/ornament/Status';
const { ipcRenderer } = require('electron');
const Store = require('electron-store');
const store = new Store();

export default function Home(){
  const {
    load,
    authenticated,
    whatsAuthenticated,
    shoting,
    setLoad,
    validateKey,
    setQr,
    setWhatsAuthenticated,
    setWhatsReady
  } = useContext(GlobalContext);

  useEffect(() => {
    //store.delete("key");
    resp();
    login();
    return () => {
      ipcRenderer.removeAllListeners("responseChannel");
    };
  }, []);

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
      if(code === "loggedOut"){
        setWhatsAuthenticated(false);
      }
    })
  }

  function login(){
    setLoad(true);
    const key = store.get('key');
    if(key){
      validateKey(key);
    }else{
      setLoad(false);
    }
  }

  return (
    <>
      {load&&
        <Load/>
      }
      {!load&&!authenticated&&
        <Autenticate/>
      }
      {!load&&authenticated&&!whatsAuthenticated&&
        <QrCode/>
      }
      {!load&&authenticated&&whatsAuthenticated&&!shoting&&
        <Shoter/>
      }
      {!load&&authenticated&&whatsAuthenticated&&shoting&&
        <ShoterLoad/>
      }
      <Status/>
    </>
  );
}
