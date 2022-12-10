import Line from '../Line';
import Image from 'next/image';
import TextSmall from '../TextSmall';
import ReactAudioPlayer from 'react-audio-player';
import Button from '../Button';
import Column from '../Column';
import ReactPlayer from 'react-player';

export default function ChatDisplay(props){
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
            props.setChat(item);
          }}
          style={{
            width:125
          }}
        />
        <Button
          value={"VOLTAR"}
          onClick={()=>{
            props.setChat(null);
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
