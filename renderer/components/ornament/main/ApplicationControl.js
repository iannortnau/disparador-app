import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../../../context/GlobalContext';
import Load from './Load';
import ApplicationPanel from './ApplicationPanel';
import ShoterControler from '../shoter/ShoterControler';
import CollectorMain from '../Collector/CollectorMain';

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
    </>
  );
}
