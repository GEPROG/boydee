import { Service } from '@feathersjs/feathers';

import feathersClient, { BaseModel, makeServicePlugin } from '@/lib/feathers';

class User extends BaseModel {
  static modelName = 'User';
}

const servicePath = 'user';

const servicePlugin = makeServicePlugin({
  Model: User,
  service: feathersClient.service(servicePath) as Service<unknown>,
  servicePath,
});

export default servicePlugin;
