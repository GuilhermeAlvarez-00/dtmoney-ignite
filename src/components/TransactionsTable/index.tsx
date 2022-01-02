import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { Container } from './styles'

interface TransactionsProps {
  id: number;
  title: string;
  amount: number;
  category: string;
  createdAt: string;
}

interface TransactionsTableProps {
  transactions: TransactionsProps[]
}

export function TransactionsTable() {
  const [transactions, setTransactions] = useState<TransactionsTableProps>()

  useEffect(() => {
    api.get('/transactions')
    .then(response => setTransactions(response.data))
  }, [])

  console.log(transactions)

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Desenvolvimento de um website</td>
            <td className="deposit">R$ 12.000</td>
            <td>Desenvolvimento</td>
            <td>02/01/2022</td>
          </tr>
          
          <tr>
            <td>Aluguel</td>
            <td className="withdraw">- R$ 900.00</td>
            <td>Casa</td>
            <td>02/01/2022</td>
          </tr>
        </tbody>
      </table>
    </Container>
  )
}
