"use strict";

var doc = window.document;

//Con un objeto con las pelis, creamos una lista y la añadimos al lugar donde esté esa id.
export function generarListasPelis(arrObjPelis, idUbi) {

    var listaPelis = doc.createElement(`ul`);

    arrObjPelis.map((pelis) => {

        var apartado = doc.createElement(`li`);

        apartado.innerHTML = `${pelis.episode_id} - ${pelis.title}`;

        apartado.setAttribute(`class`, `noClicked`);


        listaPelis.appendChild(apartado);



    });

    doc.getElementById(idUbi).appendChild(listaPelis);


}

//Creamos el apartado con la info de la pelicula seleccionada y le añadimos los datos de la misma, para luego añadirla donde indica el id.
export function generarInfoPelis(nombrePeli, objPelis, idUbi, numPer) {
    
    if (doc.getElementsByClassName(`mostrarInfo`) != undefined) {
            
        var selec = doc.getElementsByClassName(`mostrarInfo`);
        
        
        for (let i = 0; i < selec.length; i++) {
            selec[i].remove();
            
        }
    }

    var cuerpo = doc.createElement(`div`);

    var codId = nombrePeli.charAt(0);

    var urlPersonajes;

    cuerpo.setAttribute(`class`, `mostrarInfo`);

    objPelis.map((infoPelis) => {

        if (infoPelis.episode_id == codId) {

            var titulo = doc.createElement(`h1`);

            titulo.innerHTML = infoPelis.title;

            var sinopsis = doc.createElement(`p`);

            sinopsis.innerHTML = infoPelis.opening_crawl;

            var director = doc.createElement(`p`);

            director.innerHTML = `Director: ${infoPelis.director}`;

            var productor = doc.createElement(`p`);

            productor.innerHTML = `Productor: ${infoPelis.producer}`;

            var numerosFechaMal = infoPelis.release_date;

            var numerosFechaBien = `${numerosFechaMal.charAt(8)}${numerosFechaMal.charAt(9)}-${numerosFechaMal.charAt(5)}${numerosFechaMal.charAt(6)}-${numerosFechaMal.charAt(0)}${numerosFechaMal.charAt(1)}${numerosFechaMal.charAt(2)}${numerosFechaMal.charAt(3)}`;

            var fecha = doc.createElement(`p`);

            fecha.innerHTML = `Fecha de lanzamiento: ${numerosFechaBien}`;

            var datosPersonajes = doc.createElement(`div`);
            datosPersonajes.setAttribute(`id`, `personajes`);

            urlPersonajes = infoPelis.characters;

            cuerpo.appendChild(titulo);
            cuerpo.appendChild(sinopsis);
            cuerpo.appendChild(director);
            cuerpo.appendChild(productor);
            cuerpo.appendChild(fecha);
            cuerpo.appendChild(datosPersonajes);

        }

        console.log(cuerpo);

        doc.getElementById(idUbi).appendChild(cuerpo);

        sacarDatosPersonajes(urlPersonajes, numPer, `personajes`);


    });

}

export function sacarDatosPersonajes(arrayUrl, numPersonajes, idUbi){


    for (let i = 0; i < numPersonajes; i++) {

        fetch(arrayUrl[i])
            .then((respuesta) => {
                return respuesta.json();
        })
            .then((datos) => {
                console.log(datos);
               // imprimirNombrePersonajes(datos, idUbi);
      
        });



        
    }


    



    
}

function imprimirNombrePersonajes(obj, idUbi) {
    
    var parrafoNombre = doc.createElement(`p`);

    parrafoNombre.className = `infoPersonaje`;
    
    parrafoNombre.innerHTML = obj.name;

    doc.getElementById(idUbi).appendChild(parrafoNombre);




}