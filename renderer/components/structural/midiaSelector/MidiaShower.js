import styles from "../../../styles/components/MidiaShower.module.css";
import TextSmall from '../TextSmall';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../../context/GlobalContext';
import MidiaItemVideo from './MidiaItemVideo';
import MidiaItemAudio from './MidiaItemAudio';
import MidiaItemImage from './MidiaItemImage';
import MidiaDisplay from './MidiaDisplay';

export default function MidiaShower(props){
  const [midia, setMidia] = useState(null);
  const midiaData = props.data||[];

  useEffect(() => {
    setMidia(null);
  }, [midiaData]);


  return(
    <>
      <div
        className={styles.body}
      >
        {midiaData.length===0&&
          <TextSmall
            style={{opacity:0.5}}
          >
            Nada para ser mostrado aqui
          </TextSmall>
        }
        {midiaData.length>0&&!midia&&
          <div
            className={styles.block}
          >
            {midiaData.map(function(item) {
              if(item.type === "video"){
                return (
                  <MidiaItemVideo
                    key={item.id}
                    item={item}
                    setMidia={(item)=>{
                      setMidia(item)
                    }}
                  />
                );
              }
              if(item.type === "audio"){
                return (
                  <MidiaItemAudio
                    key={item.id}
                    item={item}
                    setMidia={(item)=>{
                      setMidia(item)
                    }}
                  />
                );
              }
              if(item.type === "image"){
                return (
                  <MidiaItemImage
                    key={item.id}
                    item={item}
                    setMidia={(item)=>{
                      setMidia(item)
                    }}
                  />
                );
              }
            })}
          </div>
        }

        {midia&&
          <MidiaDisplay
            item={midia}
            setMidia={(item)=>{
              props.setMidia(item);
              setMidia(item)
            }}
          />
        }
      </div>
    </>
  );
}
