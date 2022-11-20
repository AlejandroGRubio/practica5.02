"use strict";

import * as bibliApi from "./biblioteca/bibliotecaApi.js";




window.onload = () =>{


    const url1 = "https://psychonauts-api.herokuapp.com/api/characters";
    const url2 = "https://psychonauts-api.herokuapp.com/api/powers";

    var doc = window.document;

    var divSelec = doc.createElement(`div`);

    divSelec.setAttribute(`id`, `divSelec`);

    var divInfo = doc.createElement(`div`);

    divInfo.setAttribute(`id`, `divInfo`);


    //Los añadimos al html.
    doc.body.appendChild(divSelec);
    doc.body.appendChild(divInfo);

    var ulSelec = doc.createElement(`ul`);

    ulSelec.setAttribute(`id`, `ulSelec`);

    divSelec.appendChild(ulSelec);

    bibliApi.crearApartadoLi(`Personajes`, `personajes`, `noClicked`,`ulSelec`);

    bibliApi.crearApartadoLi(`Poderes PSI`, `poderes`, `noClicked`, `ulSelec`);
    
    //Vemos cuando pulsan Personajes o Poderes PSI e interaccionamos según su opción.
    doc.getElementById(`ulSelec`).addEventListener(`click`, (e) => {

        if (doc.getElementsByClassName(`clicked`) != undefined) {
            
            var selec = doc.getElementsByClassName(`clicked`);
            
            
            for (let i = 0; i < selec.length; i++) {
                selec[i].className = `noClicked`;
                
            }
        }

        if (e.target.tagName == `LI`) {
            e.target.className = `clicked`;

            if (e.target.id == `personajes`) {
                fetch(url1)
                    .then((respuesta) => {
                        return respuesta.json();
                    })
                    .then((datos) => {
                        bibliApi.generarInfoPersonajes(datos, `divInfo`);
      
                    });
            }
            else if (e.target.id == `poderes`) {
                fetch(url2)
                    .then((respuesta) => {
                        return respuesta.json();
                    })
                    .then((datos) => {
                        console.log(datos);
                        bibliApi.generarInfoPoderes(datos, `divInfo`);
      
                    });

            }





       }


    });
    

}; //Fin del código onload.