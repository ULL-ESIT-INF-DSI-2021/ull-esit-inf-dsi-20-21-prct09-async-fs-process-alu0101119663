import * as fs from 'fs';
import * as yargs from 'yargs';
import * as chalk from 'chalk'

/**
 * Comando para observar
 */
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

/**
 * Funcion encargada para ejecutar de observadora y notificar si ha existido algún cambio en el directorio
 * @param ruta Ruta del directorio que queremos observar
 */
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