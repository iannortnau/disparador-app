import img from "../../../public/icons8-volume-alto-50.png";
import Line from '../Line';
import Image from 'next/image';
import TextSmall from '../TextSmall';
import ReactAudioPlayer from 'react-audio-player';
import TextInput from '../TextInput';
import Button from '../Button';
import Block from '../Block';
import Column from '../Column';
import ReactPlayer from 'react-player';

export default function MidiaDisplay(props){
  const item = props.item;
  const type = item.type;
  const route = item.route;
  const name = item.name;

  return(
    <Column
      style={{
        justifyContent: "space-between",
        height:"100%",
        padding:15
    }}
    >
      <TextSmall
        style={{fontSize:18}}
      >
        {name}
      </TextSmall>


      {type==="audio"&&
        <Line
          style={{
          }}
        >
          <ReactAudioPlayer
            src={"file://"+route}
            controls
            style={{
              width:250,
              borderColor:"rgba(180, 180, 180, 0.63)",
              borderStyle:"solid",
              borderRadius:30
            }}

          />
        </Line>
      }
      {type==="video"&&
        <Line>
        <ReactPlayer
          url={"file://"+route}
          width={250}
          height={125}
          controls
        />
        </Line>
      }
      {type==="image"&&
        <Image
          src={"file://"+route}
          width={250}
          height={200}
        />
      }

      <Line>
        <Button
          value={"CONFIRMA"}
          onClick={()=>{
            props.setMidia(item);
          }}
          style={{
            width:125
          }}
        />
        <Button
          value={"VOLTAR"}
          onClick={()=>{
            props.setMidia(null);
          }}
          style={{
            width:125,
            backgroundColor:"rgb(90,55,55)"
          }}
        />
      </Line>
    </Column>

  );
}
