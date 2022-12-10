import Page from "../../structural/Page";
import Block from "../../structural/Block";
import img from "../../../public/Post de tecnologia cortado.png";
import imgDisparador from "../../../public/icons8-enviar-e-mail-em-massa-96.png";
import imgColetor from "../../../public/icons8-pesquisar-128.png";
import imgRoteiro from "../../../public/icons8-chat-64.png";
import imgUploader from "../../../public/icons8-fazer-upload-64.png";
import imgResponder from "../../../public/icons8-send-58.png";
import Image from "next/image";
import AppGrid from '../../structural/AppGrid';
import AppBlock from '../../structural/AppBlock';
import Button from '../../structural/Button';
import { ipcRenderer } from 'electron';



export default function ApplicationPanel(){

  function logOut(){
    const args = {
      comand: "logOut"
    }
    ipcRenderer.send("comandChannel",args)
  }

  return (
    <Page>
      <Block>
        <Image src={img}/>
      </Block>
      <AppGrid>
        <AppBlock
          img={imgDisparador}
          title={"Disparador"}
          page={"ShoterControler"}
        />
        <AppBlock
          img={imgColetor}
          title={"Coletor"}
          page={"CollectorMain"}
        />
        <AppBlock
          img={imgRoteiro}
          title={"Criar Roteiros"}
          page={"ScriptCreate"}
        />
        <AppBlock
          img={imgRoteiro}
          title={"Deletar Roteiros"}
          page={"ScriptDelete"}
        />
        <AppBlock
          img={imgUploader}
          title={"Criar Mídia"}
          page={"Uploader"}
        />
        <AppBlock
          img={imgUploader}
          title={"Deletar Mídia"}
          page={"Remover"}
        />
        <AppBlock
          img={imgResponder}
          title={"Responder"}
          page={"Responder"}
        />
      </AppGrid>
      <Button
        style={{
          backgroundColor:"rgba(86,16,16,0.71)"
        }}
        value={"SAIR WHATS"}
        onClick={logOut}
      />
    </Page>
  );
}
