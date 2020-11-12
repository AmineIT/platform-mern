import React from 'react'

import { BsSearch } from 'react-icons/bs'

const SearchField = ({placeholder, handleSearch}) => {

    return (
        <div style={{width: '30%'}} className="control has-icons-left mb-4">
            <input className="input" type="search" placeholder={placeholder} onChange={handleSearch} />
            <span className="icon is-small is-left">
                <BsSearch />
            </span>
        </div>
    )
}

export default SearchField