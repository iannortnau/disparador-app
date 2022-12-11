import img from "../../../public/icons8-fotografia-30.png";
import Line from '../Line';
import Image from 'next/image';
import TextSmall from '../TextSmall';

export default function MidiaItemImage(props){
  const item = props.item;


  return(
    <Line
      style={{
        width:"98%",
        paddingLeft:20,
        paddingRight:20,
        borderBottomWidth: 1,
        borderBottomStyle: "solid",
        borderColor: "#477f81",
        userSelect: "none"

      }}
      onClick={()=>{
        props.setMidia(item);
      }}
    >
      <Image
        src={img}
        width={28}
        height={28}
      />
      <TextSmall
        style={{opacity:0.5}}
      >
        {item.name}
      </TextSmall>
    </Line>
  );
}

