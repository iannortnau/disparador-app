import Page from "../../structural/Page";
import Block from "../../structural/Block";
import img from "../../../public/Post de tecnologia cortado.png";
import Image from "next/image";
import TextInput from "../../structural/TextInput";
import {useContext, useState} from "react";
import Button from "../../structural/Button";
import {GlobalContext} from "../../../context/GlobalContext";
import axios from "axios";




export default function Autenticate(){
    const {
        setMessage,
        setLoad,
        validateKey
    } = useContext(GlobalContext);
    const [auxKey, setAuxKey] = useState("");

    function validate(){
        if(auxKey.length!==0){
            setLoad(true);
            validateKey(auxKey);
        }else{
            setMessage({
                text:"A Chave não pode estar vazia.",
                bgColor:"red",
                txColor:"white"
            })
        }
    }


    return (
      <Page>
          <Block>
                <Image
                  src={img}
                />
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
