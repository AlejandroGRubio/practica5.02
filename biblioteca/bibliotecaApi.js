"use strict";

var doc = window.document;



//Genera las etiquetas li.
export function crearApartadoLi(texto, nameId, nomClase, idUbi) {
    

    var li = doc.createElement(`li`);

    li.innerHTML = texto;

    li.setAttribute(`id`, nameId);

    li.setAttribute(`class`, nomClase);


    doc.getElementById(idUbi).appendChild(li);

}

//Inserta los datos de los personajes de la api.
export function generarInfoPersonajes(obj, idUbi){
    if (doc.getElementsByClassName(`mostrarInfo`) != undefined) {
            
        var selec = doc.getElementsByClassName(`mostrarInfo`);
        
        
        for (let i = 0; i < selec.length; i++) {
            selec[i].remove();
            
        }
    }

    var cuerpo = doc.createElement(`div`);

    cuerpo.setAttribute(`class`, `mostrarInfo`);


    var num = 0;

    while (num < obj.length) {
        
        var image = doc.createElement(`img`);
        image.setAttribute(`src`, obj[num].img);

        var name = doc.createElement(`p`);
        name.innerHTML = `Nombre: ${obj[num].name}`;

        var genero = doc.createElement(`p`);
        genero.innerHTML = `Género: ${obj[num].gender}`;

        var poderes = doc.createElement(`p`);
        poderes.innerHTML = `Poderes`;
        poderes.setAttribute(`class`, `poderes`);

        var datosPoderes = doc.createElement(`div`);

        datosPoderes.setAttribute(`class`, `poderesOculto`);

        for (let i = 0; i < obj[num].psiPowers.length; i++) {
            var foto = doc.createElement(`img`);
            foto.setAttribute(`src`, obj[num].psiPowers[i].img);

            var texto = doc.createElement(`p`);
            texto.innerHTML = obj[num].psiPowers[i].description;

            datosPoderes.appendChild(foto);
            datosPoderes.appendChild(texto);

            
        }

        var guardaDatos = doc.createElement(`p`);
        guardaDatos.appendChild(image);
        guardaDatos.appendChild(name);
        guardaDatos.appendChild(genero);
        guardaDatos.appendChild(poderes);
        guardaDatos.appendChild(datosPoderes);

        cuerpo.appendChild(guardaDatos);

        num++;

    }

    doc.getElementById(idUbi).appendChild(cuerpo);

    
    for (let j = 0; j < doc.getElementsByClassName(`poderes`).length; j++) {
        var pClass = doc.getElementsByClassName(`poderes`);

        
       pClass[j].addEventListener(`click`, (e) => {

            if (doc.getElementsByClassName(`poderesMostrar`) != undefined) {
                
                var selec = doc.getElementsByClassName(`poderesMostrar`);
                
                
                for (let i = 0; i < selec.length; i++) {
    
                    var o = selec[i];
    
                    o.className = `poderesOculto`;
                    
                    
                }
            }
    
    
            if (doc.getElementsByClassName(`poderesOculto`)[j].className == `poderesOculto`) {
                doc.getElementsByClassName(`poderesOculto`)[j].className = `poderesMostrar`;
            }
    
    
    
    
        });





    }
    
    
    
    

        

}

//Inserta los datos de los poderes de la api.
export function generarInfoPoderes(obj, idUbi) {
    
    if (doc.getElementsByClassName(`mostrarInfo`) != undefined) {
            
        var selec = doc.getElementsByClassName(`mostrarInfo`);
        
        
        for (let i = 0; i < selec.length; i++) {
            selec[i].remove();
            
        }
    }


    var cuerpo = doc.createElement(`div`);

    cuerpo.setAttribute(`class`, `mostrarInfo`);


    var num = 0;



    while (num < obj.length) {
        
        var image = doc.createElement(`img`);
        image.setAttribute(`src`, obj[num].img);

        var name = doc.createElement(`p`);
        name.innerHTML = `Nombre: ${obj[num].name}`;

        var desc = doc.createElement(`p`);
        desc.innerHTML = `Descripción: ${obj[num].description}`;

        var guardaDatos = doc.createElement(`p`);
        guardaDatos.appendChild(image);
        guardaDatos.appendChild(name);
        guardaDatos.appendChild(desc);

        cuerpo.appendChild(guardaDatos);


        num++;
    }

    doc.getElementById(idUbi).appendChild(cuerpo);

}