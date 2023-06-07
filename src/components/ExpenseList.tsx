import { FaTrashAlt } from "react-icons/fa"

interface Expenses {
  id: string
  description: string
  amount: number
  category: string
}
interface Props {
  expense: Expenses[]
  onDelete: (id: string) => void
}
const ExpenseList = ({ expense, onDelete }: Props) => {
  if (expense.length === 0) return <p>No items in list.</p>
  return (
    <div>
      <table className="table table-border">
        <thead>
          <tr>
            <td>
              <h6>Description</h6>
            </td>
            <td>
              <h6>Amount</h6>
            </td>
            <td>
              <h6>Category</h6>
            </td>
            <td>
              <h6>Options</h6>
            </td>
          </tr>
        </thead>
        <tbody>
          {expense.map((item) => (
            <tr key={item.id}>
              <td>{item.description}</td>
              <td>${item.amount.toFixed(2)}</td>
              <td>{item.category}</td>
              <td>
                <button className="btn btn-outline-danger">
                  <FaTrashAlt
                    size={20}
                    color="btn btn-outline-danger"
                    onClick={() => onDelete(item.id)}
                  />
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <h6>Total:</h6>
            </td>
            <td>
              $
              {expense
                .reduce((total, price) => total + price.amount, 0)
                .toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ExpenseList
