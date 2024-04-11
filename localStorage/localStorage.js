//variables globales
const d = document;
let clienteInput = d.querySelector(".cliente");
let productoInput = d.querySelector(".producto");
let precioInput = d.querySelector(".precio");
let imagenInput = d.querySelector(".imagen");
let observacionInput = d.querySelector(".observacion");
let btnGuardar = d.querySelector(".btn-guardar");
let tabla = d.querySelector(".table > tbody")
//agregar evento click al boton del formulario
btnGuardar.addEventListener("click", () => {
    //alert(clienteInput.value);
    let datos = validarFormulario();
    if (datos != null) {
        guardarDatos(datos);
    }
    borrarTabla();
    mostrarDatos();
})
//funcion para validar los campos del formulario
function validarFormulario() {
    let datosForm;
    if (clienteInput.value == "" || productoInput.value == "" ||
        precioInput.value == "" || imagenInput.value == "") {

        alert("Todos los campos del formulario son obligatorios");

    } else {
        datosForm = {
            cliente: clienteInput.value,
            producto: productoInput.value,
            precio: precioInput.value,
            imagen: imagenInput.value,
            observacion: observacionInput.value
        }
        console.log(datosForm);
        clienteInput.value = "";
        productoInput.value = "";
        precioInput.value = "";
        imagenInput.value = "";
        observacionInput.value = "";
        return datosForm;
    }
}
//funcion guardar datos en localStorage
const listadoPedidos = "Pedidos";
function guardarDatos(datos) {
    let pedidos = [];
    //extraer datos guardados previamente en el localStorage
    let pedidosPrevios =
        JSON.parse(localStorage.getItem(listadoPedidos));
    //validar datos guardados previamente en el localStorage
    if (pedidosPrevios != null) {
        pedidos = pedidosPrevios;
    }
    //agregar el pedido nuevo al array
    pedidos.push(datos);
    //guardar en localStorage
    localStorage.setItem(listadoPedidos, JSON.stringify(pedidos));
    //validar que los datos fueron guardados
    alert("Datos guardados con exito");
}
//funcion para extraer los datos guardados en el localStorage
function mostrarDatos() {
    let pedidos = [];
    //extraer datos guardados previamente en el localStorage

    let pedidosPrevios =
        JSON.parse(localStorage.getItem(listadoPedidos));
    //validar datos guardados previamente en el localStorage
    if (pedidosPrevios != null) {
        pedidos = pedidosPrevios;
    }
    //mostrar los datos en la tabla
    pedidos.forEach((p, i) => {
        let fila = d.createElement("tr");
        fila.innerHTML = `
        <td> ${i + 1} </td>
        <td> ${p.cliente} </td>
        <td> ${p.producto} </td>
        <td> ${p.precio} </td>
        <td> <img src="${p.imagen}" width = "20%"></td>
        <td> ${p.observacion} </td>
        <td>
        <div class="d-flex  ">
      

        <span onclick="actualizarPedido (${i})" class="btn-editar

        btn btn-success mr-5"> 📜 </span>

        <span onclick="eliminarPedido(${i})" class="btn-eliminar

        btn btn-danger"> ✖️ </span>

        </td>
        </div>
        `;
        tabla.appendChild(fila);
    });
}
//quitar los datos de la tabla
function borrarTabla() {
    let filas = d.querySelectorAll(".table tbody tr")
    filas.forEach((f) => {
        f.remove();
    });
}
//funcion eliminar un pedido de la tabla
function eliminarPedido(pos) {
    let pedidos = [];
    //extraer datos guardados previamente en el localStorage
    let pedidosPrevios =
        JSON.parse(localStorage.getItem(listadoPedidos));
    //validar datos guardados previamente en el localStorage
    if (pedidosPrevios != null) {

        pedidos = pedidosPrevios;
    }
    //confirmar pedido a eliminar
    let confirmar = confirm("Deseas eliminar el pedido del cliente : "
        + pedidos[pos].cliente);
    if (confirmar) {
        let p = pedidos.splice(pos, 1);
        alert("Pedido Eliminado con exito");
        //guardar los datos que quedaron en localStorage
        localStorage.setItem(listadoPedidos, JSON.stringify(pedidos));
        borrarTabla();
        mostrarDatos();
    }
}
//actualizar pedido de localStorage
function actualizarPedido(pos) {
    let pedidos = [];
    //extraer datos guardados previamente en el localStorage
    let pedidosPrevios =
        JSON.parse(localStorage.getItem(listadoPedidos));
    //validar datos guardados previamente en el localStorage
    if (pedidosPrevios != null) {
        pedidos = pedidosPrevios;
    }
    //pasar los datos al formulario para editarlos
    clienteInput.value = pedidos[pos].cliente;
    productoInput.value = pedidos[pos].producto;
    precioInput.value = pedidos[pos].precio;
    observacionInput.value = pedidos[pos].observacion;
    //seleccionar el boton de actualizar
    let btnActualizar = d.querySelector(".btn-actualizar");
    btnActualizar.classList.toggle("d-none");
    btnGuardar.classList.toggle("d-none");
    //agregar evento al boton actualizar
    btnActualizar.addEventListener("click", () => {
        pedidos[pos].cliente = clienteInput.value;
        pedidos[pos].producto = precioInput.value;
        pedidos[pos].precio = precioInput.value;
        pedidos[pos].observacion = observacionInput.value;
        //guardar los datos editados en localStorage
        localStorage.setItem(listadoPedidos, JSON.stringify(pedidos));
        alert("El dato fue actualizado con exito");

        clienteInput.value = "";
        productoInput.value = "";
        precioInput.value = "";
        observacionInput.value = "";

        btnActualizar.classList.toggle("d-none");
        btnGuardar.classList.toggle("d-none")


        borrarTabla();
        mostrarDatos();
    });
}
//mostrar los datos de localStorage al recargar la pagina
d.addEventListener("DOMContentLoaded", () => {
    borrarTabla();
    mostrarDatos();
})


let buscarInput = document.querySelector(".botonBuscar");
buscarInput.addEventListener("input", () => {
    let buscarValor = buscarInput.value.toLowerCase();
    filtrarTabla(buscarValor);
});
function filtrarTabla(buscarValor) {
    let filas = document.querySelectorAll(".table tbody tr");
    filas.forEach((fila) => {
    
        let celdas = fila.querySelectorAll("td");
        let encontrado = Array.from(celdas).some((celda) =>
            celda.textContent.toLowerCase().includes(buscarValor));

        if (encontrado || buscarValor == "") {
            fila.style.display = "table-row";
        } else {
            fila.style.display = "none";
        }
    });
}
