export default {
    type: 'postgres',
    host: 'localhost',
    port: 3000,
    username: 'root',
    password: 'root',
    database: 'test',
    logging: false,
    synchronize: true,
    entities: ['src/domain/*/*.entity.ts'],
};
