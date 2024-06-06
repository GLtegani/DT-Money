import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import { useForm } from "react-hook-form";
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionsContext } from "../../../../contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";
import { memo } from "react";

const searchFormSchema = z.object({
   query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

function SearchFormComponent() {
   const fetchTransactions = useContextSelector(TransactionsContext, (context) => {
      return context.fetchTransactions
   })
   
   const { 
      register, 
      handleSubmit,
      formState: {isSubmitting},
      reset,
   } = useForm<SearchFormInputs>({
      resolver: zodResolver(searchFormSchema)
   })

   const handleSearchTransactions = async (data: SearchFormInputs) => {
      await fetchTransactions(data.query)
      reset()
   }

   return (
      <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
         <input 
            type="text" 
            placeholder="Busque por transações"
            {...register('query')} 
         />

         <button type="submit" disabled={isSubmitting}>
            <MagnifyingGlass size={20} />
            Buscar
         </button>
      </SearchFormContainer>
   )
}

export const SearchForm = memo(SearchFormComponent)