tinymce.init({
    selector: '#descripcion-txt',
    height: 200,
    menubar: false,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ],
    toolbar: 'undo redo | formatselect | ' +
    'bold italic backcolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    'removeformat | help',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
  });
  

const eliminarPokemon = async function(){
  let res = await Swal.fire({
    title: `Desea enviar el pokemon ${pokemones[this.nro].nombre} al profesor Oak?`,
    showCancelButton:true,
    confirmButtonText:'Si,enviar!'
  });
  if (res.isConfirmed){
    pokemones.splice(this.nro,1);
    cargarTabla();
    Swal.fire("Pokemon enviado!")
  } else {
    Swal.fire("Operacion cancelada");
  }
};
const pokemones =  [];
const cargarTabla = () =>{
  //Referencia de la tabla
  let tbody = document.querySelector("#tabla-tbody");

  tbody.innerHTML = "";
  //Recorrer la lista de pokemones
  for(let i=0; i < pokemones.length; ++i){
    let p = pokemones[i];
    //Por cada pokemon generar una fila (tr)
    let tr = document.createElement("tr");
    //Por cada atributo(Nombre,Tipo,descripcion),voy a generar celdas (td)
    let tdNro = document.createElement("td");
    tdNro.innerText = (i+1);
    let tdNombre = document.createElement("td");
    tdNombre.innerText = p.nombre;
    if (p.legendario){
      tdNombre.classList.add("text-warning")
    }
    let tdTipo = document.createElement("td");

    let icono = document.createElement("i");
    if (p.tipo == "fuego"){
      //<i class="fas fa-fire"></i>
      icono.classList.add("fas","fa-fire","text-danger","fa-3x");
    }else if(p.tipo == "planta"){
      //<i class="fas fa-leaf"></i>
      icono.classList.add("fas","fa-leaf","text-success","fa-3x");
    }else if(p.tipo == "normal"){
      //<i class="fas fa-star"></i>
      icono.classList.add("fas","fa-star","fa-3x");
    }else if(p.tipo == "electrico"){
      //<i class="fas fa-bolt"></i>
      icono.classList.add("fas","fa-bolt","text-warning","fa-3x");
    }else if(p.tipo == "agua"){
      //<i class="fas fa-tint"></i>
      icono.classList.add("fas","fa-tint","text-primary","fa-3x");
    }
    tdTipo.classList.add("text-center")
    tdTipo.appendChild(icono);
    let tdDesc = document.createElement("td");
    tdDesc.innerHTML = p.descripcion;
    let tdAcciones = document.createElement("td");

    let boton = document.createElement("button");
    boton.classList.add("botn","btn-danger");
    boton.innerText = "Enviar al profesor Oak";
    boton.nro = i;
    boton.addEventListener("click",eliminarPokemon);

    tdAcciones.appendChild(boton);

    //Agregar las celdas al tr
    tr.appendChild(tdNro);
    tr.appendChild(tdNombre);
    tr.appendChild(tdTipo);
    tr.appendChild(tdDesc);
    tr.appendChild(tdAcciones);
    //Agregar el tr a la tabla
    tbody.appendChild(tr);
  }
}

document.querySelector("#registrar-btn").addEventListener("click", ()=>{
    //value es para obtener el valor de los input de texto
    let nombre = document.querySelector("#nombre-txt").value;
    //Esto lo saque de la pagina del tinymce, es para obtener lo escrito
    let descripcion = tinymce.get("descripcion-txt").getContent();
    //checked indica si el radio button esta seleccionado
    let legendario  = document.querySelector("#legendario-si").checked;
    //El tipo se obtiene igual que los input
    let tipo = document.querySelector("#tipo-select").value;

    //Como crear un objeto
    let pokemon = {};
    pokemon.nombre = nombre;
    pokemon.descripcion = descripcion;
    pokemon.tipo = tipo;
    pokemon.legendario = legendario;
    console.log(pokemon);
    //Como guardar en una lista de elementos
    pokemones.push(pokemon); // append
    cargarTabla();
    //Titulo, mensaje interno, (succes,info,danger)
    Swal.fire("Exito!","Pokemon Registrado","success");
});

document.querySelector("#limpiar-btn").addEventListener("click", ()=>{
  document.querySelector("#nombre-txt").value = "";
  //document.querySelector("#descripcion-txt").value = "";
  tinymce.get("descripcion-txt").setContent("");
  document.querySelector("#legendario-no").checked = true;
  document.querySelector("#tipo-select").value = "planta";
})