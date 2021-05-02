import * as fs  from 'fs';
import {spawn} from 'child_process';

const filename = process.argv[2];
const fila = process.argv[3];

fs.access(filename, fs.constants.F_OK, (err) => {
    console.log(`${filename} ${err ? 'no existe' : 'existe'}`);

    if(!err) {
        fs.watchFile(filename, (curr, prev) => {
            const cut = spawn('cut', ['-d', ',', '-f', fila, filename]);
            let cutOutput = '';
            cut.stdout.on('data', piece => cutOutput += piece);

            cut.on('close', () => {
                const outputArray = cutOutput.split('\n');
                //console.log(outputArray[0], outputArray[1], outputArray[2], outputArray[3]);
                outputArray.forEach(element => {
                    console.log(element);
                });
            });
        });
    } else {
        fs.writeFile(filename, 'prueba1,prueba2,prueba3\nprueba4,prueba5,prueba6\nprueba7,prueba8,prueba9', () => {
            console.log('Se ha creado el fichero de forma correcta, ya que el fichero que usted especifico no existia, vuelva a ejecutar el programa');
        })
    }
});


