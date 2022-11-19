class Vehiculo {
    id;
    modelo;
    anoFab;
    velMax;

    constructor(id,modelo,anoFab,velMax)
    {
        this.id = id;
        this.modelo = modelo;
        this.anoFab = anoFab;
        this.velMax = velMax;
    }

    ToString()
    {
        return this.id + ' - ' + this.modelo + ' - ' + this.anoFab + ' - ' + this.velMax;
    }
}

class Aereo extends Vehiculo {
    altMax;
    autonomia;

    constructor(id,modelo,anoFab,velMax,altMax,autonomia)
    {
        super(id,modelo,anoFab,velMax);
        this.altMax = altMax;
        this.autonomia = autonomia;
    }

    ToString()
    {
        return super.ToString() + this.altMax + ' - ' + this.autonomia;
    }
}

class Terrestre extends Vehiculo {
    cantPue;
    cantRue;

    constructor(id,modelo,anoFab,velMax,cantPue,cantRue)
    {
        super(id,modelo,anoFab,velMax);
        this.cantPue = cantPue;
        this.cantRue = cantRue;
    }

    ToString()
    {
        return super.ToString() + this.cantPue + ' - ' + this.cantRue;
    } 
}

// METODO: GET   // FORMA: FETCH  
function recuperarData(){
    fetch('http://localhost/vehiculoAereoTerrestre.php')
    .then(res => {
        if(res.ok && res.status == 200){
            return res.json();
        }
        else{
            console.log("No se pudo cargar la lista");
        }
    })
    .then(data => {
        parsear(data);
    })
    .catch((error)=>{
        console.error(error);   
    })
};

recuperarData();

var personasFiltradas = [];


function parsear(cadenaConvertir){

    cadenaConvertir.map((elemento) => {
        if((typeof elemento.cantPue == 'undefined' && typeof elemento.cantRue == 'undefined'))
        {
            personasFiltradas.push(new Aereo(elemento.id,elemento.modelo,elemento.anoFab,elemento.velMax,elemento.altMax,elemento.autonomia));
        }
        else if((typeof elemento.altMax == 'undefined' && typeof elemento.autonomia == 'undefined'))
        {
            personasFiltradas.push(new Terrestre(elemento.id,elemento.modelo,elemento.anoFab,elemento.velMax,elemento.cantPue,elemento.cantRue));
        }
    });
    crearTabla(personasFiltradas);
    parar();
}


function crearTabla()
{
    let tbody = document.getElementById("tbody");
    let tr = document.createElement("tr");

    limpiarTabla();

    if(!tbody.childElementCount > -1)
    {
        personasFiltradas.forEach(element => {
            cargarCampos(element);
        });
    }
}

function cargarCampos(element)
{
    let tbody = document.getElementById("tbody");
    
    if(element instanceof Aereo)
    {
        let newRow = tbody.insertRow();

        let id = newRow.insertCell(-1);
        let modelo = newRow.insertCell(-1);
        let anoFab = newRow.insertCell(-1);
        let velMax = newRow.insertCell(-1);
        let altMax = newRow.insertCell(-1);
        let autonomia = newRow.insertCell(-1);
        let cantPue = newRow.insertCell(-1);
        let cantRue = newRow.insertCell(-1);
        let modificar = newRow.insertCell(-1);
        let eliminar = newRow.insertCell(-1);
        
        crearBoton(modificar,"Modificar",element);
        crearBoton(eliminar,"Eliminar",element);
        
        id.innerHTML = element.id;
        modelo.innerHTML = element.modelo;
        anoFab.innerHTML = element.anoFab;
        velMax.innerHTML = element.velMax;
        altMax.innerHTML = element.altMax;
        autonomia.innerHTML = element.autonomia;    
        cantPue.innerHTML = "N/A";
        cantRue.innerHTML = "N/A";
    }
    
    if(element instanceof Terrestre)
    {
        let newRow = tbody.insertRow(tbody.length);


            let id = newRow.insertCell(-1);
            let modelo = newRow.insertCell(-1);
            let anoFab = newRow.insertCell(-1);
            let velMax = newRow.insertCell(-1);
            let altMax = newRow.insertCell(-1);
            let autonomia = newRow.insertCell(-1);
            let cantPue = newRow.insertCell(-1);
            let cantRue = newRow.insertCell(-1);
            let modificar = newRow.insertCell(-1);
            let eliminar = newRow.insertCell(-1);

            crearBoton(modificar,"Modificar",element);
            crearBoton(eliminar,"Eliminar",element);

            id.innerHTML = element.id;
            modelo.innerHTML = element.modelo;
            anoFab.innerHTML = element.anoFab;
            velMax.innerHTML = element.velMax;
            altMax.innerHTML = "N/A";
            autonomia.innerHTML = "N/A";
            cantPue.innerHTML = element.cantPue;
            cantRue.innerHTML = element.cantRue;
    }
}

function crearBoton(referencia,tipo,elemento){
    
    let btn = document.createElement('input');
    btn.type = "button";
    btn.id = tipo + elemento.id;
    btn.value = tipo;
    btn.onclick = ()=>{ 
        if(tipo == "Modificar"){
            let objAux = {id:elemento.id,modelo:elemento.modelo,anoFab:elemento.anoFab,velMax:elemento.velMax,altMax:elemento.altMax,autonomia:elemento.autonomia,cantPue:elemento.cantPue,cantRue:elemento.cantRue };
            btnAlta.onclick = () => {modificar(); simularEspera();} 
            cargarABM(id=elemento.id,modelo=elemento.modelo,anoFab=elemento.anoFab,velMax=elemento.velMax,altMax=elemento.altMax,autonomia=elemento.autonomia,cantPue=elemento.cantPue,cantRue=elemento.cantRue,titulo="Modificar Elemento");
        }
        else if(tipo == "Eliminar"){
            btnAlta.onclick = () => {simularEspera(); eliminarObj();}; 
            cargarABM(id=elemento.id,modelo=elemento.modelo,anoFab=elemento.anoFab,velMax=elemento.velMax,altMax=elemento.altMax,autonomia=elemento.autonomia,cantPue=elemento.cantPue,cantRue=elemento.cantRue,titulo="Eliminar Elemento");
    }};
    referencia.appendChild(btn);
}

let btnAgregar = document.getElementById("btnAgregar");
let lstTipoABM = document.getElementById("lstTipoABM");
var lstHeroes = false;

btnAgregar.addEventListener("click",(event) => {
    btnAlta.onclick = () => alta();
    cargarABM();
});


lstTipoABM.addEventListener("change",(event) => {
    if(!lstHeroes)
    {
        CambiarlstTipoABM(lstTipoABM.value,"","","cantPue: ","cantRue: ");
        lstHeroes = true;
    }
    else
    {
        CambiarlstTipoABM(lstTipoABM.value,"","","altMax: ","autonomia: ");
        lstHeroes = false;
    }
});

function cargarABM(id="",modelo="",anoFab="",velMax="",altMax="",autonomia="",cantPue="",cantRue="",titulo="Agregar Elemento")
{
    document.getElementById("inputTitulo").innerHTML = titulo
    document.getElementById("formDatos").style.display = "none";
    document.getElementById("divAbm").style.display = "";
    document.getElementById("inputId").value = id;
    document.getElementById("inputModelo").value = modelo;
    document.getElementById("inputAnoFab").value = anoFab;
    document.getElementById("inputvelMax").value = velMax;

    if(cantPue == "" && cantRue == "")
    {
        CambiarlstTipoABM("Aereo",altMax,autonomia,"altMax: ","autonomia: ",);
    }
    else
    {
        CambiarlstTipoABM("Terrestre",cantPue,cantRue,"cantPue: ","cantRue: ");
    }
}

function CambiarlstTipoABM(tipo,c1,c2,v1,v2)
{
    document.getElementById("lstTipoABM").value = tipo;
    document.getElementById("inputAux1").value = c1;
    document.getElementById("labelAux1").innerHTML = v1;
    document.getElementById("inputAux2").value = c2;
    document.getElementById("labelAux2").innerHTML = v2;
}

function limpiarTabla()
{
    let table = document.getElementById("table");
    let tamanio = table.rows.length;

    for(let i=1 ; i<tamanio ; i++)
    {
        table.deleteRow(1);
    }
}


let body = document.getElementById("body");
body.addEventListener("load", init());

function init()
{
    document.getElementById("divAbm").style.display = "none";
}


function filtrarLista(filtro)
{
    let listaFiltrada = personasFiltradas;

    if(filtro == "Heroes")
    {
        listaFiltrada = listaFiltrada.filter(p => p instanceof Aereo);
    }
    else if(filtro == "Villanos")
    {
        listaFiltrada = listaFiltrada.filter(f => f instanceof Terrestre);
    }

    return listaFiltrada;
}


function getColumn(col) {
    let table = document.getElementById("table");
    let rLen = table.rows.length;
    let paso = false;

    if (col < 0) {
        return null;
    }

    for (i = 0; i < rLen; i++) {
        tr = table.rows[i];
        if (tr.cells.length > col) { 
            td = tr.cells[col];

            if(td.style.display == "none")      
            {
                td.style.display = "";

                if(!paso)
                {
                    arraySeVeColumna[col] = true;
                    paso = true;
                }
            }
            else
            {
                td.style.display = "none";

                if(!paso)
                {
                    arraySeVeColumna[col] = false;
                    paso = true;
                }
            }
        } 
    }
    crearTabla(); 
}


let thId = document.getElementById("thId");
let thModelo = document.getElementById("thModelo");
let thAnoFab = document.getElementById("thAnoFab");
let thVelMax = document.getElementById("thVelMax");
let thAltMax = document.getElementById("thAltMax");
let thAutonomia = document.getElementById("thAutonomia");
let thCantPue = document.getElementById("thCantPue");
let thCantRue = document.getElementById("thCantRue");

var btnAlta = document.getElementById("btnAlta");

function alta()
{
    let lstTipoABM = document.getElementById("lstTipoABM");
    let id = document.getElementById("inputId").value;
    let modelo = document.getElementById("inputModelo").value;
    let anoFab = document.getElementById("inputAnoFab").value;
    let velMax = document.getElementById("inputvelMax").value;
    let aux1 = document.getElementById("inputAux1").value;
    let aux2 = document.getElementById("inputAux2").value;
    let personaAux;
    let estaEnLista = false;

    personasFiltradas.map((elemento) => {
        if(elemento.id == id)
        {
            estaEnLista = true;
        }
    });

    if(!estaEnLista)
    {
        velMax = parseInt(velMax);    

        if(!(modelo == "" || anoFab == "" || !(Number.isInteger(velMax)) || aux1 == "" || aux2 == ""))
        {
            aux1 = parseInt(aux1);        
            aux2 = parseInt(aux2); 

            id = parseInt(personasFiltradas.reduce(function(a, b) {
                if(a < b.id)
                {
                    return b.id;
                }
                else
                {
                    return a;
                }
            }, 0));
    
            id += 1;        

            if(lstTipoABM.value == "Aereo")
            {
                if(Number.isInteger(aux2) && Number.isInteger(aux1) && aux1 > 0 && aux2 > 0)
                {
                    personaAux = new Aereo(id,modelo,anoFab,velMax,aux1,aux2);
                    simularEspera();
                    crearObj(personaAux);
                }
                else
                {
                    alert("altMax y autonomia deben ser mayores a 0");
                }
            }
            else
            {   
                if(Number.isInteger(aux2) && Number.isInteger(aux1) && aux1 > 0 && aux2 > 0)
                {
                    personaAux = new Terrestre(id,modelo,anoFab,velMax,aux1,aux2);
                    simularEspera();
                    crearObj(personaAux);
                }
                else
                {
                    alert("cantPue y cantRue deben ser mayores a 0");
                }
            }            
        }
        else
        {
            alert("No estan todos los campos completos o velMax no es un numero")
        }
    }
    else
    {
        alert("Esta persona ya esta registrada");
    }
}


function modificar2()
{
    let lstTipoABM = document.getElementById("lstTipoABM");
    let id = parseInt(document.getElementById("inputId").value);
    let modelo = document.getElementById("inputModelo").value;
    let anoFab = document.getElementById("inputAnoFab").value;
    let velMax = document.getElementById("inputvelMax").value;
    let aux1 = document.getElementById("inputAux1").value;
    let aux2 = document.getElementById("inputAux2").value;
    let personaNueva;

    velMax = parseInt(velMax);  
    aux1 = parseInt(aux1);  
    aux2 = parseInt(aux2);  


    if(!(modelo == "" || anoFab == "" || !(Number.isInteger(velMax)) || aux1 == "" || aux2 == ""))
    {
        if(lstTipoABM.value == "Aereo")
        {
            if(Number.isInteger(aux1) && aux1 > 0 && Number.isInteger(aux2) && aux2 > 0)
            {
                personaNueva = new Aereo(id,modelo,anoFab,velMax,aux1,aux2);
            }
            else
            {
                alert("altMax y autonomia deben ser mayores a 0");
            }
        }
        else
        {
            if(Number.isInteger(aux1) && aux1 > 0 && Number.isInteger(aux2) && aux2 > 0)
            {
                personaNueva = new Terrestre(parseInt(id),modelo,anoFab,velMax,aux1,aux2);
            }
            else
            {
                alert("cantPue y cantRue deben ser mayores a 0");
            }
        }
    
        return personaNueva;
    }
    else
    {
        alert("Campos vacios")
    }
}

btnCancelar = document.getElementById("btnCancelar");
btnCancelar.addEventListener("click",cancelar);

function cancelar()
{
    document.getElementById("divAbm").style.display = "none";
    document.getElementById("formDatos").style.display = "";
}

function eliminar()
{
    let id = document.getElementById("inputId").value;
    let indiceReemplazar = personasFiltradas.map(e => e.id).indexOf(parseInt(id));

    if(indiceReemplazar != -1)
    {
        personasFiltradas.splice(indiceReemplazar,1);
        crearTabla();
    }
    else
    {
        alert("No se pudo eliminar");
    }
}

function parar() {
    let contenedor = document.getElementById("contenedorCarga");
    contenedor.style.display = "none";
}

function simularEspera(){
    let contenedor = document.getElementById("contenedorCarga");
    contenedor.style.display = "";

    setTimeout(function(){
        contenedor.style.display = "none";
      }, 3000);
    
}

// METODO: POST   // FORMA: FETCH ASYNC
async function modificar(){

    let id = document.getElementById("inputId").value;
    let indiceReemplazar = personasFiltradas.map(e => e.id).indexOf(parseInt(id));

    try{
        const res = await fetch('http://localhost/vehiculoAereoTerrestre.php', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', 
            body: JSON.stringify( personasFiltradas[indiceReemplazar] ) //{'id':666}) // Tiene que coincidir con el Content-Type
        });

        if(res.ok && res.status == 200)
        {
            personasFiltradas[indiceReemplazar] = modificar2();
        
            crearTabla();
            cancelar();
            document.getElementById("formDatos").style.display = "";
        }
        else{
            alert("No se pudo modificar el objeto - " + res.statusText);
            cancelar();
            document.getElementById("formDatos").style.display = "";
        }
    }
    catch (error){
        alert(error);
    }
}

// METODO: DELETE   // FORMA: PROMESAS 
function eliminarObj(){
    let p = new Promise(EliminarBaseDeDatos);
    p.then(procesarProcesarExitoDelete)
    .catch(procesarProcesarErrorDelete)
}

function EliminarBaseDeDatos(exito, error) {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            exito(this.responseText);
        }
        if (this.readyState == 4 && this.status == 400){
            console.log(this.responseText);
            error(this.responseText);
        }
    };
    xhttp.open("DELETE", "http://localhost/vehiculoAereoTerrestre.php", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    let id = document.getElementById("inputId").value;
    let indiceReemplazar = personasFiltradas.map(e => e.id).indexOf(parseInt(id));
    xhttp.send(JSON.stringify(personasFiltradas[indiceReemplazar]));
    simularEspera();
}

function procesarProcesarErrorDelete(resultado) {
    alert("No se pudo eliminar el registro");
    cancelar();
    document.getElementById("formDatos").style.display = "";
    throw resultado;
}

function procesarProcesarExitoDelete(resultado) {
    eliminar();
    crearTabla();
    cancelar();
    document.getElementById("formDatos").style.display = "";
}

// METODO: PUT   // FORMA: XHTTP  
function crearObj(obj){
    var xhttp = new XMLHttpRequest(); 
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4) {
            if (xhttp.status == 200){
                personasFiltradas.push(obj);
                crearTabla();
                cancelar();
                document.getElementById("formDatos").style.display = "";
            } else {
                alert("No se pudieron recuperar los datos");
            }
        } 
    }; 
    xhttp.open("PUT", "http://localhost/vehiculoAereoTerrestre.php", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    objAux = {...obj};
    objAux.id = undefined;
    xhttp.send(JSON.stringify(objAux));
    simularEspera();
}
