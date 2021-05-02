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

































































