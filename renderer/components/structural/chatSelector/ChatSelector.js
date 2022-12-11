import TextSmall from '../TextSmall';
import { useContext, useEffect, useState } from 'react';
import Select from 'react-select';
import Line from '../Line';
import { GlobalContext } from '../../../context/GlobalContext';
import ChatShower from './ChatShower';
import { ipcRenderer } from 'electron';
import ChatBlockShower from './ChatBlockShower';

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
  const [loadChat, setLoadChat] = useState(false);
  const [preSelectedChat, setPreSelectedChat] = useState(null);

  useEffect(() => {
    if(chatType !== undefined){
      getChatData();
    }
  }, [chatType]);

  function getChatData(){
    const args = {
      comand: "getContacts",
    }
    ipcRenderer.send("comandChannel",args);

    ipcRenderer.once("comandChannel",(event,args)=>{
      setData(args);
      setLoadChat(false);
    });
  }

  return(
    <>
      <TextSmall
        style={{
          fontSize:18,
          margin:5
      }}
      >
        Escolha a Conversa
      </TextSmall>

      {!preSelectedChat&&
        <>
          <Line>
            <Select
              placeholder={"Conversas"}
              options={options}
              onChange={(value)=>{
                setChatType(value);
                setLoadChat(true);
              }}
              styles={customStyles}
            />
          </Line>

          <ChatShower
            data={data}
            chatType={chatType}
            setChat={setPreSelectedChat}
            loadChat = {loadChat}
            setLoadChat= {setLoadChat}
          />
        </>
      }

      {preSelectedChat&&
        <ChatBlockShower
          chat={preSelectedChat}
          setChat={props.setChat}
          setPreSelectedChat={setPreSelectedChat}
        />
      }
    </>
  );
}
