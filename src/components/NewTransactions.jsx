import React from 'react'
import { Box, Typography, TextField, Button, styled } from '@mui/material'
import { useState } from 'react'

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    & > h5, & > div, & > button {
        margin-top: 30px;
    }
`

export const NewTransactions = ({setTransactions}) => {

  const [text, setText] = useState('');
  const [amount, setAmount] = useState();

  const addTransaction = () => {
    const transaction = {
      id: Math.floor(Math.random() * 1000000),
      text: text,
      amount: +amount,

    }
    setTransactions(prevstate => [transaction, ...prevstate]);
  }

  return (
    <Container>
        <Typography variant='h5'>New Transactions</Typography>
        <TextField label="Enter Expense or Income" onChange={(e) => setText(e.target.value)} />
        <TextField label="Enter Amount" onChange={(e) => setAmount(e.target.value)} placeholder='add a "-" prefix to the amount to show expense'/>
        <Button variant='contained' onClick={() => addTransaction()}>Add Transaction</Button>
    </Container>
  )
}
