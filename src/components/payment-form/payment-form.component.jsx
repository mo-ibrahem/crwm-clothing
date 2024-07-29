import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import Button from "../button/button.component";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { selecCurrentUser } from "../../store/user/user.selector";
import { useSelector } from "react-redux";
import { PaymentFormContainer, FormContainer } from "./payment-form.styles";
const PaymentForm = () =>{
    const stripe = useStripe()
    const elements = useElements();
    const amount = useSelector(selectCartTotal)
    const currentUser = useSelector(selecCurrentUser)
    const [isProcessingPayment, setIsProcessingPayment] = useState(false)
    const paymentHandler = async (e) =>{
        e.preventDefault();
        if(!stripe || !elements){
            return;
        }
        setIsProcessingPayment(true)
        const response  = await fetch('/.netlify/functions/create-payment-intent',{
            method:'post',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({amount: amount*100})
        }).then(res => res.json());

        const { paymentIntent: {client_secret} }  = response;
        console.log(client_secret);

        const paymentResult = await stripe.confirmCardPayment(client_secret,
                {
                 payment_method: {
                    card:elements.getElement(CardElement),
                     billing_details:{
                        name: currentUser ? currentUser.displayName : 'Guest'
                     }
                    }
                }
            )
            setIsProcessingPayment(false)

            if(paymentResult.error){
                alert(paymentResult.error);
            }else{
                if(paymentResult.paymentIntent.status === 'succeeded'){
                    alert('payment result success')
                }
            }
    }   
    return(
        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler}>
                <h1>Credit Card Payment</h1>
                <CardElement />
                <Button disabled = {isProcessingPayment} buttonType={'inverted'}>Make Payment</Button>
            </FormContainer>
        </PaymentFormContainer>
    )
}
export default PaymentForm