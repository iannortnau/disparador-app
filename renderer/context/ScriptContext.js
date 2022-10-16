import {createContext, useState} from "react";
const Store = require('electron-store');
const store = new Store();

export const ScriptContext = createContext({});

export function ScriptProvider(props){




  return (
    <ScriptContext.Provider
      value={{

      }}>
      {props.children}
    </ScriptContext.Provider>
  );
}

