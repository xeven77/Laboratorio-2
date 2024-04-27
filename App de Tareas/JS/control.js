const date = document.getElementById("fecha"); //Trae el elemento con id fecha
const lista = document.getElementById('list'); // Trae el elemento de la lista
const input = document.getElementById('nuevaTarea'); // Extrae el input
const btn_add = document.getElementById('add'); // Extrae el elemento del icono +
const realizado = "fa-circle-check"; //Extension para el circulo con el check
const noRealizado = "fa-circle"; //Extension para el circulo sin el chulito
const lineaText = 'line-through';// clase para poner una linea centrada en todo el texto
let id;
let arrayList; //Se crea un array
//let modificar = document.createElement("input");

const DATE = new Date();//Funcion que toma la fecha del navegador
date.innerText = DATE.toLocaleDateString("es-CO",{weekday:'long',month:'short',day:'numeric'});
/** tolocaledatestring es un metodo para la fecha. 
 * Devuelve una representacion sensible al idioma de la parte de fecha de esta fecha en la zona horaria local
*/




//Nueva Tarea funcion
function newWork(tarea, id, finalizado,eliminar) {
    if(eliminar){return}

    const FINALIZADO = finalizado ?realizado :noRealizado;  //? true : false operadores ternarios
    const lineaTextual = finalizado ?lineaText :''; 
    const elemento =`<li> 
                        <p class="TareaPendiente ${lineaTextual}">${tarea}</p>
                        <i class="fa-regular ${FINALIZADO}" data="finalizar" id="${id}"></i>
                        <i class="modificar fa-solid fa-pen-to-square" data="modificar" id="${id}"></i>
                        <i class="fa-solid fa-trash-can" data="eliminar" id="${id}"></i>
                    </li>
                    `; 
                    //${} ---> Interpolación de cadenas con expresiones incrustadas y construcciones especiales denominadas plantillas etiquetadas.
                    /**Las plantillas literales (`) son cadenas literales que habilitan el uso de expresiones incrustadas. 
                     * Con ellas, es posible utilizar cadenas de caracteres de más de una línea, y funcionalidades de interpolación 
                     * de cadenas de caracteres. */
    lista.insertAdjacentHTML("beforeend",elemento); //Element.insertAdjacentHTML() analiza la cadena de texto introducida como cadena HTML
}

//Funcion tareaFinalizada
function tareaFinalizada(component){
    component.classList.toggle(realizado);
    component.classList.toggle(noRealizado);
    component.parentNode.querySelector('.TareaPendiente').classList.toggle(lineaText)
    arrayList[component.id].finalizado = arrayList[component.id].finalizado ?false :true
    /**
     * arrayList[component.id]); --> lee completa la lista de los elementos de acuerdo al id
     * arrayList[component.id].finalizado); --> lee la lista de los elementos de acuerdo al id y coge la llave finalizado
     * y le pone valor de true si ha sido marcada como finalizada ya q esta se inicializa con false
     *  si ha sido marcada y se desmarca retorna false tmb.
     */
    //console.log(arrayList);
   // console.log(arrayList[component.id]);
    //console.log(arrayList[component.id].finalizado);
    /*
    *Toggle nos permite darle la instruccion si quitar o no el realizado(circulo con chulo) o noRealizado (circulo solo)
    *Usar classList es una forma práctica de acceder a la lista de clases de un elemento como una cadena de texto 
    *delimitada por espacios a través de element.className.
    */
    
    /**
     * Propedad parentNode para seleccionar los elementos padre, en esté caso el elemento padre de p es li.
     * El querySelector nos busca el elemento con la clase llamada TareaPendiente 
     * classlist accede a las clases y el toggle modifica ese texto para que cuando finalizado sea true 
     * aparezca la clase line-through y cuando sea falso no aparezca.
     */

    //Propiedad parentnode para ver los elementos padre
}


//Funcion tareaModificada

function tareaModificada(component){
    const textElemento = component.parentNode.querySelector('.TareaPendiente');
    //console.log(textElemento)
    let text = textElemento.textContent;
    //console.log(text)

    const modificar = document.createElement("input")
    modificar.setAttribute("class","input2")
    
    modificar.value = text;
    //console.log(modificar.value)

    textElemento.parentNode.replaceChild(modificar, textElemento);


    modificar.addEventListener("keyup", function(event) {
        if (event.key == 'Enter') {
            convertirAParrafo();
        }

    
    });
    
    function convertirAParrafo() {
    
        text = modificar.value;
        let  newP = document.createElement("p");
        newP.setAttribute("class","TareaPendiente");  
        newP.textContent = text;
        modificar.parentNode.replaceChild(newP, modificar);
        
        arrayList[component.id].tarea = newP.textContent;
        

    }
    arrayList[component.id].modificar = true    
}



//Funcion tareaEliminada
function tareaEliminada(component){
    component.parentNode.parentNode.removeChild(component.parentNode);
    /**
     * El padre del componente es li y el padre de li es ul, ya situados en ul le decimos que elimine
     * el padre de componente q es li.
     */
    
    
    
    arrayList[component.id].eliminar = true
    
     //console.log(arrayList)
    //Por defecto está en false hasta que se le de q se desea eliminar 
}


btn_add.addEventListener('click',()=>{
    const tarea = input.value;
    if(tarea){ //Si recibe algun valor en el input entra al if y realiza la funcion
        newWork(tarea,id,false,false,false);
        arrayList.push({ //push() es un metodo de Array que añade elementos.
            tarea:tarea,
            id:id,
            finalizado:false,
            eliminar:false,
            modificar:false
        })
        input.value=''; //Borrado de string para que la palabra agregada del input desaparezca.
        id++;
        localStorage.setItem('APP',JSON.stringify(arrayList));
    }
    /**
        * JSON.stringify-->Devuelve una cadena JSON correspondiente al valor especificado, 
        * incluyendo opcionalmente solo determinadas propiedades o reemplazando los valores de propiedad de una manera definida por el usuario.
        */
})

/**
 * Cada vez que hagamos un click en el + para agregar una nueva tarea, se llama la funcion de newWork 
 * para enviarnos el parametro de tarea, el de id; si es la primera tarea id sera 1. Después de eso el input se borrara.
 * 
 */

document.addEventListener('keyup',(event)=>{ //keyup es cuando el usuario deja de tocar la tecla
    if(event.key=='Enter'){
        const tarea = input.value;
        if(tarea){ //Si recibe algun valor.El input entra al if y realiza la funcion
            newWork(tarea,id,false,false,false);
            arrayList.push({ //push() es un metodo de Array que añade elementos.
            tarea:tarea,
            id:id,
            finalizado:false,
            eliminar:false,
            modificar:false
        })
            input.value=''; //Borrado del input
            id++;
            localStorage.setItem('APP',JSON.stringify(arrayList));
        }
        /**
        * JSON.stringify-->Devuelve una cadena JSON correspondiente al valor especificado, 
        * incluyendo opcionalmente solo determinadas propiedades o reemplazando los valores de propiedad de una manera definida por el usuario.
        */
    }
}) 

lista.addEventListener('click',(event)=>{
    const component = event.target; //La propiedad target de la interfaz es una referencia al objeto en el cual se lanzo el evento.
    /**Cuando le demos click a uno de los botones el component nos va a regresar el elemento del boton
     * Por ejemplo si hacemos click en el de eliminar el me devuelve 
     * <i class="fa-solid fa-trash-can" data="eliminar" id="${id}"></i>
     */
    //console.log(component);
    const componentData = component.attributes.data.value; 
    /*
     * target me da el bloque de codigo de todo el icono de check al darle click en el circulo
     * component.attributes -> En lista todos los identificadores del elemento sin el valor del identificador
     * component.attributes.data -> Nos retorna el identificador data 
     * component.attributes.data.value -> Nos retorna el valor de data
     * Lo utilizamos para que cuando el evento.target se ejecute sepa si es finalizar,modificar o eliminar.
     */
    if(componentData === 'finalizar'){
        tareaFinalizada(component);
    }
    else if(componentData === 'modificar'){
        tareaModificada(component);
    }
    else if(componentData === 'eliminar'){
        tareaEliminada(component);
    }
    localStorage.setItem('APP',JSON.stringify(arrayList));
})

//localStorage.setItem();

//JSON -->  Java Script Object Notation , archivo sencillo de texto para intercambiar datos
/**
 * Sirve para almacenar datos en formato texto 
 * STRINGIFY es convertir el lenguaje usado a formato JSON
 */

let datos = localStorage.getItem('APP')


if(datos){
    arrayList = JSON.parse(datos);
    id=arrayList.length;
    cargarLista(arrayList);
}else{
    arrayList= [];
    id=0;
}

function cargarLista(DATOS){
    DATOS.forEach(i => {
       newWork(i.tarea,i.id,i.finalizado,i.eliminar);
    });
    
}
//localStorage.getItem() --> 
