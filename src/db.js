import Sequelize from 'sequelize';
import path from 'path';
import fs from 'fs';
let db = null;

module.exports = app =>{
    const config = app.libs.config;
    console.log(config);
    if(!db){
      const sequelize = new Sequelize(config);

      db = {
        sequelize,
        Sequelize,
        models:{
        }
      };
      const dir = path.join(__dirname,'models');
      fs.readdirSync(dir).forEach(filename => {
        const modelDir = path.join(dir, filename);
        const model = sequelize.import(modelDir);
        db.models[model.name] = model;
      });

      Object.keys(db.models).forEach(key=>{
        db.models[key].associate(db.models);
      });

    }
    return db;
}