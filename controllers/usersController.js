const User=require('../models/user');
const jwt = require('jsonwebtoken');
const keys =require('../config/keys');
const { json } = require('express');
module.exports={
    async getAll(req,res,next){
        try {
            const data =await User.getAll();
            console.log(`Usuarios: ${data}`);
            return res.status(201).json(data);
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success:false,
                message:'Error al obtener los usuarios'
            });
        }
    },
    async getName(req,res,next){
        try {
            const name=req.params.name;
            const data =await User.findByNombre(name);
            console.log(`Usuarios: ${data}`);
            return res.status(201).json(data);
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success:false,
                message:'Error al obtener los usuarios'
            });
        }
    },

    async getProbar(req,res,next){
        try {
            const name=req.body.name;
            const data =await User.findByProbar(name);
            //console.log(`Usuarios: ${data}`);
            //return res.status(201).json(data)

         
            if(!data){
                return res.status(401).json({
                    success:false,
                    message:'No  se encontro usuario'
                })
            }
            if(data){
                console.log(`Usuarios: ${data}`);
                return res.status(201).json(data)
            }

        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success:false,
                message:'Error no se encontro usuarios'
            });
        }
    },
    async registro(req,res,next){
        try {
            const user= req.body;
            const data= await User.create(user);

            return res.status(201).json({
                success:true,
                message:'el registro se realizó correctamente'
            });
            
        } catch (error) {
              console.log(`Error: ${error}`);
            return res.status(501).json({
                success:false,
                message:'Error al crear el usuario',
                error:error
            });
        }
    },

    async login(req,res,next){
        try {
            const email=req.body.email;
            const password=req.body.password;
            const myUser =await User.findByEmail(email)
            if(!myUser){
                return res.status(401).json({
                    success:false,
                    message:'El email no fue encontrado'
                })
            }
            if(User.isPasswordMatched(password,myUser.password)){
                  const token = jwt.sign({ id:myUser,email:myUser.email},keys.secretOrKey,{
                //expiresIn:(60*60*24) 1 hora
                  });
                  const data={
                    id:myUser.id,
                    name:myUser.name,
                    lastname:myUser.lastname,
                    email:myUser.email,
                    phone:myUser.phone,
                    image:myUser.image,
                    session_token:`JWT ${token}`,
                  }
                  return res.status(201).json({
                    success:true,
                    data:data,
                    message:'El Usuario ha sido autenticacion'
                  });
            }else{
                return res.status(401).json({
                    success:false,
                    message:'La contraseña es incorrecta',
                 
                })

            }
     
            
            
        } catch (error) {
              console.log(`Error: ${error}`);
            return res.status(501).json({
                success:false,
                message:'Error al momento  de hacer login',
                error:error
            });
        }
    }
};