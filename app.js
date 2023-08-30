let autosImportados = require('./importar.js');
let personaImportada = require('./extra.js');

let concesionaria = {
   autos: autosImportados,
   persona: personaImportada,
 
   buscarAuto: function(pat){
    const encontrado = this.autos.find((auto) => auto.patente === pat);
    if(encontrado === undefined){
       return null;
    }
    return encontrado;
    },
   
    venderAuto: function (paten){
        const vender = this.buscarAuto(paten);
        if(vender != null){
        vender.vendido = true;
        }
    },
    autosParaLaVenta: function(){
        const disponibles = this.autos.filter(auto => auto.vendido == false);
        return disponibles;
    },
 
    autosNuevos: function(){
        const nuevos = this.autosParaLaVenta();
        return nuevos.filter((auto) => auto.km < 100);
     },

    listaDeVentas: function(){
        const vendidos = this.autos.filter((auto) => auto.vendido === true);
        return vendidos.map((index) => index.precio);
    },
   
    totalDeVentas: function(){
        const totalVentas = this.listaDeVentas();
        return totalVentas.reduce((valorAnterior, valorActual) => valorAnterior + valorActual, 0);
    },
    
    puedeComprar: function (coche, joven){
        const persona = this.persona.filter((pers) => pers.nombre === joven);
        const precioEnCuotas = coche.precio / coche.cuotas;
        if(persona.capacidadDePagoEnCuotas > precioEnCuotas && persona.capacidadDePagoTotal> coche.precio){
           return true;
        }
        return false;
    },

    autosQuePuedeComprar: function (persona){
        const autoVenta = this.autosParaLaVenta();
        const disponibles = autoVenta.filter((auto) => this.puedeComprar(auto, persona) === true);
        return disponibles;
    }
}


console.log(concesionaria.autosQuePuedeComprar('Juan'));



//concesionaria.venderAuto('APL123');
//console.log(concesionaria.buscarAuto('APL123'));
//console.log(concesionaria.autosParaLaVenta());
//console.log(concesionaria.autosNuevos());
//concesionaria.venderAuto('APL123');
//concesionaria.venderAuto('JJK116');
//console.log(concesionaria.listaDeVentas());
//console.log(concesionaria.totalDeVentas());

