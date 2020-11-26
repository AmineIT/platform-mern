import React from 'react'
import { BsSearch } from 'react-icons/bs'

const SearchData = ({ placeholder, search, setSearch }) => {
    return (
        <div className="control has-icons-left">
            <input className="input" type="search" placeholder={placeholder} value={search || ''} onChange={e => setSearch(e.target.value)} />
            <span className="icon is-small is-left">
                <BsSearch />
            </span>
        </div>
    )
}

export default SearchData