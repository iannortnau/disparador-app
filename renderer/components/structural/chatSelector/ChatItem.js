import imgP from "../../../public/icons8-usuário-60.png";
import imgG from "../../../public/icons8-grupos-de-usuários-64.png";
import Line from '../Line';
import Image from 'next/image';
import TextSmall from '../TextSmall';

export default function ChatItem(props){
  const item = props.item;
  const isGroup = item.isGroup;

  return(
    <Line
      style={{
        width:"98%",
        paddingLeft:10,
        paddingRight:20,
        borderBottomWidth: 1,
        borderBottomStyle: "solid",
        borderColor: "#477f81",
        userSelect: "none"
      }}
      onClick={()=>{
        props.setChat(item);
      }}
    >
      {isGroup&&
        <Image
          src={imgG}
          width={35}
          height={20}
        />
      }
      {!isGroup&&
        <Image
          src={imgP}
          width={35}
          height={20}
        />
      }

      <TextSmall
        style={{opacity:0.5}}
      >
        {item.name}
      </TextSmall>
    </Line>
  );
}
