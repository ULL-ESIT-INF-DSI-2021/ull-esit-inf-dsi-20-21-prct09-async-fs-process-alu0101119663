import * as fs from 'fs';
import * as yargs from 'yargs';
import * as chalk from 'chalk';
import {spawn} from 'child_process';

/**
 * Comando para comprobar en un ruta determinada si es un directorio o un fichero
 */
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

/**
 * Comando para crear un directorio en una determinada ruta
 */
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

/**
 * Comando para listar los ficheros de una determinada ruta
 */
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

/**
 * Comando para mostrar el contenido de un determinado fichero que viene dado por una ruta especificada
 */
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

/**
 * Comando para borrar un determinado fichero/directorio gracias a que se le pasa su ruta
 */
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

/**
 * Comando que mueve/copia ficheros/directorios de una ruta especificada a otra
 */
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

/**
 * Funcion para comprobar si una ruta especificada es un directorio o un fichero
 * @param ruta Ruta para comprobar
 */
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

/**
 * Funcion para crear un directorio en la ruta especificada
 * @param ruta Ruta donde queremos crear el directorio
 */
function funcionMKDIR(ruta: string) {
  if (fs.existsSync(ruta))
    console.log(chalk.red("El directorio que pretende crear, ya existe"))
  else { 
    spawn('mkdir', [ruta]);
  }
}

/**
 * Funcion para listar los fichero de una determinada ruta especificada
 * @param ruta Ruta donde queremos hacer el listado de archivos
 */
function funcionLS(ruta: string) {
  if (fs.existsSync(ruta))
    spawn('ls', [ruta]).stdout.pipe(process.stdout);
  else {
    console.log(chalk.red("Existe un problema con la ruta"));
  }
}

/**
 * Funcion para mostrar el contenido de un fichero, el cual viene dado por la ruta especificada
 * @param ruta Ruta donde esta almacenado el fichero que queremos mostrar
 */
function funcionCAT(ruta: string) {
  if (fs.existsSync(ruta))
    spawn('cat', [ruta]).stdout.pipe(process.stdout);
  else {
    console.log(chalk.red("Existe un problema con la ruta"));
  }
}

/**
 * Funcion para eliminar un determinado fichero/directorio, gracias a que tenemos la ruta
 * @param ruta Ruta donde esta almacenado el fichero que queremos eliminar
 */
function funcionRM(ruta: string) {
  if (fs.existsSync(ruta))
    spawn('rm', ['-r', ruta]);
  else {
    console.log(chalk.red("Existe un problema con la ruta"));
  }
}

/**
 * Funcion para mover/copiar ficheros/directorio tras pasar sus respectivas rutas de origen y destino
 * @param origen Origen de la operacion
 * @param destino Destino de la operacion
 */
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
