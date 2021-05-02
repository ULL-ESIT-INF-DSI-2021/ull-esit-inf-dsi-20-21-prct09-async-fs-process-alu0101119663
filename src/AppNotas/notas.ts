import * as fs from 'fs';
import * as chalk from 'chalk';

/**
 * Clase Notas
 */
export class Notas {

  /**
   * Atributo notas
   */
  private static notas: Notas;

  /**
   * Constructor de la clase
   */
  private constructor() {}

  /**
   * Funcion para obtener el objeto notas
   * @returns el objeto notas
   */
  public static getNotas(): Notas {
    if (!fs.existsSync(`./notas`)) {
      fs.mkdirSync(`./notas`, {recursive: true});
    }
    if (!Notas.notas) {
      Notas.notas = new Notas();
    }
    return Notas.notas;
  };

  /**
   * Añadir una nota
   * @param usuario Nombre del usuario que crea la nota
   * @param titulo Titulo de la nota
   * @param contenido Contenido de la nota
   * @param color Color de la nota
   */
  anadirNotas(usuario :string, titulo :string, contenido :string, color :string) {
    this.comprobarColor(color);

    const texto = `{ "titulo": "${titulo}", "contenido": "${contenido}" , "color": "${color}" }`;
    if (fs.existsSync(`./notas/${usuario}`)) {
      if (!fs.existsSync(`./notas/${usuario}/${titulo}`)) {
        fs.writeFileSync(`./notas/${usuario}/${titulo}`, texto);
        console.log(`Nota creada ${titulo})`);
      } else {
        console.log('Ya existe una nota con ese nombre');
      }
    } else {
      fs.mkdirSync(`./notas/${usuario}`, {recursive: true});
      fs.writeFileSync(`./notas/${usuario}/${titulo}`, texto);
      console.log(`Nota creada ${titulo})`);
    }
  };

  /**
   * Elimina una nota determinada
   * @param usuario Usuario que ha escrito la nota
   * @param titulo Titulo de la nota a eliminar
   * @returns El resultado de la operacion: Si se ha eliminado o no se ha podido eliminar
   */
     eliminarNota(usuario :string, titulo :string) {
      if (fs.existsSync(`./notas/${usuario}/${titulo}`)) {
        console.log('Nota eliminada');
        fs.rmSync(`./notas/${usuario}/${titulo}`);
        return `Nota eliminada`;
      } else {
        console.log(`Nota no encontrada`);
        return `Nota no encontrada`;
      }
    }

  /**
   * Lista las notas de un usuario
   * @param usuario Usuario autor de las notas que se buscan
   * @returns Listado con las notas de dicho usuario
   */
   listarNotas(usuario :string) {
    if (fs.existsSync(`./notas/${usuario}`)) {
      console.log(chalk.white.inverse('Notas:'));
      let lista = '';

      fs.readdirSync(`./notas/${usuario}/`).forEach((note) => {
        const data = fs.readFileSync(`./notas/${usuario}/${note}`);
        const dataJSON = JSON.parse(data.toString());

        lista = lista + dataJSON.titulo + '\n';
        this.escribirColor(`- ${dataJSON.titulo}`, dataJSON.color);
      });
      return lista;
    } else {
      console.log(`No existe el usuario`);
      return 'No existe el usuario';
    }
  }

  /**
   * Leer una nota
   * @param usuario Usuario que ha escrito la nota 
   * @param titulo Titulo de la nota
   * @returns el contenido de la nota
   */
  leerNotas(usuario :string, titulo :string) {
    if (fs.existsSync(`./notas/${usuario}/${titulo}`)) {
      const data = fs.readFileSync(`./notas/${usuario}/${titulo}`);
      const dataJSON = JSON.parse(data.toString());

      this.escribirColor(`${dataJSON.titulo}`, dataJSON.color, true);
      this.escribirColor(`${dataJSON.contenido}`, dataJSON.color);
      return dataJSON;
    } else {
      console.log('Nota no encontrada');
      return 'Nota no encontrada';
    }
  }

  /**
   * Funcion encargada de escribir en un determinado color
   * @param texto Texto que se desea escribir
   * @param color Color deseado
   * @param inverse Invertir el color al escribir
   */
  escribirColor(texto :string, color :string, inverse :boolean = false) {
    switch (color) {
      case 'blue':
        console.log(
          (inverse) ? chalk.blue.inverse(texto) : chalk.blue(texto),
        );
        break;
      case 'yellow':
        console.log(
          (inverse) ? chalk.yellow.inverse(texto) : chalk.yellow(texto),
        );
        break;
      case 'red':
        console.log(
          (inverse) ? chalk.red.inverse(texto) : chalk.red(texto),
        );
        break;
      case 'green':
        console.log(
          (inverse) ? chalk.green.inverse(texto) : chalk.green(texto),
        );
        break;
    }
  }

  /**
   * Funcion encargada de verificar si el color deseado es aceptado por el programa
   * @param color Color deseado
   * @returns Si es aceptado o no
   */
  comprobarColor(color :string) {
    const bool = true;
    switch (color) {
      case 'blue':
        return bool;
      case 'yellow':
        return bool;
      case 'red':
        return bool;
      case 'green':
        return bool;
    }
    throw new Error('Ha ocurrido un problema con el color');
  }
};