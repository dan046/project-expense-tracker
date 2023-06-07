import category from "../category"

interface Props {
  onSelect: (category: string) => void
}
const ExpenseFilter = ({ onSelect }: Props) => {
  return (
    <select
      className="form form-select"
      onChange={(event) => onSelect(event.target.value)}
    >
      <option value="">All Items</option>
      {category.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  )
}

export default ExpenseFilter
