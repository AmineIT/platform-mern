import React from 'react'
import ReactTooltip from 'react-tooltip'

import { DataHeading } from './style'
import { RiArrowDownSLine } from 'react-icons/ri'
import { BsInfoCircle } from 'react-icons/bs'

const TableDataHeading = () => {
    return (
        <DataHeading>
            <ReactTooltip place='top' type='dark' effect='solid' />
            <div className='span-col-2'>
            <div className="dropdown is-hoverable is-left">
                <div className="dropdown-trigger">
                    <button className="button" aria-haspopup="true" aria-controls="dropdown-menu6">
                    <span>Sort by: <span style={{color: '#1C65E3'}}>Last updated</span></span>
                    <span className="icon is-small">
                        <RiArrowDownSLine size='18' />
                    </span>
                    </button>
                </div>
                <div className="dropdown-menu" id="dropdown-menu6" role="menu">
                    <div className="dropdown-content">
                        <a href="#" className="dropdown-item">
                            Status
                        </a>
                    </div>
                </div>
            </div>
            </div>
            <div className='expires'>
                <span className='mr-2'>Expires at</span>
                <BsInfoCircle size='16' data-tip='The job will be archived after it expires.' />
            </div>
            <div className='updated'>
                Updated at
            </div>
            <div className='actions'>
                Actions
            </div>
        </DataHeading>
    )
}

export default TableDataHeading

