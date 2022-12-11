import img from "../../../public/icons8-contatos-48.png";
import Line from '../Line';
import Image from 'next/image';
import TextSmall from '../TextSmall';

export default function ChatItem(props){
  const item = props.item;

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
      <Image
        src={img}
        width={35}
        height={20}
      />
      <TextSmall
        style={{opacity:0.5}}
      >
        {item.name}
      </TextSmall>
    </Line>
  );
}
