import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import './App.css';
import { Typography, Box } from '@mui/material';
import { Balance } from './components/Balance';
import { ExpenseCard } from './components/ExpenseCard';
import { NewTransactions } from './components/NewTransactions';
import { Transactions } from './components/Transactions';
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';


const Header = styled(Typography)`
  font-size: 3rem;
  color: #fff;
  background-color: #007bff;
  padding: 1rem 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease-in-out;
  text-align: center;
`;

const Caution = styled(Typography)`
  font-size: 1rem;
  color: black;
  text-align: center;
  margin-bottom: 1rem;
`;

const ChartHeading = styled(Typography)`
  font-size: 2rem;
  color: black;
  text-align: center;
  margin-bottom: 1rem;
`;

const Component = styled(Box)`
  display: flex;
  flex-direction: column;
  background: white;
  width: 90%;
  padding: 2rem;
  border-radius: 20px;
  margin: auto;

  @media (min-width: 768px) {
    flex-direction: row;
    & > div {
      width: 50%;
      padding: 1rem;
    }
  }
`;

const MobileGap = styled.div`
  margin-top: 1rem;
`;

const ChartContainer = styled.div`
  margin-top: 2rem;
`;

function App() {
  const [transactions, setTransactions] = useState(() => {
    const storedTransactions = localStorage.getItem('transactions');
    return storedTransactions ? JSON.parse(storedTransactions) : [];
  });

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const calculateChartData = () => {
      const data = [];
      let balance = 0;

      transactions.forEach((transaction, index) => {
        balance += transaction.amount;

        data.push({
          name: `Transaction ${index + 1}`,
          balance: balance,
        });
      });

      setChartData(data);
    };

    calculateChartData();
  }, [transactions]);

  const pieData = [
    { name: 'Income', value: transactions.reduce((acc, cur) => (cur.amount > 0 ? acc + cur.amount : acc), 0) },
    { name: 'Expense', value: transactions.reduce((acc, cur) => (cur.amount < 0 ? acc - cur.amount : acc), 0) },
  ];

  return (
    <div className="App">
      <Header>
        Expense Tracker
        <Caution>⚠️ Please add expenses or income to visualize the graphs</Caution>
      </Header>
      <Component>
        <Box>
          <Balance transactions={transactions} />
          <ExpenseCard transactions={transactions} />
          <NewTransactions setTransactions={setTransactions} />
          <ChartContainer>
            <ChartHeading variant="h4">Income vs Expense</ChartHeading>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#008000' : '#ff0000'} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Box>
        <Box>
          <Transactions transactions={transactions} setTransactions={setTransactions} />
          <MobileGap />
          <ChartContainer>
            <ChartHeading variant="h4">Balance History</ChartHeading>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="balance" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Box>
      </Component>
    </div>
  );
}

export default App;
