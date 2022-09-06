import React from "react";
import styles from './landing.module.css'
import imagen from "../images/cooking.png"

export default function Landing() {
    return (
        <div className={styles.container}>
            <header>
                <div className={styles.page}>
                    <div className={styles.texts}>
                        <h1>HenryFood</h1>

                        <a href='/Home'>Comenzar</a>
                    </div>
                    <img src={imagen}></img>
                </div>
            </header>
        </div>




    )
}
/*[ ] Alguna imagen de fondo representativa al proyecto
[ ] Botón para ingresar al home (Ruta principal) */