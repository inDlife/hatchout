export default {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'rootpassword',
    database: 'hatchout',
    logging: true,
    sync: true,
    entities: ['src/domain/*/*.entity.ts'],
};
