import React from 'react'
import { Box, Typography } from '@mui/material'
import styled from '@emotion/styled'


const BalanceText = styled(Typography)`
    font-size: 30px;
    margin-bottom: 20px;
`

export const Balance = ({transactions}) => {

  const amount = transactions.map(transaction => transaction.amount);
  const total = amount.reduce((amount, item) => (amount += item), 0).toFixed(2);

  return (
    <Box>
        <BalanceText>Balance: ₹{total}</BalanceText>
    </Box>
  )
}
