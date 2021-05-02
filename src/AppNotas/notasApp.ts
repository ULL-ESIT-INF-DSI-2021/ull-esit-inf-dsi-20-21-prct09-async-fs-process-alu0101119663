import * as yargs from 'yargs';
import {Notas} from './notas';

/**
 * Se crea un objeto de la clase Notas
 */
const notas: Notas = Notas.getNotas();

/**
 * Comando para añadir una nota
 */
yargs.command({
  command: 'add',
  describe: 'Añade una nueva nota',
  builder: {
    usuario: {
      describe: 'Usuario',
      demandOption: true,
      type: 'string',
    },
    titulo: {
      describe: 'Titulo de la nota',
      demandOption: true,
      type: 'string',
    },
    contenido: {
      describe: 'Contenido de la nota',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Color de la nota',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.usuario === 'string' && typeof argv.titulo === 'string' && typeof argv.contenido === 'string' && typeof argv.color === 'string') {
      notas.anadirNotas(argv.usuario, argv.titulo, argv.contenido,argv.color);
    }
  },
});

/**
 * Comando para eliminar una nota
 */
yargs.command({
  command: 'remove',
  describe: 'Elimina una nota',
  builder: {
    usuario: {
      describe: 'Usuario',
      demandOption: true,
      type: 'string',
    },
    titulo: {
      describe: 'Titulo de la nota',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.usuario === 'string' && typeof argv.titulo === 'string') {
      notas.eliminarNota(argv.usuario, argv.titulo);
    }
  },
});

/**
 * Comando para listar las notas de un usuario
 */
yargs.command({
  command: 'list',
  describe: 'Lista las notas de un usuario',
  builder: {
    usuario: {
      describe: 'Usuario',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.usuario === 'string') {
      notas.listarNotas(argv.usuario);
    }
  },
});

/**
 * Comando para leer una determinada nota
 */
yargs.command({
  command: 'read',
  describe: 'Lee una nota',
  builder: {
    usuario: {
      describe: 'Usuario',
      demandOption: true,
      type: 'string',
    },
    titulo: {
      describe: 'Titulo de la nota',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.usuario === 'string' && typeof argv.titulo === 'string') {
      notas.leerNotas(argv.usuario, argv.titulo);
    }
  },
});

/**
 * Le pasamos los argumentos a yargs
 */
yargs.argv;