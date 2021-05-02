# Informe práctica 8 - Aplicación de procesamiento de notas de texto


## Introducción
Durante esta práctica implementaremos una serie de ejercicio para utilizar y repasar el uso de las APIs proporcionadas por Node.js para interactuar con el sistema de ficheros, asi como para crear procesos

## Antes de empezar
Antes de empezar, hemos de crear la estructura. Para ello nos haremos los mismos pasos que llevamos haciendo durante el transcurso del tiempo, en bibliografía estarán los enlaces que hemos estado siguiendo.

## Guion de la práctica 
[Guión de la práctica](https://ull-esit-inf-dsi-2021.github.io/prct09-async-fs-process/)

## Ejercicio 1
### Código
Pulse [aquí](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct09-async-fs-process-alu0101119663/blob/master/src/ejercicio1/index.ts) para acceder al código.
```
import {access, constants, watch} from 'fs';

if (process.argv.length !== 3) {
  console.log('Please, specify a file');
} else {
  const filename = process.argv[2];

  access(filename, constants.F_OK, (err) => {
    if (err) {
      console.log(`File ${filename} does not exist`);
    } else {
      console.log(`Starting to watch file ${filename}`);

      const watcher = watch(process.argv[2]);

      watcher.on('change', () => {
        console.log(`File ${filename} has been modified somehow`);
      });

      console.log(`File ${filename} is no longer watched`);
    }
  });
}
```

### Traza

Primero se inicializan

pila de llamadas | registro de eventos | cola de manejadores | salida
-----------------|---------------------|---------------------|-------
 |  |  | 
 
Paso 1. 
pila de llamadas | registro de eventos | cola de manejadores | salida
-----------------|---------------------|---------------------|-------
 main |  |  | 

Paso 2. 
pila de llamadas | registro de eventos | cola de manejadores | salida
-----------------|---------------------|---------------------|-------
 access |  |  |
 main |  |  | 

Paso 3. 

pila de llamadas | registro de eventos | cola de manejadores | salida
-----------------|---------------------|---------------------|-------
 main | access |  | 

Paso 4. El main y el access salen y entra el **callback** de access en la cola de manejadores.

pila de llamadas | registro de eventos | cola de manejadores | salida
-----------------|---------------------|---------------------|-------
  |  | callback de access | 

Paso 5. 

pila de llamadas | registro de eventos | cola de manejadores | salida
-----------------|---------------------|---------------------|-------
 callback de access |  |  | 

Paso 6. Se empieza a ejecutar en la pila de llamadas el **callback de access**.

pila de llamadas | registro de eventos | cola de manejadores | salida
-----------------|---------------------|---------------------|-------
 console.log(`Starting to watch file ${filename}`) |  |  | 
 callback de access |  |  | 

Paso 7. Se ejecuta **console.log(`Starting to watch file ${filename}`)**.

pila de llamadas | registro de eventos | cola de manejadores | salida
-----------------|---------------------|---------------------|-------
 callback de access |  |  | Starting to watch file data_base/helloworld.txt

Paso 8.
pila de llamadas | registro de eventos | cola de manejadores | salida
-----------------|---------------------|---------------------|-------
 watch(process.argv[2]) |  |  | 
 callback de access |  |  | 

Paso 9. **watch(process.argv[2])** sale de la pila y se ejecuta.

pila de llamadas | registro de eventos | cola de manejadores | salida
-----------------|---------------------|---------------------|-------
 callback de access |  |  | 

Paso 10.

pila de llamadas | registro de eventos | cola de manejadores | salida
-----------------|---------------------|---------------------|-------
 watcher.on('change') |  |  | 
 callback de access |  |  |

Paso 11.

pila de llamadas | registro de eventos | cola de manejadores | salida
-----------------|---------------------|---------------------|-------
 callback de access | watcher.on('change') |  |

Paso 12.

pila de llamadas | registro de eventos | cola de manejadores | salida
-----------------|---------------------|---------------------|-------
 console.log(`File ${filename} is no longer watched`) | watcher.on('change') |  |  
 callback de access | watcher.on('change') |  |  

Paso 13. Se ejecuta **console.log(`File ${filename} is no longer watched`)**.

pila de llamadas | registro de eventos | cola de manejadores | salida
-----------------|---------------------|---------------------|-------
  | watcher.on('change') |  | File data_base/helloworld.txt is no longer watched 

Paso 14.

pila de llamadas | registro de eventos | cola de manejadores | salida
-----------------|---------------------|---------------------|-------
 | watcher.on('change') | callback de watcher.on('change') |  

Paso 15.

pila de llamadas | registro de eventos | cola de manejadores | salida
-----------------|---------------------|---------------------|-------
 callback de watcher.on('change') | watcher.on('change') |  | 

Paso 16. Se ejecuta **callback de watcher.on('change')**.
pila de llamadas | registro de eventos | cola de manejadores | salida
-----------------|---------------------|---------------------|-------
 console.log(`File ${filename} has been modified somehow`) |  |  | 
 callback de watcher.on('change') | watcher.on('change') |  | 

Paso 17. Se ejecuta **console.log(`File ${filename} has been modified somehow`)**. 

pila de llamadas | registro de eventos | cola de manejadores | salida
-----------------|---------------------|---------------------|-------
  | watcher.on('change') |  | File data_base/helloworld has been modified somehow

Por último, se deberán repetir los últimos 4 pasos hasta que el proceso termine su ejecución.

*¿Qué hace la función access?*

La función **access** es un método utilizado que prueba los permisos de un determinado fichero o directorio. Estos permisos se podrán pasar como un parámetro usando costantes de acceso.

*¿Para qué sirve el objeto constants?*
Un objeto **constants** es importante en un sistema de archivos ya que es utilizado porque contiene las constantes para poder realizar las operaciones.

## Ejercicio 2
### Codigo
```
import * as yargs from 'yargs';
import * as fs from 'fs';
import {constants} from 'fs';
import {spawn} from 'child_process';

yargs.command({
  command: 'get',
  describe: 'Información fichero',
  builder: {
    file: {
      describe: 'Fichero',
      demandOption: true,
      type: 'string',
    },
    option: {
      describe: 'Opciones',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.file === 'string') {
      fs.access(argv.file, constants.F_OK, (err) => {
        if (err) {
          console.log(`El fichero ${argv.file} no existe`);
        } else {
          console.log(`El fichero se ha abierto correctamente`);
        

          const cat = spawn('cat', [`${argv.file}`]);
          const wc = spawn('wc', [`-${argv.option}`]);
          let wcOutput = '';

          cat.stdout.pipe(wc.stdin);

          wc.stdout.on('data', (element) => {
            wcOutput += element;
          });

          wc.on('close', () => {
            switch (argv.option) {
              case 'c':
                console.log(`El fichero ${argv.file} tiene ${wcOutput.replace(`\n`, '')} caracteres`);
                break;
              
              case 'l':
                console.log(`El fichero ${argv.file} tiene ${wcOutput.replace(`\n`, '')} lineas`);
                break;

              case 'w':
                console.log(`El fichero ${argv.file} tiene ${wcOutput.replace(`\n`, '')} palabras`);
                break;

              default:
                console.log(`Las opciones disponibles son: [c, l, w]`);
                break;
            }
          });
        }
      });
    }
   },
});

yargs.parse();
```
Pulse [aquí](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct09-async-fs-process-alu0101119663/blob/master/src/ejercicio2/appConPipe.ts) para acceder al código.

```
import * as yargs from 'yargs';
import * as fs from 'fs';
import {constants} from 'fs';
import {spawn} from 'child_process';

yargs.command({
  command: 'get',
  describe: 'Información fichero',
  builder: {
    file: {
      describe: 'Fichero',
      demandOption: true,
      type: 'string',
    },
    option: {
      describe: 'Opciones',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.file === 'string') {
      fs.access(argv.file, constants.F_OK, (err) => {
        if (err) {
          console.log(`El fichero ${argv.file} no existe`);
        } else {
          console.log(`El fichero se ha abierto correctamente`);
        
          const wc = spawn('wc', [`-${argv.option}`, `${argv.file}`]);
          let wcOutput = '';

          wc.stdout.on('data', (element) => {
            wcOutput += element;
          });

          wc.on('close', () => {
            const wcOutputArray = wcOutput.split(/\s+/);
            switch (argv.option) {
              case 'c':
                console.log(`El fichero ${argv.file} tiene ${wcOutputArray[0]} caracteres`);
                break;
              
              case 'l':
                console.log(`El fichero ${argv.file} tiene ${wcOutputArray[0]} lineas`);
                break;

              case 'w':
                console.log(`El fichero ${argv.file} tiene ${wcOutputArray[0]} palabras`);
                break;

              default:
                console.log(`Las opciones disponibles son: [c, l, w]`);
                break;
            }
          });
        }
      });
    }
   },
});

yargs.parse();
```
Pulse [aquí](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct09-async-fs-process-alu0101119663/blob/master/src/ejercicio2/appSinPipe.ts) para acceder al código.

### Explicación

Para la realización de este ejercicio debemos crear dos programas que realicen la función de mostrar al usuario la información de un fichero de texto. Esta información sera: el número de **lineas**, de **palabras** y/o de **caracteres**. En el guión se nos pide que en el primer programa hagamos uso del método **pipe** de un **Stream** y en el segundo no. Empecemos a comentar el primero.

### Metodo Pipe
Primero debemos de crear el comando haciendo uso de **yargs**. Para ello indicamos el comando, añadimos su descripción y empezamos a escribir el builder. En el **builder** definiremos que parámetros vamos a utilizar,  en este caso será el fichero y las opciones. Las opciones se refieres a los argumentos que pasaremos para decidir qué queremos contar (lineas, palabras o caracteres). Tras esto pasamos al *handler*. Antes que nada, nos aseguramos que el archivo que recibimos sea de tipo *string*, tras esto comprobamos que se pueda acceder y devolvemos por pantalla un mensaje con el resultado. Tras esto, con la ayuda de **spawn** creamos *cat*, con el que podremos leer el contenido, y *wc*. Creamos una variable para almacenar el contenido de la salida del comando *wc* y utilizamos **pipe** con cat y wc. Vamos almacenando toda la información obtenida en la variable *wcOutput* y por último tenemos un *switch* para captar el argumento que se nos ha pasado por linea de comando y así poder imprimir los resultados que se nos pide. Con *-c* podremos mostrar la cantidad de caracteres, con *-l* podremos mostrar la cantidad de lineas y con  *-w* podremos mostrar la cantidad de palabras. En caso de no ser ninguno de los mencionados, mostraremos un mensaje para que el usuario pueda ver las opciones que son correctas.

### Metodo sin Pipe
Para la realización de este método sólo se han cambiado pequeñas cosas. La diferencia es que no utilizamos el comando *cat* ya que no podremos utilizar un **pipe**. Por tanto la solución es pasarle cuando ejecutemos el *wc* la ruta del fichero que queramos analizar. Tras esto añadiremos la información a la variable de salida del comando y finalmente nos ayudaremos con un **array** para poder obtener los resultados. De resto el programa es idéntico al anterior descrito.

## Ejercicio 3
### Código
```
import * as fs from 'fs';
import * as yargs from 'yargs';
import * as chalk from 'chalk'

yargs.command({
  command: 'watch',
  describe: 'Observa un determinado directorio para saber si han habido cambios',
  builder: {
    usuario: {
      describe: 'usuario',
      demandOption: true,
      type: 'string',
    },
    ruta: {
      describe: 'Ruta del archivo a observar',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.usuario === 'string' && typeof argv.ruta === 'string') {
        funcionObservar(argv.ruta);
    }
    else {
      console.log(chalk.red("Ha habido un error con la ruta, asegurese de que es la correcta"));
    }
  },
});

yargs.parse();

function funcionObservar(ruta: string){
  if (fs.existsSync(ruta)) {
    let contador = 0;

    fs.readdir(ruta, (err, prev) => {
      if (err) 
        console.log(chalk.red("Ha habido un problema con el directorio"));
      else {
        fs.watch(ruta, (evenType, nombreFichero) => {
          contador += 1;

          if (contador % 5 == 1) {
            if (evenType == "rename"){
              fs.readdir(ruta, (err, cur) => {
                if (err) 
                  console.log(chalk.red("Ha habido un problema con el directorio"));
                else {
                  if(prev.length < cur.length) {
                    console.log(`Se ha creado ${nombreFichero}`);
                    prev = cur;
                  }
                  else {
                    console.log(`Se ha eliminado ${nombreFichero}`);
                    prev = cur;
                  }
                }
              });
              contador += 1;
            }
            if (evenType == "change")
              console.log(`Se ha modificado el archivo ${nombreFichero}`)
          }
        });
      }
    });
  }
  else
    console.log(chalk.red("Ha habido un problema con el directorio"))
}
```
Pulse [aquí](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct09-async-fs-process-alu0101119663/tree/master/src/ejercicio3) para acceder al código.

Será importante también el ejercicio de la práctica anterior, que podrá ver [aquí](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct09-async-fs-process-alu0101119663/tree/master/src/AppNotas)

### Explicación
Primero en este ejercicio lo que haremos será crear el comando que utilizaremos para observar, en este caso **watch**. Tendrá los siguientes argumentos: *usuario* y *ruta*. En el *handler* lo que hacemos es comprobar que los argumentos introducidos sean de tipo *string*, si esto se cumple lo que haremos es llamar a *funciónObserver*. En caso de que no se cumpla, se mostrará un mensaje en color rojo (usando **chalk**) indicando el error.
En esta función, lo que hacemos es comprobar que exista la ruta que hemos especificado en el argumento y tras comprobar que es correcto, creamos un contador para poder usarlo como un temporizador. Si se puede leer el directorio, actualizamos el contador y empezamos con la función importada por **fs** watch, al que le pasamos el tipo de evento y el nombre del fichero. Para que no haga la comprobación continuamente he indicado que si el contador es múltiplo de 5 realice la comprobación. Tras esto volvemos a realizar otra lectura del directorio comprobamos que si el número de archivos que hay en el directorio, si el tamaño varía tenemos una evidencia de que se ha añadido o eliminado uno o más ficheros. Gracias a los eventos podemos comprobar si ha habido modificaciones o cambios en el directorio.

*¿Cómo haría para mostrar, no solo el nombre, sino también el contenido del fichero, en el caso de que haya sido creado o modificado?*

Para poder mostrar el contenido del fichero lo que se podría utilizar es la función **fs.readFile()** una vez hemos comprobado que se haya creado o modificado y tras esto hacer un **console.log** para imprimir por pantalla el resultado.

*¿Cómo haría para que no solo se observase el directorio de un único usuario sino todos los directorios correspondientes a los diferentes usuarios de la aplicación*
Para realizar esta modificación lo que podríamos hacer es quedarnos con la carpeta raíz que contiene los usuarios y ahí ejecutar el **fs.watch()** activando la opción de *recursividad*, ya que si la tenemos habilitada, podremos observar y analizar todos los directorios y subdirectorios que tenga la carpeta raíz.

## Ejercicio 4
### Código
```
import * as fs from 'fs';
import * as yargs from 'yargs';
import * as chalk from 'chalk';
import {spawn} from 'child_process';

yargs.command({
  command: 'check',
  describe: 'Dada una ruta concreta, mostrar si es un directorio o un fichero',
  builder: {
    ruta: {
      describe: 'ruta',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.ruta === 'string') {
      funcionComprobar(argv.ruta);
    }
    else {
      console.log(chalk.red("Existe un problema con los parametros introducidos"));
    }
  },
});

yargs.command({
  command: 'mkdir',
  describe: 'Crear un nuevo directorio a partir de una nueva ruta que recibe como parámetro',
  builder: {
    ruta: {
      describe: 'ruta',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.ruta === 'string') {
      funcionMKDIR(argv.ruta);
    }
    else {
      console.log(chalk.red("Existe un problema con los parametros introducidos"));
    }
  },
});

yargs.command({
  command: 'ls',
  describe: 'Listar los ficheros dentro de un directorio',
  builder: {
    ruta: {
      describe: 'ruta',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.ruta === 'string') {
      funcionLS(argv.ruta);
    }
    else {
      console.log(chalk.red("Existe un problema con los parametros introducidos"));
    }
  },
});

yargs.command({
  command: 'cat',
  describe: 'Mostrar el contenido de un fichero',
  builder: {
    ruta: {
      describe: 'ruta',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.ruta === 'string') {
      funcionCAT(argv.ruta);
    }
    else {
      console.log(chalk.red("Existe un problema con los parametros introducidos"));
    }
  },
});

yargs.command({
  command: 'rm',
  describe: 'Borrar ficheros y directorios',
  builder: {
    ruta: {
      describe: 'ruta',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.ruta === 'string') {
      funcionRM(argv.ruta);
    }
    else {
      console.log(chalk.red("Existe un problema con los parametros introducidos"));
    }
  },
});

yargs.command({
  command: 'mv',
  describe: 'Mover y copiar ficheros y/o directorios de una ruta a otra',
  builder: {
    origen: {
      describe: 'ruta origen',
      demandOption: true,
      type: 'string',
    },
    destino: {
      describe: 'ruta destino',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.origen === 'string' && typeof argv.destino === 'string') {
      funcionMV(argv.origen, argv.destino);
    }
    else {
      console.log(chalk.red("Existe un problema con los parametros introducidos"));
    }
  },
});

yargs.parse();

function funcionComprobar(ruta: string) {
  if (fs.existsSync(ruta)) {
    fs.readdir(ruta, (err, files) => {
      if (err)
        console.log(`${ruta} es un fichero`);
      else
        console.log(`${ruta} es un directorio`);
        files
    });
  }
  else {
    console.log(chalk.red("Existe un problema con la ruta"));
  }
}

function funcionMKDIR(ruta: string) {
  if (fs.existsSync(ruta))
    console.log(chalk.red("El directorio que pretende crear, ya existe"))
  else { 
    spawn('mkdir', [ruta]);
  }
}

function funcionLS(ruta: string) {
  if (fs.existsSync(ruta))
    spawn('ls', [ruta]).stdout.pipe(process.stdout);
  else {
    console.log(chalk.red("Existe un problema con la ruta"));
  }
}

function funcionCAT(ruta: string) {
  if (fs.existsSync(ruta))
    spawn('cat', [ruta]).stdout.pipe(process.stdout);
  else {
    console.log(chalk.red("Existe un problema con la ruta"));
  }
}

function funcionRM(ruta: string) {
  if (fs.existsSync(ruta))
    spawn('rm', ['-r', ruta]);
  else {
    console.log(chalk.red("Existe un problema con la ruta"));
  }
}

function funcionMV(origen: string, destino: string) {
  if (fs.existsSync(origen))
    if (fs.existsSync(destino))
      spawn('mv', [origen, destino]);
    else {
      console.log(chalk.red("Existe un problema con la ruta destino"));
    }
  else { 
    console.log(chalk.red("Existe un problema con la ruta origen"));
  }
}
```
Pulse [aquí](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct09-async-fs-process-alu0101119663/blob/master/src/ejercicio4/ejercicio4.ts) para acceder al código.

### Explicación
Para la realización de este ejercicio se ha utilizado **yargs** para crear los comandos que se nos pedía en el guion: 
- Dada una ruta concreta, mostrar si es un directorio o un fichero. (check)
- Crear un nuevo directorio a partir de una nueva ruta que recibe como parámetro. (mkdir)
- Listar los ficheros dentro de un directorio. (ls)
- Mostrar el contenido de un fichero (similar a ejecutar el comando cat).
- Borrar ficheros y directorios. (rm)
- Mover y copiar ficheros y/o directorios de una ruta a otra. Para este caso, la aplicación recibirá una ruta origen y una ruta destino. En caso de que la ruta origen represente un directorio, se debe copiar dicho directorio y todo su contenido a la ruta destino. (mv) 

La creación de los comandos ha sido muy similar para: **check**,**mkdir**,**ls**,**cat**,**rm**. Para todos ellos solo hace falta que se le pase como argumento la ruto del archivo/directorio al que le queremos aplicar la operación. El único que tiene una ligera diferencia es: **mv** ya que este necesita un argumento más, ya que necesitará una **ruta origen** y una **ruta destino** para realizar el movimiento o copia de ficheros o directorios. Todo estos comandos en el *handler* se comprueba si los argumentos que se les han pasado son de tipo *string* y si cumple la condición se llamará a una función que se encargará de ejecutar la operación. En caso de que no cumpla la condición, se muestra por pantalla un mensaje indicando al usuario que ha ocurrido un error.

Para la operación **check** lo que se ha hecho es comprobar si la ruta especificada existe, si existe ejecutaremos un **fs.readdir** que nos ayudará a descubrir si es un directorio o un fichero.
Para la operación **mkdir**, comprobamos que si existe la ruta indicada informe al usuario de que ya existe dicha carpeta y si no existe lo que hacemos es ejecutar un **spawn** con **mkdir** y especificando la ruta que hemos recibido del usuario.
Para la operación **ls**, comprobamos que exista la ruta indicada, y si existe listaremos el contenido del directorio y en caso de que no exista se lo haremos saber al usuario.
Para la operación **cat**, comprobamos que exista la ruta indicada, si se cumple con la ayuda de **spawn** ejecutaremos un *cat* e imprimiremos por pantalla el contenido del archivo que hemos indicado a través de la ruta. En caso de que no exita la ruta indicada se lo haremos saber al usuario imprimiendo un mensaje de error.
Para la operacion **rm**, comprobamos que la ruta especificada exista y si existe nos disponemos a eliminar lo que esté en dicha ruta. Con la ayuda de **spawn** haremos un *rm -r* para poder eliminar a lo que esté apuntando la ruta que hemos recibido. En caso de que la ruta no sea la correcta se lo haremos saber al usuario.
Para la operación **mv**, comprobamos que existe la ruta que es el origen, si se cumple volvemos a hacer otra comprobación con la ruta destino. En caso de que alguna de las dos falle, se lo hará saber al usuario mostrando el error e indicando cuál no se ha indicado correctamente. Sin embargo, si ambas rutas existen se realiza utilizando **spawn** un *mv* y se le pasa como parámetros en un array el origen y el destino.

## Conclusión
Con el desarrollo de esta práctica me he familiarizado más con la API y con su guía. Estos ejercicios cortos vienen bien para poder repasar conceptos y aplicarlos. También con el ejercicio teórico, que se corresponde con el ejercicio 1, se puede repasar bien todo lo que vemos en la asignatura y poder aprender más hacerca la API de callbacks, junto a repasar cómo hacer un correcto seguimiento de la ejecución de un programa.

## Bibliografía
Guión de la práctica - https://ull-esit-inf-dsi-2021.github.io/prct09-async-fs-process/

API callbacks - https://nodejs.org/dist/latest/docs/api/fs.html#fs_callback_api

API asincrona - https://nodejs.org/dist/latest/docs/api/child_process.html#child_process_asynchronous_process_creation

Apuntes de clase:
 - https://ull-esit-inf-dsi-2021.github.io/nodejs-theory/nodejs-filesystem.html
 - https://ull-esit-inf-dsi-2021.github.io/nodejs-theory/nodejs-intro.html
 





























































