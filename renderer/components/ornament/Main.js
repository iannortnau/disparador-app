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
import {GlobalContext} from "../../contexts/globalContext";
import axios from "axios";
import Title from "../structural/Title";



export default function Main(props){
    const {
        message,
        setMessage,
        setLoad,
        key,
        resposta,
        setResposta,
        numbers,
        setNumbers
    } = useContext(GlobalContext);
    const options = [
        { value: null, label: 'Google' },
        { value: 0, label: 'Instagram' },
        { value: 1, label: 'Facebook' },
        { value: 2, label: 'LinkedIn' }
    ]
    const [context, setContext] = useState(false);
    const [ddd, setDdd] = useState(false);
    const [local, setLocal] = useState(false);
    const [source, setSource] = useState(false);

    async function busca() {
        if (context && ddd && local && source) {
            setLoad(true);
            try {
                const resp = await axios.post("https://coletor-frontend.vercel.app/api/find",{
                    data:{
                        contexto: context,
                        local: local,
                        fonte: source,
                        ddd: ddd
                    },
                    token:key
                })
                if(resp.status === 200){
                    setNumbers(resp.data);
                    setResposta(true);
                    setMessage({
                        text:"Sucesso",
                        bgColor:"green",
                        txColor:"white"
                    });
                }
                console.log(resp);
            } catch (e) {
                setMessage({
                    text:"ERRO tente novamente",
                    bgColor:"red",
                    txColor:"white"
                })
            }
            setLoad(false);
        } else {
            setMessage({
                text: "Preencha todos os campos",
                bgColor: "red",
                txColor: "white"
            })
        }
    }

    if(!resposta){
        return (
            <Page>
                <Block>
                    <Image src={img}/>
                    <TextInput
                        placeholder={"Contexto"}
                        onChange={function (aux) {
                            console.log(aux);
                            setContext(aux.target.value);
                        }}
                    />
                    <TextInput
                        placeholder={"Local"}
                        onChange={function (aux) {
                            console.log(aux);
                            setLocal(aux.target.value);
                        }}
                    />
                    <TextInput
                        placeholder={"DDD"}
                        onChange={function (aux) {
                            console.log(aux);
                            setDdd(aux.target.value);
                        }}
                    />
                    <Line
                        style={{marginTop:20}}
                    >
                        <Select
                            placeholder={"Fonte de busca"}
                            options={options}
                            onChange={setSource}
                        />
                    </Line>
                    <Button
                        value={"BUSCAR"}
                        onClick={busca}
                    />
                </Block>
            </Page>
        );
    }else{
        return (
            <Page>
                <Block>
                    <Image src={img}/>
                    <Title>
                        Números
                    </Title>
                    {numbers.map(function (number) {
                        return (
                          <p
                              className={styles.text}
                          >+55{number}</p>
                        );
                    })}
                    <Button
                        value={"BUSCAR"}
                        onClick={function (){
                            setResposta(false);
                        }}
                    />
                </Block>
            </Page>
        );
    }
}
