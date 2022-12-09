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
  } = useContext(GlobalContext);
  const [midia, setMidia] = useState(null);



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
          <></>
        }


        {midia&&
          <>
            <MidiaLineShower
              item={midia}
            />
            <Button
              value={"DELETAR"}
              onClick={function(){
                setAplication("ApplicationPanel");
              }}
            />
          </>
        }
        {!midia&&
            <Button
              style={{
                opacity:0.5
              }}
              value={"DELETAR"}
              onClick={function(){
                setAplication("ApplicationPanel");
              }}
            />
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
