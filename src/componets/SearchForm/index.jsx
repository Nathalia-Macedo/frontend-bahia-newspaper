import { MdSearch } from "react-icons/md";

export const SearchForm = () => {
    const submit = (e) => {
        e.preventDefault();
    }
    return(
        <form onSubmit={submit}>
        <input 
            type="text"
            placeholder="Digitar Pesquisa"
        />
        <button type="submit">
            <MdSearch size={25} />
        </button>
    </form>
    )
}