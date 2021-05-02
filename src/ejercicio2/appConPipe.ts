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