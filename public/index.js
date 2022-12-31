const socket = io();

const email = document.getElementById("email")
const newMensaje = document.getElementById("mensaje")
const sendMensaje = document.getElementById("sendMsj")

const formMensaje = document.getElementById("containerMsj")
    formMensaje.addEventListener("submit", (e) =>{
        e.preventDefault();
        const mensaje ={
            email: email.value,
            tipo: "usuario",
            time: new Date().toLocaleString(),
            message: newMensaje.value
        }
        if(!email.value || email.value == ""){
            let html = `<p> Completar email por favor </p>`
            document.getElementById("errorEmail").innerHTML = html
        }else if(!newMensaje.value || newMensaje.value == ""){
            let html = `<p>No puedes mandar mensajes vacíos!</>`
            document.getElementById("errorEmail").innerHTML = html
        }
        socket.emit("newMsj", mensaje)
        console.log(mensaje);
        formMensaje.reset();
    })

    socket.on("mensajes", (mensajes) => {
        let html = mensajes.map(function(mensajes, index){
            return(`<p>${mensajes.time}-${mensajes.email} : ${mensajes.message}</p>`)
        }).join("<br>")
        document.getElementById("containerMsjs").innerHTML = html;
    })