import Image from "next/image";
import TextSmall from '../../structural/TextSmall';
import { useState } from 'react';
import TextInput from '../../structural/TextInput';
import Button from '../../structural/Button';
import {fileTypeFromFile} from 'file-type';
import * as fs from 'fs';



export default function UploaderImageViewer(props){
  const midiaRoute = props.midiaRoute;
  const [midiaName, setMidiaName] = useState();

  async function save(){
    const fileType = await fileTypeFromFile(midiaRoute);
    var home = require("os").homedir();
    var logpath = home + '/Documents/somefolderwhichexists/' + title + '.txt';
    console.log(fileType);
    /*
    fs.copyFile(midiaRoute, 'destination.txt', (err) => {
      if (err) throw err;
      console.log('source.txt was copied to destination.txt');
    });*/
  }

  return (
    <>
      <TextSmall
        style={{fontSize:18}}
      >
        Visualização Prévia
      </TextSmall>

      <Image
        src={"file://"+midiaRoute}
        width={300}
        height={300}
      />

      <TextInput
        placeholder={"Nome da Midia"}
        onChange={function (aux) {
          setMidiaName(aux.target.value);
        }}
      />

      <Button
        value={"SALVAR"}
        onClick={save}
      />
    </>
  );

}
