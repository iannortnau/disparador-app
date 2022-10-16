import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import Load from '../components/ornament/main/Load';
import Autenticate from '../components/ornament/main/Autenticate';
import QrCode from '../components/ornament/main/QrCode';
import Shoter from '../components/ornament/shoter/Shoter';
import ShoterLoad from '../components/ornament/shoter/ShoterLoad';
import Status from '../components/ornament/main/Status';
import ShoterControler from '../components/ornament/shoter/ShoterControler';
import ApplicationPanel from '../components/ornament/main/ApplicationPanel';
import ApplicationControl from '../components/ornament/main/ApplicationControl';
const { ipcRenderer } = require('electron');
const Store = require('electron-store');
const store = new Store();

export default function Home(){
  const {
    load,
    authenticated,
    whatsAuthenticated,
    setLoad,
    validateKey,
    setQr,
    setWhatsAuthenticated,
    setWhatsReady,
    getScripts
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
        getScripts();
      }
      if(code === "loggedOut"){
        setWhatsAuthenticated(false);
      }
      if(code === "scriptCreated"){
        getScripts();
      }
      if(code === "scriptDeleted"){
        getScripts();
      }
    })
  }

  function login(){
    setLoad(true);
    const key = store.get('key');
    if(key){
      validateKey(key);
    }else{
      setLoad(false);a
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
