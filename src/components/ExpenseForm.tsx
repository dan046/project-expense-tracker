import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import category from "../category"
import { ImPriceTag } from "react-icons/im"
import { BiCategoryAlt } from "react-icons/bi"
import { BsChatLeftText } from "react-icons/bs"

const schema = z.object({
  description: z
    .string()
    .min(3, { message: "A minimum of 3 characters is required." }),
  amount: z
    .number({ invalid_type_error: "Amount is required." })
    .min(0.01, { message: "A minimum of 0.01 is required." })
    .max(100_000, {
      message: "This list can only accept up to a limit of 100,000.",
    }),
  category: z.enum(category, {
    errorMap: () => ({ message: "Category is required." }),
  }),
})

type ExpenseFormData = z.infer<typeof schema>

interface Props {
  onSubmit: (data: any) => void
}

const ExpenseForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormData>({ resolver: zodResolver(schema) })
  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data)
        reset()
      })}
    >
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          <BsChatLeftText /> Description
        </label>
        <input
          type="text"
          id="description"
          className="form-control"
          {...register("description")}
        />
        {errors.description && (
          <p className="text-danger">{errors.description.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">
          <ImPriceTag /> Amount
        </label>
        <input
          type="number"
          id="amount"
          className="form-control"
          {...register("amount", { valueAsNumber: true })}
        />
        {errors.amount && (
          <p className="text-danger">{errors.amount.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          <BiCategoryAlt /> Category
        </label>
        <select id="category" className="form-select" {...register("category")}>
          {category.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <button className="btn btn-primary" type="submit">
        SUBMIT
      </button>
    </form>
  )
}

export default ExpenseForm
