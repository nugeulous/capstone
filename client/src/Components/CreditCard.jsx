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

function CreditCardForm() {
  const navigate = useNavigate();
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [creditExpiration, setCreditExpiration] = useState("");
  const [creditCVC, setCreditCVC] = useState("");
  const [creditName, setCreditName] = useState("");
  const [creditValidationError, setCreditValidationError] = useState("");

// Individual Validation Functions to Follow

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

  function handleSubmit(event) {
    event.preventDefault();
    setCreditCardNumber("");
    setCreditExpiration("");
    setCreditCVC("");
    setCreditName("");

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
          <Button variant="solid" color="primary" type="submit" onClick={handleSubmit}>
            Submit Order
          </Button>
          {creditValidationError && <p>{creditValidationError}</p>}
        </CardActions>
      </CardContent>
    </Card>
  );
}

export default CreditCardForm