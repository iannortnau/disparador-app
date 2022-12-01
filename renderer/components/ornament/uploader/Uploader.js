import Page from "../../structural/Page";
import Block from "../../structural/Block";
import img from "../../../public/Post de tecnologia cortado.png";
import Image from "next/image";
import Button from "../../structural/Button";
import { useContext, useEffect, useState } from 'react';
import {GlobalContext} from "../../../context/GlobalContext";
import Title from "../../structural/Title";
import Select from 'react-select';
import Line from '../../structural/Line';
import TextInput from '../../structural/TextInput';
import { ipcRenderer } from 'electron';
import * as readline from 'readline';
import UploaderMidiaSearch from './UploaderMidiaSearch';
import UploaderImageViewer from './UploaderImageViewer';



export default function Uploader(){
  const {
    setAplication,
  } = useContext(GlobalContext);
  const [midiaRoute, setMidiaRoute] = useState();
  const [midiaType, setMidiaType] = useState();



  return (
    <Page>
      <Block>
        <Image src={img}/>

        <Title style={{ margin:8 }}>Criar Midia</Title>

        {!midiaRoute&&
          <UploaderMidiaSearch
            setMidiaRoute={setMidiaRoute}
            setMidiaType={setMidiaType}
          />
        }

        {midiaRoute && midiaType.value === 2 &&
          <UploaderImageViewer
            midiaRoute={midiaRoute}
          />
        }

        <Button
          style={{
            backgroundColor:"rgba(86,16,16,0.71)"
          }}
          value={"VOLTAR"}
          onClick={function(){
            if(midiaRoute){
              setMidiaRoute(null);
            }else{
              setAplication("ApplicationPanel");
            }

          }}
        />
      </Block>
    </Page>
  );

}
