import styles from "../../../styles/components/Status.module.css";
import Block from "../../structural/Block";
import Title from '../../structural/Title';
import { useContext } from 'react';
import { GlobalContext } from '../../../context/GlobalContext';
import Line from '../../structural/Line';
import OnOff from '../../structural/OnOff';



export default function Status(){
  const {
    authenticated,
    whatsAuthenticated,
    whatsReady
  } = useContext(GlobalContext);

  return (
    <Block
      style={{
        zIndex: 1,
        bottom:0,
        position:"absolute",
        borderRadius:0,
        width:"100%",
        padding:2,
        backgroundColor:"rgba(0,0,0,0)"
      }}
    >
      <Title
        style={{fontSize:12}}
      >
        Status de Conexão
      </Title>
      <Line
        style={{
          justifyContent:"space-around"
        }}
      >
        <OnOff
          status={authenticated}
          title={"Autenticação Chave"}
        />
        <OnOff
          status={whatsAuthenticated}
          title={"Autenticação Whats"}
        />
        <OnOff
          status={whatsReady}
          title={"Whats Web"}
        />
      </Line>
    </Block>
  );
}
