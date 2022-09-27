import Page from "../structural/Page";
import Block from "../structural/Block";
import img from "../../public/Post de tecnologia cortado.png";
import Image from "next/image";
import TextInput from "../structural/TextInput";
import {useContext, useState} from "react";
import Button from "../structural/Button";
import {GlobalContext} from "../../contexts/globalContext";
import axios from "axios";




export default function Autenticate(props){
    const {
        message,
        setMessage,
        setLoad,
        setAutenticate,
        setKey
    } = useContext(GlobalContext);
    const [auxKey, setAuxKey] = useState("");

    function validate(){
        if(auxKey.length!==0){
            setLoad(true);
            login(auxKey);
        }else{
            setMessage({
                text:"A Chave não pode estar vazia.",
                bgColor:"red",
                txColor:"white"
            })
        }
    }

    async function login(localKey){
        try{
            console.log(localKey);

            const resp = await axios.get("https://coletor-frontend.vercel.app/api/validation/"+localKey);

            console.log(resp);

            if(resp.status === 200){
                setAutenticate(true);
                setMessage({
                    text:"Chave válida",
                    bgColor:"green",
                    txColor:"white"
                })
                localStorage.setItem("key",localKey);
                setKey(localKey);
            }
        }catch (e) {
            setAutenticate(false);
            setMessage({
                text:"Chave inválida",
                bgColor:"red",
                txColor:"white"
            })
        }
        setLoad(false)
    }

    return (
        <Page>
            <Block>
                <Image src={img}/>
                <TextInput
                    placeholder={"Chave"}
                    onChange={function (aux) {
                        console.log(aux);
                        setAuxKey(aux.target.value);
                    }}
                />
                <Button
                    onClick={validate}
                    value={"VALIDAR"}
                />
            </Block>
        </Page>
    );
}
