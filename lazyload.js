let contador=0;
const contenedor=document.querySelector(".main");

const renderizarPublicaciones=(nombre,texto)=>{
    let publicacion=document.createElement("div");
        publicacion.className="publicacion";
        publicacion.innerHTML=`<h3 class="titulo">${nombre}</h3>
        <p class="contenido">${texto}</p>
        <input type="text" class="comentario" placeholder="Introduce un comentario">
        <input type="submit" class="enviar">`;
    return publicacion
};

const cargarMasPublicaciones=(entry)=>{
    if(entry[0].isIntersecting){
        cargaPublicaciones(2)
    } 
}

const observer= new IntersectionObserver(cargarMasPublicaciones);


const cargaPublicaciones=async(num)=>{
    const resp=await fetch("publicaciones.json");
    const publicacionesJSON=await resp.json();
    const fragmento=document.createDocumentFragment();
    for (let i = 0; i < num; i++) {
        if(publicacionesJSON[contador] != undefined){
            const nuevaPublicacion = renderizarPublicaciones(publicacionesJSON[contador].nombre,publicacionesJSON[contador].texto);
            fragmento.appendChild(nuevaPublicacion);
            contador++;
            if(i==num-1){
                observer.observe(nuevaPublicacion)
            }
        }
        else{
            if(contenedor.lastElementChild.id !== "final"){
                let final=document.createElement("h1");
                final.innerText="NO HAY MAS PUBLICACIONES PARA CARGAR";
                final.id="final";
                fragmento.appendChild(final)
                break;
            }   
        }
    }
    contenedor.appendChild(fragmento);
}

cargaPublicaciones(4)