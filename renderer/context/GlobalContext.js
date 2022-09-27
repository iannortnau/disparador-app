import {createContext, useState} from "react";
import axios from "axios";
import moment from "moment";

export const GlobalContext = createContext({});

export function GlobalProvider(props){
    const [apiUrl,setApiUrl] = useState("http://82.180.160.211:3000/validation/");
    const [load, setLoad] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const [key, setKey] = useState("");
    const [numbers, setNumbers] = useState(JSON.parse(window.localStorage.getItem('numbersList'))||[]);

    async function validateKey(key){
        try{
            const response = await axios.get(apiUrl+key);

            console.log("conectado | "+moment().format("DD/MM/YYYY(HH:mm:ss)"));
            return {status: true, data: response.data}
        }catch (e){
            console.log("erro[1] | "+moment().format("DD/MM/YYYY(HH:mm:ss)"));
            return {status: false, data: e.response.data.message};
        }

    }

    function attLocalNumbers(){
        setNumbers(JSON.parse(window.localStorage.getItem('numbersList')));
    }

    function addLocalNumbers(number){
        console.log(number);
        const auxNumber = numbers;
        auxNumber.push(number);
        window.localStorage.setItem('numbersList', JSON.stringify(auxNumber));
        attLocalNumbers();
    }

    function deleteLocalNumbers(number){
        const auxNumber = [];
        for (let i = 0; i < numbers.length; i++) {
            if(number !== numbers[i]){
                auxNumber.push(numbers[i]);
            }
        }
        window.localStorage.setItem('numbersList', JSON.stringify(auxNumber));
        attLocalNumbers();
    }

    return (
        <GlobalContext.Provider
            value={{
                apiUrl,
                setApiUrl,
                load,
                setLoad,
                authenticated,
                setAuthenticated,
                key,
                setKey,
                validateKey,
                addLocalNumbers,
                deleteLocalNumbers,
                numbers
            }}>
            {props.children}
        </GlobalContext.Provider>
    );
}
