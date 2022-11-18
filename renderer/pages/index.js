import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import Load from '../components/ornament/main/Load';
import Autenticate from '../components/ornament/main/Autenticate';
import QrCode from '../components/ornament/main/QrCode';
import Status from '../components/ornament/main/Status';
import ApplicationControl from '../components/ornament/main/ApplicationControl';
const { ipcRenderer } = require('electron');
const Store = require('electron-store');
const store = new Store();

export default function Index(){
  const {
    load,
    setLoadMessage,
    authenticated,
    whatsAuthenticated,
    setLoad,
    validateKey,
    setQr,
    setWhatsAuthenticated,
    setWhatsReady,
    getScripts,
    setMessage
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
      if(code === "loading"){
        setLoadMessage(response.data.message);
      }
      if(code === "qrcode"){
        setQr(response.data);
      }
      if(code === "authenticated"){
        setWhatsAuthenticated(true);
      }
      if(code === "ready"){
        setWhatsReady(true);
        getScripts();
      }
      if(code === "loggedOut"){
        setWhatsAuthenticated(false);
      }
      if(code === "scriptCreated"){
        getScripts();
        setTimeout(function() {
          setLoad(false);
          setMessage({
            text:"Roteiro Criado",
            bgColor:"green",
            txColor:"white"
          });
        },1000);
      }
      if(code === "scriptDeleted"){
        getScripts();
        setTimeout(function() {
          setLoad(false);
          setMessage({
            text:"Roteiro Deletado",
            bgColor:"green",
            txColor:"white"
          });
        },3000);
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
      {!load&&authenticated&&whatsAuthenticated&&
        <ApplicationControl/>
      }
      <Status/>
    </>
  );
}
