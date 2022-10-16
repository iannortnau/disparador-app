import Line from "./Line";
import Select from 'react-select';
import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';


export default function ScriptSelector(props){
  const {
    scriptsList,
  } = useContext(GlobalContext);
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
      background: "#5b5b5b",
      borderRadius: "10px",
      borderColor: "#3b3b3b",
      boxShadow: state.isFocused ? null : null,
      width:"299px"
    }),
  };
    return (
      <Line
        style={{
          margin:10,
        }}
      >
        <Select
          placeholder={"Selecione o Roteiro"}
          options={scriptsList}
          onChange={props.onChange}
          styles={customStyles}
        />
      </Line>
    )
}
