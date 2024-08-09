
//declarar parametros generales
let level="-";
let idiom= "es";
let language="es-Es"; 
let characterToReplace="";
let regexvalidation ="";
let warning="";
let regexRemplace=""; 
let elementosOriginal = [];

// buscar valor de variables fontsize en css
const getFontSize = () =>
  parseFloat(getComputedStyle(document.documentElement)
    .getPropertyValue('--font-size'))

const diccionarioEncriptador = {
    a: 'ai', e: 'enter', i: 'imes', o: 'ober', u: 'ufat', á: '6um', é: '7bn', í: '6ec', ó: '7td', ú: '6rr', 
    b: '5k9', c: '86p', d: 'w4q', f: '17k', g: 'x39', h: 'd5r', j: '92w', k: '615', l: '043', m: '7p8', n: '2f6',    
    p: 'a80', q: '357', r: '9d4', s: 'f21', t: 'w6k', v: '58a', w: 'x29', x: '713', y: '4k6', z: 'd8p',
    A: 'AI', E: 'ENTER', I: 'IMES', O: 'OBER', U: 'UD', Á: '6UM', É: '7BN', Í: '6EC', Ó: '7TD', Ú: '6RR', 
    B: '5K9', C: '86P', D: 'W4Q', F: '17K', G: 'X39', H: 'D5R', J: '92W', K: '6K5', L: 'L43', M: '7P8', N: '2F6',    
    P: 'A80', Q: '3Y7', R: '9D4', S: 'F21', T: 'W6K', V: '58A', W: 'X29', X: '7L3', Y: '4K6', Z: 'D8P',
    '0': 'm92', '1': 'f37', '2': 'k51', '3': 'w04', '4': '629', '5': 'p73', '6': 'x18', '7': 'a45', '8': 'd60', '9': 'b32'
};

//textos de elementos del dom default
let elementosdomEn = [
  {
    id: "warning",
    textContentEs: "Solo letras minúsculas y sin acentos",
    textContentEn: "Only lowercase letters and no accents"
  },
  {
    id: "encriptar",
    textContentEs: "Encriptar",
    textContentEn: "Encrypt"
  },
  {
    id: "desencriptar",
    textContentEs: "Desencriptar",
    textContentEn: "Decrypt"
  },
  {
    id: "titleApp",
    textContentEs: "EncriptadorJS",
    textContentEn: "EncryptorJS"
  },
  {
    id: "message",
    textContentEs: "Ingrese el texto aqui",
    textContentEn: "Enter text here"
  },
  { id: "nomensaje1", 
    textContentEs: "Ningún mensaje fue encontrado",
    textContentEn: "No message was found" 
  },
  {
    id: "nomensaje2",
    textContentEs: "Ingresa el texto que desees encriptar o desencriptar.",
    textContentEn: "Enter the text you want to encrypt or decrypt."
  },
  { 
    id: "copiar", 
    textContentEs: "Copiar",
    textContentEn: "Copy" 
  }
];


//funcion que asigna valores iniciales a variables globales
async function parameterinit(){

  level="leve1";  
  caracteresReemplazar =  "aeiou";
  regexRemplace = new RegExp(`[${caracteresReemplazar}]`, 'gi');
  regexvalidation = new RegExp("^[a-z ]+$");
  warning= "Solo letras minúsculas y sin acentos";
}

//funcion que permite encriptar o desencriptar
async function accionBoton(accion){
   
    //asignar variables
    let textoEncriptado ="";
    const cadena = encontraValorElemento("message");

    //revisa si el mensaje digitado es valido para cada uno de los niveles    
    if(!regexvalidation.test(cadena)){ 
        document.getElementById("container_warning").style.color = "#ff0000";         
        asignarTextoElemento("warning", await traducirTexto( `Por favor debe Digitar ${warning}`, 'auto', idiom) );
        noresponse();
        return false;

    } else {

        if(accion=='encriptar'){
          // llama funcion para encriptar el mensaje y acciones en botones encriptar y desencriptar
            textoEncriptado = encriptar(cadena);             
            if(document.getElementById('response').innerHTML!=""){
              document.getElementById('desencriptar').removeAttribute('disabled');
            }else{
              document.getElementById('desencriptar').setAttribute('disabled','true');
            }
                      
        }else if(accion=='desencriptar'){
          // llama funcion para desencriptar el mensaje y acciones en botones encriptar y desencriptar
            textoEncriptado = desencriptar( cadena);
            if(document.getElementById('response').innerHTML!=""){
              document.getElementById('desencriptar').removeAttribute('disabled');
            }else{
              document.getElementById('desencriptar').setAttribute('disabled','true');
            }
                                             
        }
       
       siresponse();
           
       asignarTextoElemento("response",textoEncriptado);
       document.getElementById("container_warning").style.color = "#228B22"
       asignarTextoElemento("warning",  await traducirTexto( `Mensaje  ${(accion === "encriptar") ? 'encriptado' : 'desencriptado'} exitosamente`, 'auto', idiom));
    }
         
}

//Realiza acciones en etiquetas HTML cuando NO hay un mensaje encriptado o desencriptado
function noresponse() {
  
  document.getElementById('cajaNoResponse').removeAttribute('hidden');
  document.getElementById('cajaResponse').setAttribute('hidden','true');
  document.getElementById('desencriptar').setAttribute('disabled','true');
  document.getElementById('encriptar').removeAttribute('disabled');

}

 //Realiza acciones en etiquetas HTML cuando hay un mensaje encriptado o desencriptado
function siresponse() {
 
  document.getElementById('message').value = '';
  document.getElementById('cajaResponse').removeAttribute('hidden');        
  document.getElementById('copiar').removeAttribute('hidden');
  document.getElementById('cajaNoResponse').setAttribute('hidden','true'); 

}

function encriptar(cadena) {
  // Realizamos los reemplazos segun la expresion regular de cada nivel
  return cadena.replace(
    regexRemplace,
    (match) => diccionarioEncriptador[match]
  );
}

//funcion desencriptar 
function desencriptar(cadena) {
  // Creamos un nuevo objeto para almacenar los reemplazos inversos
  const reemplazosInversos = {};
  for (const vocal in diccionarioEncriptador) {
    reemplazosInversos[diccionarioEncriptador[vocal]] = vocal;
  }
  //console.log(reemplazosInversos);
  // Creamos una expresión regular para encontrar todos los reemplazos
  const regex = new RegExp(Object.keys(reemplazosInversos).join("|"), "gi");
  // Realizamos los reemplazos inversos
  return cadena.replace(regex, (match) => reemplazosInversos[match]);
}


//Funcion que asigna texto a una etiqueta html
function asignarTextoElemento(elemento, texto) {
  let elementoHTML = document.getElementById(elemento);
  elementoHTML.innerHTML = texto;
  return;
}

//Funcion que encuentra el valor de un elemento formulario
function encontraValorElemento(elemento) {
  return document.getElementById(elemento).value;    
}

// funcion que modificas las variables globales segun el nivel seleccionado
async function levelAccion() {
  if ( document.getElementById("level1").checked ) {

    parameterinit();   

  } else if ( document.getElementById("level2").checked ) {

    level = "level2";
    caracteresReemplazar = "aeioubcdfghjklmnopqrstuvwxyz";
    regexRemplace = new RegExp(`[${caracteresReemplazar}]`, "gi");
    regexvalidation = new RegExp("^[a-z0-9 ]+$");
    warning = "Solo letras en minusculas sin acentos y numeros";
    
  } else {
    level = "level3";
    regexvalidation = new RegExp("^[a-zA-Z0-9\u00C0-\u017F ]+$");
    regexRemplace = new RegExp(Object.keys(diccionarioEncriptador).join("|"),"gi");
    warning = "Solo letras en minusculas con acentos y numeros";   
  }
  document.getElementById("container_warning").style.color = "#495057";    
  asignarTextoElemento("warning", await traducirTexto( warning, 'auto', idiom)  );
}     


//Funcion para copiar al portapapeles valor de texto en etiquetas html
async function copiarportapapeles() {

  const elementoHTML = document.getElementById("response");
  navigator.clipboard.writeText(elementoHTML.innerText);
  //Pegar texto copiado a campo input del mensaje
  try {
    const text = await navigator.clipboard.readText();
    console.log("Texto del portapapeles:", text);
    document.getElementById("message").value = text;
  } catch (err) {
    console.error("Error al leer del portapapeles:", err);
  }

}

  
// funcion que permite incrementar valor de la fuente asignando variable --font-size  a 1.5 
function fontUp() {

  const checkbox = document.getElementById("textplus");

  if (checkbox.checked) {
    document.documentElement.style.setProperty("--font-size", 1.5);
  } else {
    document.documentElement.style.setProperty("--font-size", 1);
  }

}
     
// funcion para leer un elemento determinado en el idioma indicado
function leerEnVozAlta(elemento) {
  // Comprobamos si el navegador soporta la API de síntesis de voz
  if ("speechSynthesis" in window) {
    // Creamos un nuevo objeto de síntesis de voz
    const utterance = new SpeechSynthesisUtterance();
    // Asignamos el texto a leer
    utterance.text = elemento.textContent;
    // Configuramos el idioma
    utterance.lang = language;
    // Iniciamos la síntesis de voz
    speechSynthesis.speak(utterance);
  } else {
    alert("Tu navegador no soporta la síntesis de voz.");
  }
}


//funcion que detiene la leectura en voz alta 
function detenerLectura() {
  speechSynthesis.cancel();
  utteranceActual = null; // Reiniciamos la referencia al utterance actual
}

  
//funcion que lee los elementos tipo texto del dom en el idioma indicado
function accesibility() {
  const checkbox = document.getElementById("access");

  if (checkbox.checked) {
    // busca los elementos del dom segun las etiquetas indicadas
    const elementosTexto = document.body.querySelectorAll("P, H1, H2, H3, BUTTON");    
    // Iteramos sobre los elementos y los leemos llamando la funcion leer en voz alta
    elementosTexto.forEach(leerEnVozAlta);
  } else {
    detenerLectura();
  }
}

//funcion que traduce la pagina con los parametros almacenados en un array      
function traducirPagina() {
 
  // valida que idioma ha sido seleccionado
  if (document.getElementById("langEN").checked) {
    language = "en-En";
    idiom = "en";
  }
  if (document.getElementById("langES").checked) {
    language = "es-Es";
    idiom = "es";
  }

// iterar cada elemento para asignar el valor correspondiente al idioma seleccionado
  elementosdomEn.forEach((elemento) => {
    if (elemento.id != "message") {
      asignarTextoElemento(
        elemento.id,
        idiom == "en" ? elemento.textContentEn : elemento.textContentEs
      );
    } else {
      document.getElementById(elemento.id).placeholder =
        idiom == "en" ? elemento.textContentEn : elemento.textContentEs;
    }
  });

}

  
//funcion para traducir texto utilizando LA URL google translate
async function traducirTexto(texto, idiomaOrigen, idiomaDestino) {
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${idiomaOrigen}&tl=${idiomaDestino}&dt=t&q=${encodeURIComponent(texto)}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error al obtener la traducción: ${response.statusText}`);
    }
    const data = await response.json();
    return data[0][0][0]; // Return the translation
  } catch (error) {
    console.error("Error al traducir:", error);
  }
}

// llamar funcion para inicializar parametros generales
parameterinit();






//funcion anterior para traducir pagina

/*
function traducirPagina() {
  // valida que idioma ha sido seleccionado
  if (document.getElementById("langEN").checked) {
    language = "en-En";
    idiom = "en";
  }
  if (document.getElementById("langES").checked) {
    language = "es-Es";
    idiom = "es";
  }

  // busca los elementos del dom segun las etiquetas indicadas
  const elementosTexto = document.body.querySelectorAll(
    "P, H1, H2, H3, BUTTON"
  );
 
  //Itera los elementos encontrados y llama la funcion para leer y asignar el nuevo texto a la etiqueta
  elementosTexto.forEach((elemento) => {
    const textoOriginal = elemento.textContent;
    console.log(textoOriginal);

    traducirTexto(textoOriginal, "auto", idiom)
      .then((traduccion) => {
        elemento.textContent = traduccion;
      })
      .catch((error) => {
        console.error("Error al traducir:", error);
      });

    //asignarTextoElemento(elemento.id, traduccion)
  });
}*/





