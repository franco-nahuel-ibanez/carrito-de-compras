// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosDelCarrito = [];

cargarEventListeners();

function cargarEventListeners(){
	//cuando agregas un curso presionando "agregar al carrito"
	listaCursos.addEventListener('click', agregarCurso)


	// elimina cursos del carrito
	carrito.addEventListener('click', eliminarCurso)

	//vaciar carrito
	vaciarCarritoBtn.addEventListener('click', () =>{
		articulosDelCarrito = []

		limpiarHTML()
	})

}


function agregarCurso (e) {
	e.preventDefault()

	if( e.target.classList.contains('agregar-carrito') ){
		const cursoSeleccionado = e.target.parentElement.parentElement
		leerDatosCurso(cursoSeleccionado)
	
	}
}

function eliminarCurso(e){
	if(e.target.classList.contains('borrar-curso')){

		const cursoID = e.target.getAttribute('data-id')

		articulosDelCarrito = articulosDelCarrito.filter( curso => curso.id !== cursoID)

		carritoHTML()
	}

}


// lee el contenido del HTML al que le dimos click
function leerDatosCurso(curso){

	const infoCurso = {
		imagen: curso.querySelector('img').src,
		titulo: curso.querySelector('h4').textContent,
		precio: curso.querySelector('.precio span').textContent,
		id: curso.querySelector('a').getAttribute('data-id'),
		cantidad: 1
	}

	const existe = articulosDelCarrito.some( curso => curso.id === infoCurso.id );

	if(existe){
		//actualizar cantidad
		const cursos = articulosDelCarrito.map( curso => {
			if(curso.id === infoCurso.id){
				curso.cantidad ++
			}
		})
	}else{
		// agregar elementos al carrito
		articulosDelCarrito = [ ...articulosDelCarrito, infoCurso ]
	}

	console.log(articulosDelCarrito)

	carritoHTML()
}

// mostrar carrito en HTML

function carritoHTML(){

	limpiarHTML()

	articulosDelCarrito.forEach( curso => {
		const {titulo, imagen, precio, cantidad, id} = curso
		const row = document.createElement('tr');
		row.innerHTML = `
			<td>
				<img src="${imagen}" alt=${imagen} width ='100' >
			</td>
			<td>${titulo}</td>
			<td>${precio}</td>
			<td>${cantidad}</td>
			<td>
				<a href="#" class="borrar-curso" data-id="${id}" > X </a>
			</td>
		`;

		//insertar html en tbody
		contenedorCarrito.appendChild(row)
	});
}


function limpiarHTML(){
	
	while(contenedorCarrito.firstChild){
		contenedorCarrito.removeChild(contenedorCarrito.firstChild)
	}
}
















































