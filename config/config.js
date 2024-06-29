const promise = require('bluebird');
const options= {
    promiseLib:promise,
    query: (e)=>{}
}
const pgp =require('pg-promise')(options);
const types=pgp.pg.types;
types.setTypeParser(1114, function(stringValue){
    return stringValue;
});

const databaseConfig={
    'host':process.env.POSTGRES_HOST,
    'port':process.env.POSTGRES_PORT,
    'database':process.env.POSTGRES_DATABASE,
    'user':process.env.POSTGRES_USERNAME,
    'password':process.env.POSTGRES_PASSWORD,
};
/*
const databaseConfig={
    'host':'127.0.0.1',
    'port':5432,
    'database':'ralenti',
    'user':'postgres',
    'password':'admin'
};
*/
const db =pgp(databaseConfig);
module.exports=db;