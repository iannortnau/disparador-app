import {createContext, useState} from "react";
import axios from "axios";
import moment from "moment";
const Store = require('electron-store');
const store = new Store();

export const GlobalContext = createContext({});

export function GlobalProvider(props){
  const [apiUrl,setApiUrl] = useState("http://82.180.160.211:3000/validation/");
  const [load, setLoad] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [whatsAuthenticated, setWhatsAuthenticated] = useState(false);
  const [whatsReady, setWhatsReady] = useState(false);
  const [shoting, setShoting] = useState(false);
  const [qr, setQr] = useState();
  const [key, setKey] = useState("");
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

  return (
    <GlobalContext.Provider
      value={{
        apiUrl,
        setApiUrl,
        load,
        setLoad,
        authenticated,
        setAuthenticated,
        key,
        setKey,
        validateKey,
        whatsAuthenticated,
        setWhatsAuthenticated,
        setWhatsReady,
        whatsReady,
        shoting,
        setShoting,
        message,
        setMessage,
        qr,
        setQr
      }}>
      {props.children}
    </GlobalContext.Provider>
  );
}
