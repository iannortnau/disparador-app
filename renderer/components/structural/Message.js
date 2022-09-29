import styles from "../../styles/components/Message.module.css"
import Line from "./Line";
import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../context/GlobalContext";


export default function Message(props){
    const {
        message,
        setMessage
    } = useContext(GlobalContext);

    useEffect(() => {
        if (message.text.length>0){
            setTimeout(function (){
                setMessage({
                    text:"",
                    bgColor:"",
                    txColor:""
                })
            },5000);
        }
    }, [message]);

    return (
        <Line
            style={{
                zIndex: 1,
                top:0,
                position:"absolute",
                backgroundColor:props.bgColor,
                color:props.txColor
            }}
        >
            <h1
                className={styles.title}
                style={props.style}
            >
                {props.children}
            </h1>
        </Line>
    )
}
