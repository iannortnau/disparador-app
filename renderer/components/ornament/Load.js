import Page from "../structural/Page";
import Block from "../structural/Block";
import img from "../../public/Post de tecnologia cortado.png"
import Image from "next/image";
import Loader from "../structural/Loader";



export default function Load(){

    return (
        <Page>
            <Block>
                <Image
                  src={img}
                />
                <Loader/>
            </Block>
        </Page>
    );
}
