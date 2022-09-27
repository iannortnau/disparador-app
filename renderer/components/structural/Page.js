import styles from "../../styles/components/Page.module.css";
import Particles from "react-tsparticles";
import {loadFull} from "tsparticles";
import Message from "./Message";
import {GlobalContext} from "../../contexts/globalContext";
import {useContext} from "react";



export default function Page(props){
    const {
        message
    } = useContext(GlobalContext);
    const particlesInit = async (main) => {
        console.log(main);

        // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(main);
    };

    const particlesLoaded = (container) => {
        console.log(container);
    };

    return (
            <div className={styles.main} style={props.style}>
                <Message
                    bgColor={message.bgColor}
                    txColor={message.txColor}
                >
                    {message.text}
                </Message>
                <Particles
                    id="tsparticles"
                    init={particlesInit}
                    loaded={particlesLoaded}
                    options={{
                        fpsLimit: 60,
                        particles: {
                            color: {
                                value: "#39bfc5",
                            },
                            links: {
                                color: "#39bfc5",
                                distance: 150,
                                enable: true,
                                opacity: 0.5,
                                width: 1,
                            },
                            collisions: {
                                enable: true,
                            },
                            move: {
                                direction: "none",
                                enable: true,
                                outModes: {
                                    default: "bounce",
                                },
                                random: false,
                                speed: 2,
                                straight: false,
                            },
                            number: {
                                density: {
                                    enable: true,
                                    area: 800,
                                },
                                value: 80,
                            },
                            opacity: {
                                value: 0.5,
                            },
                            shape: {
                                type: "circle",
                            },
                            size: {
                                value: { min: 1, max: 5 },
                            },
                        },
                        detectRetina: true,
                    }}
                />
                {props.children}
            </div>
    );
}
