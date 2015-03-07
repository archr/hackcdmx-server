/**
 * Dependendias
 */
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';

/**
 * Carpeta donde estan los modelos
 */
let dir = path.join(config.root, '/models');

/**
 * Carga los modelos dinamicamente y los vuelve GLOBAL
 */

export default function () {
  mongoose.connect(config.db);

  fs.readdirSync(dir).forEach(function (_file){
    let file = path.join(dir, _file);

    if (fs.statSync(file).isDirectory()) {
      return;
    }

    try {
      var model = require(file);
      if (model && model.modelName) {
        GLOBAL[model.modelName] = model;
      }
    } catch (e) {
      console.log(e);
    }
  });
};