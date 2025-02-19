let equipos = [];
let marcas = [];
let stock = [];


window.onload = function() {
    cargarDatosDesdeLocalStorage();
    imprimirEquipos(); // Para asegurar q los equipos se muestren
    imprimirInstructores(); // same con instructores
    imprimirPrestamos();
};


function guardarDatosEnLocalStorage() {
    localStorage.setItem("equipos", JSON.stringify(equipos));
    localStorage.setItem("marcas", JSON.stringify(marcas));
    localStorage.setItem("stock", JSON.stringify(stock));
    localStorage.setItem("nombresInstructores", JSON.stringify(nombresInstructores));
    localStorage.setItem("identificacionInstructores", JSON.stringify(identificacionInstructores));
    localStorage.setItem("equiposPrestados", JSON.stringify(equiposPrestados));
    localStorage.setItem("marcasPrestadas", JSON.stringify(marcasPrestadas));
    localStorage.setItem("cantidadPrestada", JSON.stringify(cantidadPrestada));
    localStorage.setItem("instructoresPrestan", JSON.stringify(instructoresPrestan));
}

function cargarDatosDesdeLocalStorage() {
    if (localStorage.getItem("equipos")) {
        equipos = JSON.parse(localStorage.getItem("equipos"));
        marcas = JSON.parse(localStorage.getItem("marcas"));
        stock = JSON.parse(localStorage.getItem("stock"));
        nombresInstructores = JSON.parse(localStorage.getItem("nombresInstructores"));
        identificacionInstructores = JSON.parse(localStorage.getItem("identificacionInstructores"));
        equiposPrestados = JSON.parse(localStorage.getItem("equiposPrestados"));
        marcasPrestadas = JSON.parse(localStorage.getItem("marcasPrestadas"));
        cantidadPrestada = JSON.parse(localStorage.getItem("cantidadPrestada"));
        instructoresPrestan = JSON.parse(localStorage.getItem("instructoresPrestan"));
    }
}


const addEquipoBoton = document.getElementById("addEquipoBoton");

addEquipoBoton.addEventListener("click", ()=>{

    const nombreEquipoInput = document.getElementById("nombreEquipoInput")
    let nombreEquipo = nombreEquipoInput.value

    const marcaEquipoInput = document.getElementById("marcaEquipoInput")
    let marcaEquipo = marcaEquipoInput.value

    const cantidadEquipoInput = document.getElementById("cantidadEquipoInput")
    let cantidadEquipo = parseInt(cantidadEquipoInput.value)


    if(nombreEquipoInput.value == "" || marcaEquipoInput.value == "" || cantidadEquipoInput.value == ""){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Datos no llenados o invalidos",
          });
    }else{
        if(cantidadEquipo <= 0 || isNaN(cantidadEquipo)){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Cantidad no valida",
              });


        }else{

  

    let captura = -1;
    // el ciclo recorre todo el arreglo para poder buscar el nuevo equipo
    for(let i = 0; i < equipos.length; i++){
        // si el equipo y la marca ya estan en los arreglos captura en que indice
        if (nombreEquipo == equipos[i] && marcaEquipo == marcas[i]){
            captura = i;
        };
    };

    // si la captura es diferente a -1 es porque encontro el equipo y la marca
    // entonces simplemente adicionar la cantidad en ese indice
    if (captura != -1){
        stock[captura] += cantidadEquipo;
    }else{
        // si no en es diferente a -1  es porque no encontro coincidencias
        // entonces agregamos todo a un nuevo indice de los arreglos
        equipos.push(nombreEquipo);
        marcas.push(marcaEquipo);
        stock.push(cantidadEquipo);
    };
        

        

    guardarDatosEnLocalStorage();
    imprimirEquipos();

    Swal.fire({
        icon: "success",
        title: "Hecho...",
        text: "Se ha registrado correctamente un equipo",
      });
    }
}


    nombreEquipoInput.value = "";
    marcaEquipoInput.value = "";
    cantidadEquipoInput.value = "";
})




function imprimirEquipos(){
    let listaEquipos = "";
    // se recomienda cambiar DOM.
    for(let i = 0; i < equipos.length; i++){
        listaEquipos += `<tr>
                            <td>`+equipos[i]+`</td>
                            <td>`+marcas[i]+`</td>
                            <td>`+stock[i]+`</td>
                        </tr>`;
    };
    const tbodyEquipos = document.getElementById('equipos');
    tbodyEquipos.innerHTML = listaEquipos;
}

let nombresInstructores = [];
let identificacionInstructores = [];





function addInstructor(){



    const inputID = document.getElementById('inputIdInstructor');
    const inputNombre = document.getElementById('inputNombre');

    if(inputID.value == "" || inputNombre.value == ""){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Datos no llenados o invalidos",
          });
    }else{

    let identificacion = inputID.value;


    let verificar = identificacionInstructores.indexOf(identificacion);
    
    if (verificar == -1){
        
        let nombre = inputNombre.value;


        identificacionInstructores.push(identificacion);
        nombresInstructores.push(nombre);

        Swal.fire({
            icon: "success",
            title: "Hecho...",
            text: "Se ha registrado correctamente un instructor",
          });
          
        }else{
            Swal.fire({
                icon: "warning",
                title: "Error...",
                text: "El instructor ya esta registrado",
              });
    }


    imprimirInstructores()
    

}
    inputID.value = '';
    inputNombre.value = '';

};

function imprimirInstructores(){
    let listaInstructores = "";
    for(let i = 0; i < nombresInstructores.length; i++){
        listaInstructores += `<tr>
                                <td>`+identificacionInstructores[i]+`</td>
                                <td>`+nombresInstructores[i]+`</td>
                              </tr>`;
    };
    const tbodyInstructores = document.getElementById('instructores');
    tbodyInstructores.innerHTML = listaInstructores;
};

let equiposPrestados = [];
let marcasPrestadas = [];
let cantidadPrestada = [];
let instructoresPrestan = [];





const addPrestamoBoton = document.getElementById("addPrestamoBoton")


addPrestamoBoton.addEventListener("click", ()=>{

    const equipoPrestarInput = document.getElementById("equipoPrestarInput")
    let equipoPrestar = equipoPrestarInput.value

    const marcaPrestarInput = document.getElementById("marcaPrestarInput")
    let marcaPrestar = marcaPrestarInput.value

    const cantidadPrestarInput = document.getElementById("inputCantidadPrestar")
    let cantidadPrestar = parseInt(cantidadPrestarInput.value)

    const idPrestaInput = document.getElementById("inputidPresta")
    let idPresta = idPrestaInput.value

    if(equipoPrestarInput.value == "" || marcaPrestarInput == "" || cantidadPrestarInput == "" || idPrestaInput == ""){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Datos no llenados o invalidos",
          });
    }else{
        if(cantidadPrestar <= 0 || isNaN(cantidadPrestar)){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Cantidad no valida",
              });


        }else{
        

    

    
    let captura = -1;
    let captura3 = 1;
    // el ciclo recorre todo el arreglo para poder buscar el nuevo equipo
    for(let i = 0; i < equipos.length; i++){
        // si el equipo y la marca ya estan en los arreglos captura en que indice
        if (equipoPrestar == equipos[i] && marcaPrestar == marcas[i]){
            captura = i;
        };

        if (idPresta == identificacionInstructores[i]){
            captura3 = 0;
        }

    };

    if (captura == -1){
        Swal.fire({
            icon: "question",
            title: "Error...",
            text: "El equipo no existe",
          });
    }else{



        if(captura3 == 1){
        Swal.fire({
            icon: "question",
            title: "Error...",
            text: "El instructor no esta registrado",
          });
    }else{

            if (cantidadPrestar <= stock[captura]){

                let captura2 = -1;
                
                
                for (let i = 0; i < equiposPrestados.length; i++ ){

                    

                    
                    
                    if(idPresta == instructoresPrestan[i] &&  equipoPrestar == equiposPrestados[i] && marcaPrestar == marcasPrestadas[i]){

                        

                    
                        captura2 = i;
                    };

                    
                }




                if (captura2 == -1){
                    instructoresPrestan.push(idPresta);
                    equiposPrestados.push(equipoPrestar);
                    marcasPrestadas.push(marcaPrestar);
                    cantidadPrestada.push(cantidadPrestar);
                }else{
                    cantidadPrestada[captura2] += cantidadPrestar;
                }

                stock[captura] -= cantidadPrestar;

                Swal.fire({
                    icon: "success",
                    title: "Hecho...",
                    text: "Se ha registrado correctamente un prestamo",
                });
            }else{
                Swal.fire({
                    icon: "warning",
                    title: "Error...",
                    text: "No hay cantidad suficiente",
                });
            }

        }
    };



    imprimirPrestamos();
    imprimirEquipos();
    guardarDatosEnLocalStorage();

    }
}


    equipoPrestarInput.value = "";
    marcaPrestarInput.value = "";
    cantidadPrestarInput.value = "";
    idPrestaInput.value = "";

})






function imprimirPrestamos(){
    let listaPrestamos = "";
    for(let i = 0; i < equiposPrestados.length; i++){
        listaPrestamos += `<tr>
                                <td>`+instructoresPrestan[i]+`</td>
                                <td>`+equiposPrestados[i]+`</td>
                                <td>`+marcasPrestadas[i]+`</td>
                                <td>`+cantidadPrestada[i]+`</td>
                            </tr>`;
    };
    const tbodyPrestamos = document.getElementById('prestamos');
    tbodyPrestamos.innerHTML = listaPrestamos;
}



function devolverPrestamo(){

    
    const nombreEquipoInput = document.getElementById("equipoDevolverInput")
    let nombreEquipo = nombreEquipoInput.value

    const marcaEquipoInput = document.getElementById("marcaDevolverInput")
    let marcaEquipo = marcaEquipoInput.value

    const idInstructorInput = document.getElementById("inputidDevolver")
    let idInstructor = idInstructorInput.value

    const cantidadDevolverInput = document.getElementById("inputCantidadDevolver")
    let cantidadDevolver = parseInt(cantidadDevolverInput.value)

    if(nombreEquipoInput.value == "" || marcaEquipoInput == "" || idInstructorInput == "" || cantidadDevolverInput == ""){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Datos no llenados o invalidos",
          });
    }else{


    let captura = -1;

    for (let i = 0; i < equiposPrestados.length; i++ ){
        if( idInstructor == instructoresPrestan[i] &&  nombreEquipo == equiposPrestados[i] && marcaEquipo == marcasPrestadas[i] ){
            captura = i;
        };
    };

    if (captura == -1){
        Swal.fire({
            icon: "question",
            title: "Error...",
            text: "No hay prestamos con dicha informacion",
          });
    }else{
        if(cantidadDevolver <= 0 || isNaN(cantidadDevolver)){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Cantidad no valida",
              });


        }else{

        
        

        if(cantidadDevolver <= cantidadPrestada[captura]){
            cantidadPrestada[captura] -= cantidadDevolver;
            if (cantidadPrestada[captura] == 0){
                // eliminar datos de los arreglos de prestamos.
                instructoresPrestan.splice(captura, 1);
                equiposPrestados.splice(captura, 1);
                marcasPrestadas.splice(captura, 1);
                cantidadPrestada.splice(captura, 1);
            }
            for(let i = 0; i < equipos.length; i++){
                // si el equipo y la marca ya estan en los arreglos captura en que indice
                if (nombreEquipo == equipos[i] && marcaEquipo == marcas[i]){
                    stock[i] += cantidadDevolver;
                };
            };


            Swal.fire({
                icon: "success",
                title: "Hecho...",
                text: "Se ha devuelto correctamente un prestamo",
              });

        }else{
            Swal.fire({
                icon: "warning",
                title: "Error...",
                text: "La cantidad supera a la prestada",
              });
        }
    }
    imprimirPrestamos();
    imprimirEquipos();
    guardarDatosEnLocalStorage();


    }
}
    nombreEquipoInput.value = "";
    marcaEquipoInput.value = "";
    cantidadDevolverInput.value = "";
    idInstructorInput.value = "";


};



