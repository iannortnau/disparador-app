import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../../../context/GlobalContext';
import Shoter from './Shoter';
import ShoterLoad from './ShoterLoad';

export default function ShoterControler(){
  const {
    shoting
  } = useContext(GlobalContext);

  return (
    <>
      {!shoting&&
        <Shoter/>
      }
      {shoting&&
        <ShoterLoad/>
      }
    </>
  );
}
