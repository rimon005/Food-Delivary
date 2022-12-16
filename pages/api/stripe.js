import { StarIcon } from "@mantine/core";
import Stripe from "stripe";

const stripe = new Stripe(
    "sk_test_51M6oi4JhS5lUgelVdR0oktzNvLtAif8dDU1Avkw0GpshmbmG8hSKnQOozIMo0sxECkDg9Ee8EtB44h1ZydPgojGe00x3sdCgib"
)

export default async function handle(req , res) {
    if(req.method == 'POST'){
        try{
            const params ={
                submit_type : 'pay',
                mode : 'payment',
                payment_method_types: ['card'],
                line_items: req.body.map(item => {
                    const img = item.image.asset._ref;
                    const newImage = img.replace(
                        "image-",
                        "https://cdn/sanity.io/images/dr7sxd6l/production/"
                    ).replace('-jpg', '.jpg');


                    return {
                        price_data : {
                            currency :'usd',
                            product_data : {
                                name : item.name,
                                images : [newImage],
                            },
                            unit_amount : item.price* 100
                        },
                        adjustable_quantity : {
                            enabled : false
                        },
                        quantity: item.quantity
                    }
                }),
                // success_url : `${req.headers.origin}/success`,
                cancel_url : `${req.headers.origin}/cart`
                
            }

            // checkout session
            const session = await stripe.checkout.sessions.create(params);
            console.log(session);
            res.status(200).json(session)

        }
        catch(error){
            res.status(500).json(error.message)
        }
    }
    else{
        res.setHeader('Allow' , 'POST');
        res.status(405).end('method not allowed')
    }
}