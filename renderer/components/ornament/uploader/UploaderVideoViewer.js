import TextSmall from '../../structural/TextSmall';
import { useContext, useState } from 'react';
import TextInput from '../../structural/TextInput';
import Button from '../../structural/Button';
import { GlobalContext } from '../../../context/GlobalContext';
import ReactPlayer from 'react-player';



export default function UploaderVideoViewer(props){
  const {
    addMidiaToMap,
    setMessage
  } = useContext(GlobalContext);
  const midiaRoute = props.midiaRoute;
  const [midiaName, setMidiaName] = useState("");

  async function save(){
    if(midiaName.length > 0){
      addMidiaToMap(midiaRoute,midiaName,"video");
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

      <ReactPlayer
        url={"file://"+midiaRoute}
        width={300}
        height={200}
        controls
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
