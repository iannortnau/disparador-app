import styles from "../../styles/components/MidiaLineShower.module.css";
import TextSmall from './TextSmall';
import { useContext, useEffect, useState } from 'react';
import Line from './Line';
import ReactAudioPlayer from 'react-audio-player';
import ReactPlayer from 'react-player';
import Image from 'next/image';
import imgImage from '../../public/icons8-fotografia-30.png';
import imgAudio from '../../public/icons8-volume-alto-50.png';
import imgVideo from '../../public/icons8-video-clip-48.png';
import imgX from '../../public/icons8-xbox-x-48.png';

export default function MidiaLineShower(props){
  const item = props.item;
  const type = item.type;
  const route = item.route;
  const name = item.name;

  return(
    <>
      <div
        className={styles.body}
      >

        {type==="audio"&&
          <Line
            style={{
              width:"98%",
              padding:5,
            }}
          >
            <Image
              src={imgAudio}
              width={40}
              height={28}
            />
            <TextSmall
              style={{opacity:0.5}}
            >
              {name}
            </TextSmall>
            <Image
              src={imgX}
              width={40}
              height={28}
              onClick={()=>{
                props.setMidia(null);
              }}
            />
          </Line>
        }
        {type==="video"&&
          <Line
            style={{
              width:"98%",
              padding:5,

            }}
          >
            <Image
              src={imgVideo}
              width={40}
              height={28}
            />
            <TextSmall
              style={{opacity:0.5}}
            >
              {name}
            </TextSmall>
            <Image
              src={imgX}
              width={40}
              height={28}
              onClick={()=>{
                props.setMidia(null);
              }}
            />
          </Line>
        }
        {type==="image"&&
          <Line
            style={{
              width:"98%",
              paddingLeft:5

            }}
          >
            <Image
              src={imgImage}
              width={40}
              height={28}
            />
            <TextSmall
              style={{opacity:0.5}}
            >
              {name}
            </TextSmall>
            <Image
              src={imgX}
              width={40}
              height={28}
              onClick={()=>{
                props.setMidia(null);
              }}
            />
          </Line>
        }
      </div>
    </>
  );
}
