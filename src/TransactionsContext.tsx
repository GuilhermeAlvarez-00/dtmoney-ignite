import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from './services/api'

interface Transactions {
  id: number;
  title: string;
  value: number;
  type: string;
  category: string;
  createdAt: string;
}

type TransactionInput = Omit<Transactions, 'id' | 'createdAt'>

interface TransactionsContextData {
  transactions: Transactions[];
  createTransaction: (transatcion: TransactionInput) => Promise<void>;
}

interface TransactionsContextProps {
  children: ReactNode
}

export const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData)

export function TransactionsProvider({ children }: TransactionsContextProps) {
  const [transactions, setTransactions] = useState<Transactions[]>([])

  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date()
    })
    const { transaction } = response.data

    setTransactions([
      ...transactions,
      transaction
    ])
  }

  useEffect(() => {
    api.get('/transactions')
    .then(response => setTransactions(response.data.transactions))
  }, [])

  return (
    <TransactionsContext.Provider value={{transactions, createTransaction}}>
      {children}
    </TransactionsContext.Provider>
  )
}
