const axios = require("axios");
const ACCESS_TOKEN = `${process.env.ACCESS_TOKEN}`
class PaymentService {
  async createPayment() {
    const url= "https://api.mercadopago.com/checkout/preferences";

    const body = {
      player_email : "test_user_33738528@testuser.com",
      items: [
        {
        title: "Dummy Title",
        description: "Dummy description",
        picture_url: "http://www.myapp.com/myimage.jpg",
        category_id: "cat123",
        quantity: 1,
        unit_price: 10
      }
      ],
      back_urls : {
        sucess:"https://www.sucess.com",
        failure: "http://www.failure.com",
        pending: "http://www.your-site.com"
      },
      notification_url: "https://www.your-site.com/ipn"
    };

    const payment = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`
      }
    });
    return payment.data;
  }
}
module.exports = PaymentService;