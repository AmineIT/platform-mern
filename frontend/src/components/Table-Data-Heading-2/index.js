import React from 'react'

import { DataHeading } from './style'
import { RiArrowDownSLine } from 'react-icons/ri'

const TableHeading = () => {
    return (
        <DataHeading>
            <div className='span-col-2'>
                <div className="dropdown is-hoverable is-left">
                    <div className="dropdown-trigger">
                        <button className="button" aria-haspopup="true" aria-controls="dropdown-menu6">
                            <span>Sort by: <span style={{ color: '#1C65E3' }}>Last updated</span></span>
                            <span className="icon is-small">
                                <RiArrowDownSLine size='18' />
                            </span>
                        </button>
                    </div>
                    <div className="dropdown-menu" id="dropdown-menu6" role="menu">
                        <div className="dropdown-content">
                            <span href="#" className="dropdown-item">
                                Status
                        </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='actions'>
                <span className='mr-2'>Candidates</span>
            </div>
            <div className='actions'>
                Updated at
            </div>
            <div className='actions'>
                Actions
            </div>
        </DataHeading>
    )
}

export default TableHeading

