const db= require('../config/config');
const crypto = require('crypto')
const User={};
//comillas invertida alf+96
User.getAll=()=>{
    const sql=`
    SELECT 
    * FROM
    users 
    `;
    return db.manyOrNone(sql);
}

User.findById=(id,callback)=>{
    const sql =`
    SELECT 
      id,
      email,
      name,
      lastname,
      image,
      phone,
      password,
      session_token
       FROM
    users 
    WHERE
    id=$1
    `;
    return db.oneOrNone(sql,id).then(user=>{callback(null,user);})
}
User.findByEmail=(email)=>{
    const sql =`
    SELECT 
      id,
      email,
      name,
      lastname,
      image,
      phone,
      password,
      session_token
       FROM
    users 
    WHERE
    email=$1
    `;
    return db.oneOrNone(sql,email)
}
User.findByNombre=(name)=>{
    const sql =`
    SELECT 
      id,
      email,
      name,
      lastname
       FROM
    users 
    WHERE
    name=$1
    `;
    return db.manyOrNone(sql,name)
}


User.findByProbar=(name)=>{
    const sql =`
    BEGIN;


DO $$
DECLARE
    user_id INTEGER;
BEGIN
  
    SELECT id INTO user_id FROM users WHERE name = $1;

   
    IF user_id IS NOT NULL THEN
       
        INSERT INTO logs (user_id, action, timestamp)
        VALUES (user_id, 'Registro exitoso', NOW());
    ELSE
      
        RAISE EXCEPTION 'Usuario no encontrado';
    END IF;
END $$;


COMMIT;
    `;
    return db.manyOrNone(sql,name)
}

User.create =(user)=>{

    const mypasswordHashed=crypto.createHash('md5').update(user.password).digest('hex');
     user.password = mypasswordHashed;
    const sql=`
    INSERT INTO users(
email,
name,
lastname,
phone,
image,
password,
created_at,
updated_at
    )
    VALUES($1, $2, $3, $4, $5, $6, $7, $8)RETURNING id
    `;
    return db.oneOrNone(sql,[
        user.email,
        user.name,
        user.lastname,
        user.phone,
        user.image,
        user.password,
        new Date(),
        new Date()
    ])
}

User.isPasswordMatched=(userPassword,hast)=>{
    const mypasswordHashed = crypto.createHash('md5').update(userPassword).digest('hex');
    if(mypasswordHashed === hast){
        return true;
    }
    return false;
}

module.exports=User;