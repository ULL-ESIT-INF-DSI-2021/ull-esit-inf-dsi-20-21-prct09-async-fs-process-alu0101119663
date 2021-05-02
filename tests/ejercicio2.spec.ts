import 'mocha';
import {expect} from 'chai';
import {execSync} from 'child_process';


const test = (args :string) => {
  return execSync(`node dist/ejercicio2/appConPipe.js get ${args}`).toString();
};

const test1 = (args :string) => {
  return execSync(`node dist/ejercicio2/appSinPipe.js get ${args}`).toString();
};

describe(('Ejercicio 2'), () => {
  it(('Prueba para comprobar que ocurre cuando no existe un fichero (con pipe)'), () => {
    expect(test(`--file="prueba0.txt" --option="l"`)).to.equal(`El fichero prueba0.txt no existe\n`);
  });

  it(('Prueba para contar el número de caracteres utilizando pipe'), () => {
    expect(test(`--file="prueba1.txt" --option="c"`)).to.equal(`El fichero se ha abierto correctamente\nEl fichero prueba1.txt tiene 17 caracteres\n`);
  });

  it(('Prueba para contar el número de líneas utilizando pipe'), () => {
    expect(test(`--file="prueba1.txt" --option="l"`)).to.equal(`El fichero se ha abierto correctamente\nEl fichero prueba1.txt tiene 3 lineas\n`);
  });

  it(('Prueba para contar el número de palabras utilizando pipe'), () => {
    expect(test(`--file="prueba1.txt" --option="w"`)).to.equal(`El fichero se ha abierto correctamente\nEl fichero prueba1.txt tiene 3 palabras\n`);
  });

  it(('Prueba para comprobar que ocurre cuando no existe un fichero (sin pipe)'), () => {
    expect(test1(`--file="prueba0.txt" --option="l"`)).to.equal(`El fichero prueba0.txt no existe\n`);
  });

  it(('Prueba para contar el número de caracteres sin utilizar pipe'), () => {
    expect(test1(`--file="prueba1.txt" --option="c"`)).to.equal(`El fichero se ha abierto correctamente\nEl fichero prueba1.txt tiene 17 caracteres\n`);
  });


  it(('Prueba para contar el número de líneas sin utilizar pipe'), () => {
    expect(test1(`--file="prueba1.txt" --option="l"`)).to.equal(`El fichero se ha abierto correctamente\nEl fichero prueba1.txt tiene 3 lineas\n`);
  });

  it(('Prueba para contar el número de palabras sin utilizar pipe'), () => {
    expect(test1(`--file="prueba1.txt" --option="w"`)).to.equal(`El fichero se ha abierto correctamente\nEl fichero prueba1.txt tiene 3 palabras\n`);
  });
});