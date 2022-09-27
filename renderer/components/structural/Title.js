import styles from "../../styles/components/Title.module.css"
import Line from "./Line";
import {useState} from "react";


export default function Title(props){
    return (
        <Line>
            <h1
                className={styles.title}
                style={props.style}
            >
                {props.children}
            </h1>
        </Line>
    )
}
