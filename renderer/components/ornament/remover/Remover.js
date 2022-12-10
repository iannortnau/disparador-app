import Page from "../../structural/Page";
import Block from "../../structural/Block";
import img from "../../../public/Post de tecnologia cortado.png";
import Image from "next/image";
import Button from "../../structural/Button";
import { useContext, useEffect, useState } from 'react';
import {GlobalContext} from "../../../context/GlobalContext";
import Title from "../../structural/Title";
import MidiaSelector from '../../structural/midiaSelector/MidiaSelector';
import MidiaLineShower from '../../structural/MidiaLineShower';


export default function Remover(){
  const {
    setAplication,
    removeMidiaFromMap,
    setLoad
  } = useContext(GlobalContext);
  const [midia, setMidia] = useState(null);

  function deleta(){
    setLoad(true);
    removeMidiaFromMap(midia);
    setMidia(null);
  }



  return (
    <Page>
      <Block>
        <Image src={img}/>

        <Title style={{ margin:8 }}>Deletar Mídia</Title>

        {!midia&&
          <MidiaSelector
            setMidia={setMidia}
          />
        }
        {midia&&
          <>
            <MidiaLineShower
              item={midia}
              setMidia={setMidia}
            />
            <Button
              value={"DELETAR"}
              onClick={deleta}
            />
          </>
        }
        <Button
          style={{
            backgroundColor:"rgba(86,16,16,0.71)"
          }}
          value={"VOLTAR"}
          onClick={function(){
              setAplication("ApplicationPanel");
            }
          }
        />
      </Block>
    </Page>
  );

}
