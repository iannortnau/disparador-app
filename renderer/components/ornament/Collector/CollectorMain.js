import Page from "../../structural/Page";
import Block from "../../structural/Block";
import TextInput from "../../structural/TextInput";
import img from "../../../public/Post de tecnologia cortado.png";
import Image from "next/image";
import Button from "../../structural/Button";
import Title from "../../structural/Title";
import Select from "react-select";
import {useContext, useState} from "react";
import Line from "../../structural/Line";
import {GlobalContext} from "../../../context/GlobalContext";



export default function CollectorMain(){
  const {
    setMessage,
    setLoad,
    resposta,
    setResposta,
    numbersColetor,
    setNumbersColetor,
    numbers,
    setNumbers,
    find,
    setAplication,
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
  const customStyles = {
    control: (base, state) => ({
      ...base,
      color: "red",
      background: "#3b3b3b",
      borderRadius: "10px",
      borderColor: "#3b3b3b",
      boxShadow: state.isFocused ? null : null,
      width:"299px",
      paddingLeft:'36px',
    }),
    singleValue:(provided) => ({
      ...provided,
      color:'white',
    }),
    option:(provided, { isFocused, isSelected }) => ({
      ...provided,
      borderRadius: "10px",
      backgroundColor: isSelected? "#5bdfe4" : isFocused? "rgba(90,221,226,0.75)": "rgba(0,0,0,0)"
    }),
    menu: (base, state) => ({
      ...base,
      background: "#3b3b3b",
      borderRadius: "10px",
      borderColor: "#3b3b3b",
      boxShadow: state.isFocused ? null : null,
      width:"299px"
    }),
  }

  async function busca() {
    if (context && ddd && local && source) {
      setLoad(true);
      try {
        const resp = await find({
          data:{
            contexto: context,
            local: local,
            fonte: source,
            ddd: ddd
          }
        })
        if(resp.status === 200){
          setNumbersColetor(resp.data);
          let auxNumbers = numbers
          for (let i = 0; i < resp.data.length; i++) {
            auxNumbers += `+55${resp.data[i]}\n`;
          }
          setNumbers(auxNumbers);
          setResposta(true);
          setMessage({
            text:"Sucesso",
            bgColor:"green",
            txColor:"white"
          });
        }
        console.log(resp);
      } catch (e) {
        console.log(e);
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
              setContext(aux.target.value);
            }}
          />
          <TextInput
            placeholder={"Local"}
            onChange={function (aux) {
              setLocal(aux.target.value);
            }}
          />
          <TextInput
            placeholder={"DDD"}
            onChange={function (aux) {
              setDdd(aux.target.value);
            }}
          />
          <Line
            style={{
              marginTop:20,
          }}
          >
            <Select
              placeholder={"Fonte de busca"}
              options={options}
              onChange={setSource}
              styles={customStyles}
            />
          </Line>
          <Button
            value={"BUSCAR"}
            onClick={busca}
          />
          <Button
            style={{
              backgroundColor:"rgba(86,16,16,0.71)"
            }}
            value={"VOLTAR"}
            onClick={function(){
              setAplication("ApplicationPanel");
            }}
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
          {numbersColetor.map(function (number,index) {
            return (
              <p
                key={number+index}
                style={{
                  margin:0,
                  color:"#54d7e4",
                  fontSize:"10px"
                }}
              >+55{number}</p>
            );
          })}
          <Button
            value={"BUSCAR"}
            onClick={function (){
              setResposta(false);
            }}
          />
          <Button
            style={{
              backgroundColor:"rgb(90,224,226)"
            }}
            value={"DISPARAR"}
            onClick={function(){
              setAplication("ShoterControler");
            }}
          />
          <Button
            style={{
              backgroundColor:"rgba(86,16,16,0.71)"
            }}
            value={"VOLTAR"}
            onClick={function(){
              setAplication("ApplicationPanel");
            }}
          />
        </Block>
      </Page>
    );
  }
}
