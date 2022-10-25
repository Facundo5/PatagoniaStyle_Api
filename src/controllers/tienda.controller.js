const { request, response } = require('express');
const { getConnection } = require('../database/database');

/*const getCards = (req, res) => {
    try {
        connection = getConnection
        card = connection.query('SELECT idProduct, title, price, FROM product')
        console.log(card)
        res.status(202).json({
            ok: true,
            card
        })
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: error
        })
    }
}

const getImgSlider = (req, res)=> {

}
module.exports = {
    getCards
}*/