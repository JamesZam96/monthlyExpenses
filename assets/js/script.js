let listaNombresGastos = [];
let listaValoresGastos = [];
let listaDescripcionesGastos = [];

function clickBoton(){
    let nombreGasto = document.getElementById('nombreGasto').value;
    let valorGasto = document.getElementById('valorGasto').value;
    let descripcionGasto = document.getElementById('descripcionGasto').value;

    //Valores de los inputs
    console.log(nombreGasto);
    console.log(valorGasto);
    console.log(descripcionGasto)

    //Antes de llenarla
    console.log(listaNombresGastos);
    console.log(listaValoresGastos);
    console.log(listaDescripcionesGastos);

    //Agregar valores de los inputs al arreglo
    listaNombresGastos.push(nombreGasto);
    listaValoresGastos.push(valorGasto);
    listaDescripcionesGastos.push(descripcionGasto);

    //Despues de llenarla
    console.log(listaNombresGastos);
    console.log(listaValoresGastos);
    console.log(listaDescripcionesGastos);

    actualizarListaGastos();
}

function actualizarListaGastos(){

    //Obtener id de la lista ul
    const listaElementos = document.getElementById('listaDeGastos');

    //Obtener el id del elemento html para mostrar el total de gastos
    const totalElementos = document.getElementById('totalGastos');

    //Variable para agregar elementos li a la lista ul
    let htmlLista = '';
    //Variable para sumar el total de los gastos
    let totalGastos = 0;
    //ForEach para recorrer la lista de nombres de gastos y generar los elementos li
    listaNombresGastos.forEach((elemento, posicion) => {
        //Mostrar nombres de gastos y su posicion
        console.log(elemento);
        console.log(posicion);
        //Variable para asignar el valor del gasto
        const valorGasto = Number(listaValoresGastos[posicion]);
        const descripcionGasto = listaDescripcionesGastos[posicion];
        if(valorGasto >= 150){
            htmlLista += `<li style="background-color:red;">${elemento} - USD ${valorGasto.toFixed(2)}
            <br>
            ${descripcionGasto}
            <br>
            Gasto mayor a USD 150<button onclick="editarGasto(${posicion})">Editar</button>
            <button onclick="eliminarGasto(${posicion})">Eliminar</button></li>`
        }else{
            //Construccion del elemento li
            htmlLista += `<li>${elemento} - USD ${valorGasto.toFixed(2)}
            <br>
            ${descripcionGasto}
            <br>
            <button onclick="editarGasto(${posicion})">Editar</button>
            <button onclick="eliminarGasto(${posicion})">Eliminar</button></li>`
        }
        //Suma total de los gastos
        totalGastos += Number(valorGasto);
    })
    //Agregar elementos li a la lista ul
    listaElementos.innerHTML = htmlLista;
    //Agregar total gastos al elemento html
    totalElementos.innerHTML = totalGastos.toFixed(2);
    limpiar();
}

function limpiar(){
    document.getElementById('nombreGasto').value = '';
    document.getElementById('valorGasto').value = '';
    document.getElementById('descripcionGasto').value = '';
}

function eliminarGasto(posicion){
    //splice elimina el elemento de la posision dada, el segundo parametro indica la cantidad de elementos a eliminar
    listaNombresGastos.splice(posicion,1);
    listaValoresGastos.splice(posicion,1);
    listaDescripcionesGastos.splice(posicion,1);
    actualizarListaGastos();
    console.log(listaNombresGastos);
    console.log(listaValoresGastos);
    console.log(listaDescripcionesGastos);
}

function editarGasto(posicion){
    let nombreGasto = document.getElementById('nombreGasto').value = listaNombresGastos[posicion];
    let valorGasto = document.getElementById('valorGasto').value = listaValoresGastos[posicion];
    let descripcionGasto =  document.getElementById('descripcionGasto').value = listaDescripcionesGastos[posicion];
    let botonFormulario = document.getElementById('botonFormulario');
    botonFormulario.innerText = 'Actualizar'

    botonFormulario.onclick = function(){
        actualizarGasto(posicion);
    }
    console.log(nombreGasto);
    console.log(valorGasto);
    console.log(descripcionGasto);
}


function actualizarGasto(posicion){
    // Obtener los nuevos valores
    let nuevoNombreGasto = document.getElementById('nombreGasto').value;
    let nuevoValorGasto = document.getElementById('valorGasto').value;
    let nuevaDescripcionGasto = document.getElementById('descripcionGasto').value;

    // Actualizar las listas con los nuevos valores
    listaNombresGastos[posicion] = nuevoNombreGasto;
    listaValoresGastos[posicion] = nuevoValorGasto;
    listaDescripcionesGastos[posicion] = nuevaDescripcionGasto;

    // Actualizar la lista de gastos visualmente
    actualizarListaGastos();

    // Cambiar el botón de nuevo a "Agregar Gasto"
    let botonFormulario = document.getElementById('botonFormulario');
    botonFormulario.innerText = 'Agregar Gasto';

    // Restaurar el evento original de agregar gastos
    botonFormulario.onclick = clickBoton;

    // Limpiar el formulario
    limpiar();
}