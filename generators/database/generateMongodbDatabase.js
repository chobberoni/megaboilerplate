import { join } from 'path';
import { addEnv, replaceCode, mkdirs, addNpmPackage } from '../utils';

async function generateMongodbDatabase(params) {
  switch (params.framework) {
    case 'express':
      const server = join(__base, 'build', params.uuid, 'server.js');
      const mongooseRequire = join(__dirname, 'modules', 'mongodb', 'mongoose-require.js');
      const mongooseConnect = join(__dirname, 'modules', 'mongodb', 'mongoose-connect.js');

      // Add require('mongoose')
      await replaceCode(server, 'DATABASE_REQUIRE', mongooseRequire);

      // Add mongoose.connect()
      await replaceCode(server, 'DATABASE_CONNECTION', mongooseConnect);

      // Add MONGODB environment variable
      await addEnv(params, { MONGODB: 'localhost' });

      // Add mongoose to package.json
      await addNpmPackage('mongoose', params);

      // Create models/ directory
      await mkdirs(join(__base, 'build', params.uuid, 'models'));
      break;
    case 'hapi':
      break;
    case 'meteor':
      break;
    default:
  }
}

export default generateMongodbDatabase;
