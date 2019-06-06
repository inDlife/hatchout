export default {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'de-labtory',
    password: 'de-labtory',
    database: 'hatchout',
    logging: true,
    synchronize: true,
    entities: ['src/domain/**/*.entity{.ts,.js}'],
};
