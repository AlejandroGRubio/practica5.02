"use strict";
import * as biblioPelis from "./biblioteca/bibliotecaPelis.js";


//Es normal que tarde a veces, en clase le costaba bastante, pero funcionar funciona.
window.onload = () =>{
    

    //Creamos los elementos para el html.
    const url = "http://swapi.dev/api/films";

    var doc = window.document;

    var divPelis = doc.createElement(`div`);


    divPelis.setAttribute(`id`, `divPelis`);

    var divInfo = doc.createElement(`div`);

    divInfo.setAttribute(`id`, `divInfo`);

    //Los añadimos al html.
    doc.body.appendChild(divPelis);
    doc.body.appendChild(divInfo);

    


    //Generamos la lista de películas.
    fetch(url)
    .then((respuesta) => {
        return respuesta.json();
    })
    .then((datos) => {
        console.log(datos.results);
        biblioPelis.generarListasPelis(datos.results, `divPelis`);
      
    });

    doc.getElementById(`divPelis`).addEventListener(`click`, (e) => {

       console.log(e.target.tagName);
       console.log(e.target.innerText);

        if (doc.getElementsByClassName(`clicked`) != undefined) {
            
            var selec = doc.getElementsByClassName(`clicked`);
            
            
            for (let i = 0; i < selec.length; i++) {
                selec[i].className = `noClicked`;
                
            }
        }

       if (e.target.tagName == `LI`) {
            e.target.className = `clicked`;

        fetch(url)
            .then((respuesta) => {
            return respuesta.json();
        })
            .then((datos) => {
            console.log(datos.results);
            biblioPelis.generarInfoPelis(e.target.innerText,datos.results, `divInfo`);
      
        });
       }
       


    });

    





}//Fin del código onload.

