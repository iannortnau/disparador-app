import TextSmall from '../TextSmall';
import { useContext, useEffect, useState } from 'react';
import Select from 'react-select';
import Line from '../Line';
import { GlobalContext } from '../../../context/GlobalContext';
import ChatShower from './ChatShower';
import { ipcRenderer } from 'electron';

export default function ChatSelector(props){
  const {
  } = useContext(GlobalContext);
  const options = [
    { value: -1, label: 'Todos' },
    { value: 0, label: 'Lidas' },
    { value: 1, label: 'Não Lidas' },
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
      background: "#3b3b3b",
      borderRadius: "10px",
      borderColor: "#3b3b3b",
      boxShadow: state.isFocused ? null : null,
      width:"299px"
    }),
  }
  const [chatType, setChatType] = useState();
  const [data, setData] = useState([]);

  useEffect(() => {
    if(chatType !== undefined){
      getMidiaData();
    }
  }, [chatType]);

  function getMidiaData(){
    const args = {
      comand: "getContacts",
    }
    ipcRenderer.send("comandChannel",args);

    ipcRenderer.once("comandChannel",(event,args)=>{
      console.log(args);
    });
  }

  return(
    <>
      <TextSmall
        style={{fontSize:18}}
      >
        Escolha a Conversa
      </TextSmall>

      <Line>
        <Select
          placeholder={"Tipo de Mídia"}
          options={options}
          onChange={(value)=>{
            setChatType(value);
          }}
          styles={customStyles}
        />
      </Line>

      <ChatShower
        data={data}
        setChat={props.setChat}
      />
    </>
  );
}
