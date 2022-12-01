import Image from "next/image";
import TextSmall from '../../structural/TextSmall';
import { useContext, useState } from 'react';
import TextInput from '../../structural/TextInput';
import Button from '../../structural/Button';
import { GlobalContext } from '../../../context/GlobalContext';



export default function UploaderImageViewer(props){
  const {
    addMidiaToMap,
    setMessage
  } = useContext(GlobalContext);
  const midiaRoute = props.midiaRoute;
  const [midiaName, setMidiaName] = useState("");

  async function save(){
    if(midiaName.length > 0){
      addMidiaToMap(midiaRoute,midiaName,"image");
      props.setMidiaRoutte(null);
    }else {
      setMessage({
        text:"Escolha um nome para a Mídia",
        bgColor:"red",
        txColor:"white"
      });
    }
  }

  return (
    <>
      <TextSmall
        style={{fontSize:18}}
      >
        Visualização Prévia
      </TextSmall>

      <Image
        src={"file://"+midiaRoute}
        width={300}
        height={300}
      />

      <TextInput
        placeholder={"Nome da Mídia"}
        onChange={function (aux) {
          setMidiaName(aux.target.value);
        }}
      />

      <Button
        value={"SALVAR"}
        onClick={save}
      />
    </>
  );

}
