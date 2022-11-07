const {getConnection} = require('../database/database');
const {request, response} = require('express');
const bcrypt = require('bcryptjs');

const getUsers = async(req, res)=>{
    try {
        const connection = await getConnection();

        const usuarios = await connection.query("SELECT id_user, username, email FROM users");

        res.status(200).json({
            ok:true,
            usuarios
        })

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: error.message
        })
    }
}

const addUsers = async(req, res)=>{

    try {
        const {username, email, password} = req.body

        const usuario ={
            username,
            email,
            password
        }

        //encriptar la password:
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        const connection = await getConnection();
        const sql = "INSERT INTO users set ?";
        const result = await connection.query(sql, usuario);

        res.status(200).json({
            ok:true,
            msg: 'Usuario Creado con exito!'
        });

    } catch (error) {
        res.status(500).json({
            ok:false,
            message:error
        })
    }
}

const editUsers = async(req, res)=>{
    
    const id = req.params.id
    console.log(id);

    try {
        
        const userUpdated = req.body

        const connection = await getConnection();

        const idUser = await connection.query("SELECT id_user FROM users WHERE id_user = ?", id);

        if(idUser.length<1){
            return res.status(404).json({
                ok:false,
                message: 'El Usuario no existe'
            });
        }

        const result = await connection.query("UPDATE users set ? WHERE id_user=?",[userUpdated, id]);

        res.status(200).json({
            ok:true,
            result,
            msg: 'Usuario Actualizado'
        });

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: error.message
        })
    }
}

const delUser = async(req,res)=>{
    const id = req.params.id
    console.log(id)
    try {
        
        const connection = await getConnection();

        const idUser = await connection.query("SELECT id_user FROM users WHERE id_user = ?", id);

        if(idUser.length<1){
            return res.status(404).json({
                ok:false,
                message: 'El Usuario no existe'
            });
        }

        const result = await connection.query("DELETE from users set ? WHERE id_user=?", id);

        res.status(200).josn({
            ok:true,
            result,
            msg: 'Usuario Eliminado'

        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: error.message
        })
    }
}

module.exports={
    getUsers,
    addUsers,
    editUsers,
    delUser
}