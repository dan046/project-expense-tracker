import { useState } from "react"
import ExpenseList from "./components/ExpenseList"
import ExpenseFilter from "./components/ExpenseFilter"
import { v4 as uuidv4 } from "uuid"
import ExpenseForm from "./components/ExpenseForm"

const App = () => {
  const [expenses, setExpenses] = useState([
    {
      id: uuidv4(),
      description: "Light Bulb",
      amount: 20,
      category: "Utilities",
    },
    {
      id: uuidv4(),
      description: "Logitech Gaming Monitor",
      amount: 240,
      category: "Entertainment",
    },
    {
      id: uuidv4(),
      description: "1kg boneless, skinless raw chicken breast",
      amount: 25,
      category: "Grocery",
    },
    {
      id: uuidv4(),
      description: `80 inches wide screen 4K TV`,
      amount: 2000,
      category: "Miscellaneous",
    },
  ])

  const [selectedValue, setSelectedValue] = useState("")

  const visibleValue = selectedValue
    ? expenses.filter((item) => item.category === selectedValue)
    : expenses

  const handleDelete = (id: string) => {
    setExpenses(expenses.filter((item) => item.id !== id))
    console.log("Delete", id)
  }

  const handleSubmit = (data: any) => {
    setExpenses([...expenses, { ...data, id: uuidv4() }])
  }

  return (
    <div>
      <h1>Expense List</h1>
      <div className="mb-3">
        <ExpenseForm onSubmit={handleSubmit} />
      </div>
      <div className="mb-3">
        <ExpenseFilter onSelect={(category) => setSelectedValue(category)} />
      </div>
      <div className="mb-3">
        <ExpenseList expense={visibleValue} onDelete={handleDelete} />
      </div>
    </div>
  )
}

export default App
