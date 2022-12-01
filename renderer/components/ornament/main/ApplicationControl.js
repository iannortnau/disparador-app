import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../../../context/GlobalContext';
import Load from './Load';
import ApplicationPanel from './ApplicationPanel';
import ShoterControler from '../shoter/ShoterControler';
import CollectorMain from '../collector/CollectorMain';
import ScriptCreate from '../script/ScriptCreate';
import ScriptDelete from '../script/ScriptDelete';
import Uploader from '../uploader/Uploader';

export default function ApplicationControl(){
  const {
    aplication
  } = useContext(GlobalContext);

  return (
    <>
      {aplication === "ApplicationPanel"&&
        <ApplicationPanel/>
      }
      {aplication === "ShoterControler"&&
        <ShoterControler/>
      }
      {aplication === "CollectorMain"&&
        <CollectorMain/>
      }
      {aplication === "ScriptCreate"&&
        <ScriptCreate/>
      }
      {aplication === "ScriptDelete"&&
        <ScriptDelete/>
      }
      {aplication === "Uploader"&&
        <Uploader/>
      }
    </>
  );
}
