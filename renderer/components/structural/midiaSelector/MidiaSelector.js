import TextSmall from '../TextSmall';
import { useContext, useEffect, useState } from 'react';
import Select from 'react-select';
import Line from '../Line';
import MidiaShower from './MidiaShower';
import { GlobalContext } from '../../../context/GlobalContext';

export default function MidiaSelector(props){
  const {
    midiaFileMap
  } = useContext(GlobalContext);
  const options = [
    { value: -1, label: 'Todos' },
    { value: 0, label: 'Áudio' },
    { value: 1, label: 'Vídeo' },
    { value: 2, label: 'Imagem' }
  ]
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
      background: "#505050",
      borderRadius: "10px",
      borderColor: "#505050",
      boxShadow: state.isFocused ? null : null,
      width:"299px"
    }),
  }
  const [midiaType, setMidiaType] = useState();
  const [data, setData] = useState([]);

  useEffect(() => {
    if(midiaType !== undefined){
      getMidiaData();
    }
  }, [midiaType]);

  function getMidiaData(){
    setData([]);
    console.log(midiaFileMap);
    if(midiaType.value === -1){
      let auxMidiaMap = [];
      auxMidiaMap = auxMidiaMap.concat(midiaFileMap.images);
      auxMidiaMap = auxMidiaMap.concat(midiaFileMap.audios);
      auxMidiaMap = auxMidiaMap.concat(midiaFileMap.videos);
      setData(auxMidiaMap);
    }
    if(midiaType.value === 0){
      setData(midiaFileMap.audios);
    }
    if(midiaType.value === 1){
      setData(midiaFileMap.videos);
    }
    if(midiaType.value === 2){
      setData(midiaFileMap.images);
    }
  }

  return(
    <>
      <TextSmall
        style={{
          fontSize:18,
          margin:5
        }}
      >
        Escolha a Mídia
      </TextSmall>

      <Line>
        <Select
          placeholder={"Tipo de Mídia"}
          options={options}
          onChange={(value)=>{
            setMidiaType(value);
          }}
          styles={customStyles}
        />
      </Line>

      <MidiaShower
        data={data}
        action={props.action}
        selectorText={props.selectorText}
      />
    </>
  );
}
