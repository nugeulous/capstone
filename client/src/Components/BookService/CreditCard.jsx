import * as React from 'react';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { setSitterDetails, setBookingDetails } from '../../redux/actions/slices/bookingSlice';
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

function CreditCardForm() {
  const navigate = useNavigate();
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [creditExpiration, setCreditExpiration] = useState("");
  const [creditCVC, setCreditCVC] = useState("");
  const [creditName, setCreditName] = useState("");
  const [creditValidationError, setCreditValidationError] = useState("");
  const [error, setError] = useState("");
  const bookingInfo = useSelector((state) => state.booking.bookingDetails);


  const checkCreditCard = () => {
    const results = creditCardNumber.match('^[0-9]{16}$');

    if (!results)
      setCreditValidationError("Credit Card number is Invalid.");
    else
      setCreditValidationError("");

    return !!results
  }

  const checkCreditExpiration = () => {
    const results = creditExpiration.match('^[0-9]{2}/[0-9]{2}$');

    if (!results)
    setCreditValidationError("Credit Card Expiration is Invalid.");
  else
    setCreditValidationError("");

  return !!results
  }

  const checkCreditCVC = () => {
    const results = creditCVC.match('^[0-9]{3}$');

    if (!results)
    setCreditValidationError("Credit Card CVC is Invalid.");
  else
    setCreditValidationError("");

  return !!results
  }

  const checkCreditName = () => {
    const results = creditName.match("^[a-zA-Z ]+(?: [a-zA-Z.' -]+)+$");

    if (!results)
    setCreditValidationError("Credit Card Name is Invalid.");
  else
    setCreditValidationError("");

  return !!results
  }

//  A function that calls all of those validation functions returning boolean

  const validateForm = () => {
    if (!checkCreditCard()) {
      return false;
    }
    if (!checkCreditExpiration()) {
      return false;
    }
    if (!checkCreditCVC()) {
      return false;
    }
    if (!checkCreditName()) {
      return false;
    }

    setCreditValidationError("");
    return true;
  };

  // A function that clears inputs and either gives an error or lets you continue

  async function handleSubmit(event) {
    event.preventDefault();
    
    setCreditCardNumber("");
    setCreditExpiration("");
    setCreditCVC("");
    setCreditName("");

    try {          
          const orderData = {
          service_type: bookingInfo.petsitter.service_type,
          start_date: bookingInfo.petsitter.start_date,
          end_date: bookingInfo.petsitter.end_date,
          start_time: bookingInfo.petsitter.start_time,
          end_time: bookingInfo.petsitter.end_time,
          pet_type: null, 
          petsitter_fname: bookingInfo.petsitter.fname,
          price: bookingInfo.petsitter.hourlycost,               
          paid: true,                 
          order_owner_id: null
        }
        const response = await fetch(`${API_URL}/orders/bookService`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        });
    
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
    
        const data = await response.json();
        console.log(data);
        navigate("/OrderConfirmed");
      } catch (error) {
        setError(error.message);
        console.log(error);
      }

    if (!validateForm()) {
      return;
    }
    else {
 
      navigate(`/OrderConfirmed`);
    }

  }

  return (
    <Card
      variant="outlined"
      sx={{
        maxHeight: 'max-content',
        maxWidth: '100%',
        mx: 'auto',
        // to make the demo resizable
        overflow: 'auto',
        resize: 'horizontal',
      }}
    >
      <Typography level="title-lg" startDecorator={<InfoOutlined />}>
        Enter Payment Card Details
      </Typography>
      <Divider inset="none" />
      <CardContent
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(80px, 1fr))',
          gap: 1.5,
        }}
      >
        <FormControl sx={{ gridColumn: '1/-1' }}>
          <FormLabel>Card number</FormLabel>
          <Input placeholder="Enter Your 16 Digit Credit Card Number" endDecorator={<CreditCardIcon />} value={creditCardNumber}
            onChange={(e) => setCreditCardNumber(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Expiry date</FormLabel>
          <Input placeholder="MM/YY"  value={creditExpiration}
            onChange={(e) => setCreditExpiration(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>CVC/CVV</FormLabel>
          <Input placeholder="Enter 3 Digit CVC/CVV Code" value={creditCVC}
            onChange={(e) => setCreditCVC(e.target.value)} />
        </FormControl>
        <FormControl sx={{ gridColumn: '1/-1' }}>
          <FormLabel>Card holder name</FormLabel>
          <Input placeholder="Enter Cardholder's Full Name" value={creditName}
            onChange={(e) => setCreditName(e.target.value)} />
        </FormControl>
        <CardActions sx={{ gridColumn: '1/-1' }}>
          <Button sx={{bgcolor: "#135b6d"}}variant="solid" color="primary" type="submit" onClick={handleSubmit}>
            Submit Order
          </Button>
          {creditValidationError && <p>{creditValidationError}</p>}
        </CardActions>
      </CardContent>
    </Card>
  );
}

export default CreditCardForm;