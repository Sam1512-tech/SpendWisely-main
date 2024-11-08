import { ListItem, ListItemIcon, ListItemText, styled } from '@mui/material'
import React from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Detail = styled(ListItem)`
    margin-top: 20px;
`

export const Transaction = ({transaction, setTransactions, transactions}) => {

    const color = transaction.amount > 0 ? '#008000' : '#ff0000';

    const deleteTransaction = (id) => {
      setTransactions(transactions.filter(transaction => transaction.id !== id))
    }
  return (
    <Detail style={{background: `${color}`, color: '#fff'}}>
        <ListItemIcon><DeleteForeverIcon onClick={() => deleteTransaction(transaction.id)} /></ListItemIcon>
        <ListItemText>{transaction.text}</ListItemText>
        <ListItemText>{transaction.amount}</ListItemText>
    </Detail>
  )
}
