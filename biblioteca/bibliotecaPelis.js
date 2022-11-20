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


//Creamos el apartado con la info de la película seleccionada y le añadimos los datos de la misma, para luego añadirla donde indica el id. Además añadirán el addEventListener (ya que no se puede poner en el script principal
// por el problema de la carga, que sale error en añadir el addEventListener).
export function generarInfoPelis(nombrePeli, objPelis, idUbi) {
    
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


        doc.getElementById(idUbi).appendChild(cuerpo);

        


    });
    sacarDatosPersonajes(urlPersonajes, `personajes`);

    doc.getElementById(`personajes`).addEventListener(`click`, (e) => {


        if (doc.getElementsByClassName(`infoPersonajePulsado`) != undefined) {
            
            var selec = doc.getElementsByClassName(`infoPersonajePulsado`);
            
            
            for (let i = 0; i < selec.length; i++) {

                var o = selec[i];

                o.className = `infoPersonaje`;
                o.firstElementChild.className = `ocultoDatos`;
                
            }
        }


        if (e.target.tagName == `P`) {
            e.target.className = `infoPersonajePulsado`;
            e.target.firstElementChild.className = `datos`;




        }





    });

}
//Saca las 10 URL del array y pasa los datos.
export function sacarDatosPersonajes(arrayUrl, idUbi){

    var num = 0;

    while(num < 10){



        fetch(arrayUrl[num])
            .then((respuesta) => {
                return respuesta.json();
        })
            .then((datos) => {
                imprimirNombrePersonajes(datos, idUbi);
      
        })
        .catch((error) => {
            // Se recoge el error y se gestiona.
            console.log(`Ha habido algún error: ${error.message}`);
          });


          num ++;
    };





    
}

//Añade los datos al nombre y los pone ocultos.
function imprimirNombrePersonajes(obj, idUbi) {
    
    var parrafoNombre = doc.createElement(`p`);
    var divDatosConcre = doc.createElement(`div`);

    parrafoNombre.className = `infoPersonaje`;
    
    parrafoNombre.innerHTML = obj.name;


    divDatosConcre.className = `ocultoDatos`;
    var genero = doc.createElement(`p`);
    genero.innerHTML = `Género: ${obj.gender}`;

    var altura = doc.createElement(`p`);
    altura.innerHTML = `Altura: ${obj.height}`;

    var peso = doc.createElement(`p`);
    peso.innerHTML = `Peso: ${obj.mass}`;

    var colorPelo = doc.createElement(`p`);
    colorPelo.innerHTML = `Color de pelo: ${obj.hair_color}`;

    var colorOjos = doc.createElement(`p`);
    colorOjos.innerHTML = `Color de ojos: ${obj.eye_color}`;

    divDatosConcre.appendChild(genero);
    divDatosConcre.appendChild(altura);
    divDatosConcre.appendChild(peso);
    divDatosConcre.appendChild(colorPelo);
    divDatosConcre.appendChild(colorOjos);

    parrafoNombre.appendChild(divDatosConcre);


    doc.getElementById(idUbi).appendChild(parrafoNombre);



}


