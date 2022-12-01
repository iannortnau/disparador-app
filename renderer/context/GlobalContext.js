import {createContext, useState} from "react";
import axios from "axios";
import moment from "moment";
import { ipcRenderer } from 'electron';
import { fileTypeFromFile } from 'file-type';
import * as fs from 'fs';
const Store = require('electron-store');
const store = new Store();

export const GlobalContext = createContext({});

export function GlobalProvider(props){
  const googleItCloudUrl = "http://googleitcloud.nuvem.host/searchWhatsNumbers";
  const apiUrl = "http://82.180.160.211:3000/validation/";
  const homeDir = require("os").homedir();
  const midiaFileRoute = homeDir+"/DisparadorApp";
  const midiaFileRouteImages = midiaFileRoute+"/Images";
  const midiaFileRouteAudios = midiaFileRoute+"/Audios";
  const midiaFileRouteVideos = midiaFileRoute+"/Videos";
  const midiaFileMapRoute = midiaFileRoute+"/map.txt";
  const midiaItemBaseStructure = {
    id: "",
    name: "",
    route: "",
    type: ""
  }


  const [loadMessage,setLoadMessage] = useState("");
  const [whatsMessage,setWhatsMessage] = useState();
  const [aplication, setAplication] = useState("ApplicationPanel");
  const [numbers,setNumbers] = useState();
  const [numbersColetor,setNumbersColetor] = useState();
  const [delay,setDelay] = useState(0);
  const [load, setLoad] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [whatsAuthenticated, setWhatsAuthenticated] = useState(false);
  const [whatsReady, setWhatsReady] = useState(false);
  const [shoting, setShoting] = useState(false);
  const [qr, setQr] = useState();
  const [key, setKey] = useState("");
  const [resposta, setResposta] = useState(false);
  const [scriptsList, setScriptsList] = useState([]);
  const [script, setScript] = useState();
  const [message, setMessage] = useState({
    text:"",
    bgColor:"",
    txColor:""
  });

  async function validateKey(key){
    try{
      await axios.get(apiUrl+key);

      console.log("conectado | "+moment().format("DD/MM/YYYY(HH:mm:ss)"));

      setMessage({
        text:"Chave válida",
        bgColor:"green",
        txColor:"white"
      });
      setLoad(false);
      setAuthenticated(true);

      store.set("key",key);
    }catch (e){
      setLoad(false);
      setAuthenticated(false);

      console.log("erro[1] | "+moment().format("DD/MM/YYYY(HH:mm:ss)"));

      setMessage({
        text:"Chave inválida",
        bgColor:"red",
        txColor:"white"
      })

      store.delete("key");
    }

  }

   async function find(data){
    try{
      const resp = await axios.post(googleItCloudUrl,data.data,{
        headers:{
          "token": key
        }
      });

      console.log(resp.data.numbers);

      if (resp.status === 200) {
        return {status:200,data:resp.data.numbers}
      }
    }catch (e) {
        throw new Error(e);
    }
  }

  function getScripts(){
    const args = {
      comand: "getScripts",
    }

    ipcRenderer.send("comandChannel",args);

    ipcRenderer.once("comandChannel",function(event, args) {
      setScriptsList(null);
      setScriptsList(args);
    })
  }

  function initialMediaFileCheck(){
    if(checkTheExistenceOfTheMediaFile()){
      loadMidiaMap();
    }else {
      createMidiaFolder();
    }
  }

  function createMidiaFolder(){
    fs.mkdirSync(midiaFileRoute);
    fs.mkdirSync(midiaFileRouteImages);
    fs.mkdirSync(midiaFileRouteAudios);
    fs.mkdirSync(midiaFileRouteVideos);
    createMidiaFileMap();
  }
  function createMidiaFileMap(){
    const baseMapStructure = {
      images: [],
      audios: [],
      videos: []
    }
    fs.writeFileSync(midiaFileMapRoute,JSON.stringify(baseMapStructure));
  }

  function checkTheExistenceOfTheMediaFile() {
    const midiaFileStats = fs.existsSync(midiaFileRoute);

    if (midiaFileStats) {
      return true;
    } else {
      return false;
    }
  }

  function loadMidiaMap() {

  }

  return (
    <GlobalContext.Provider
      value={{
        homeDir,
        midiaFileRoute,
        midiaFileRouteImages,
        midiaFileRouteAudios,
        midiaFileRouteVideos,
        midiaFileMapRoute,
        loadMessage,setLoadMessage,
        load,setLoad,
        authenticated,setAuthenticated,
        key,setKey,
        whatsAuthenticated,setWhatsAuthenticated,
        whatsReady,setWhatsReady,
        shoting,setShoting,
        message,setMessage,
        qr,setQr,
        whatsMessage,setWhatsMessage,
        numbers, setNumbers,
        numbersColetor, setNumbersColetor,
        delay,setDelay,
        aplication,setAplication,
        resposta,setResposta,
        scriptsList,setScriptsList,
        script,setScript,
        validateKey,
        find,
        getScripts,
        initialMediaFileCheck
      }}>
      {props.children}
    </GlobalContext.Provider>
  );
}
