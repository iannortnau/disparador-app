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
import TextSmall from '../../structural/TextSmall';
import ChatSelector from '../../structural/chatSelector/ChatSelector';
import ChatBlockShower from '../../structural/chatSelector/ChatBlockShower';


export default function Responder(){
  const {
    setAplication,
    removeMidiaFromMap,
    setLoad
  } = useContext(GlobalContext);
  const [midia, setMidia] = useState(null);
  const [chat, setChat] = useState(null);

  function deleta(){
    setLoad(true);
    removeMidiaFromMap(midia);
    setMidia(null);
  }



  return (
    <Page>
      <Block>
        <Image src={img}/>

        <Title style={{ margin:8 }}>Responder Contato</Title>

        {!chat&&
          <ChatSelector
            setChat={setChat}
          />
        }
        {chat&&
          <>
            <ChatBlockShower
              chat={chat}
              setChat={setChat}
            />
            <Button
              value={"DELETAR"}
              onClick={deleta}
            />
          </>
        }

        {!midia&&
          <MidiaSelector
            setMidia={setMidia}
          />
        }
        {midia&&
          <>
            <TextSmall
              style={{
                fontSize:18,
                margin:5
            }}
            >
              Mídia Escolhida
            </TextSmall>
            <MidiaLineShower
              item={midia}
              setMidia={setMidia}
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
