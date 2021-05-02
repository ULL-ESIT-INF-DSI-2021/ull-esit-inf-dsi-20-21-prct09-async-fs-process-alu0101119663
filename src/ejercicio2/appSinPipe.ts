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