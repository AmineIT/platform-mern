import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table'
import { COLUMNS } from './columns'
import WindowedSelect from 'react-windowed-select'

import { FlexWrapper, EmptyState } from './style'
import SearchData from './search'
import { HiArrowNarrowUp, HiArrowNarrowDown } from 'react-icons/hi'
import { AiOutlineFileSearch } from 'react-icons/ai'

const DataTable = () => {

    const user = useSelector(state => state.auth.user)
    const { candidatesPipeline } = user

    const data = useMemo(() => candidatesPipeline, [candidatesPipeline])
    const columns = useMemo(() => COLUMNS, [])

    const tableInstance = useTable({
        columns,
        data,
        initialState: {
            sortBy: [{
                id: 'fullName',
                desc: false
            }]
        }
    }, useGlobalFilter, useSortBy, usePagination)

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        prepareRow,
        setSortBy,
        state,
        setGlobalFilter } = tableInstance
    const { globalFilter, pageIndex } = state

    const options = [
        { value: 'fullName', label: 'Full Name' },
        { value: 'email', label: 'Email' },
        { value: 'currentJobRole', label: 'Job Role' }
    ]

    return (
        <>
            {data.length === 0 ? (
                <EmptyState>
                    <div>
                        <AiOutlineFileSearch size='36' />
                        <p className='empty-state'>You don't any candidates yet in your pipeline.</p>
                    </div>
                </EmptyState>
            ) : (
                    <>
                        <FlexWrapper>
                            <div className='mr-4' style={{ width: '250px' }}>
                                <SearchData placeholder='Search for a candidate...' search={globalFilter} setSearch={setGlobalFilter} />
                            </div>
                            <div>
                                <FlexWrapper>
                                    <p className='mr-4'>Sort by:</p>
                                    <div style={{ width: '200px' }}>
                                        <WindowedSelect
                                            placeholder='Full Name'
                                            options={options}
                                            onChange={e => setSortBy([{ id: e.value, desc: false }])} />
                                    </div>
                                </FlexWrapper>
                            </div>
                        </FlexWrapper>
                        <table {...getTableProps()} style={{ width: '100%', background: '#ffffff', marginTop: '16px' }}>
                            <thead>
                                {
                                    headerGroups.map(headerGroup => (
                                        <tr {...headerGroup.getHeaderGroupProps()} style={{ borderBottom: '1px solid #dbdbdb' }}>
                                            {
                                                headerGroup.headers.map(column => (
                                                    <th {...column.getHeaderProps(column.getSortByToggleProps())} style={{ padding: '16px', cursor: 'pointer', fontSize: '14px' }}>
                                                        <FlexWrapper>
                                                            <span className='mr-4' style={{ color: '#7E8BA2' }}>
                                                                {column.render('Header')}
                                                            </span>
                                                            {column.isSorted ? (column.isSortedDesc ? <HiArrowNarrowDown color='#7E8BA2' /> : <HiArrowNarrowUp color='#7E8BA2' />) : ' '}
                                                        </FlexWrapper>
                                                    </th>
                                                ))
                                            }
                                        </tr>
                                    ))
                                }
                            </thead>
                            <tbody {...getTableBodyProps()}>
                                {
                                    page.map(row => {
                                        prepareRow(row)
                                        return (
                                            <tr {...row.getRowProps()} style={{ borderBottom: '1px solid #dbdbdb', fontSize: '14px' }}>
                                                {
                                                    row.cells.map((cell, index) => {
                                                        return <td key={index} {...cell.getCellProps} style={{ padding: '8px 16px' }}>{cell.render('Cell')}</td>
                                                    })
                                                }
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        <nav className="pagination is-centered is-rounded is-small mt-4 mb-2" role="navigation" aria-label="pagination">
                            <span className="pagination-previous" onClick={() => previousPage()} disabled={!canPreviousPage}>Previous page</span>
                            <span className="pagination-next" onClick={() => nextPage()} disabled={!canNextPage}>Next page</span>
                            <ul className="pagination-list">
                                <li>
                                    <span className="pagination-link" onClick={() => gotoPage(0)}>1</span>
                                </li>
                                <li>
                                    <span className="pagination-ellipsis">&hellip;</span>
                                </li>
                                <li>
                                    <span className="pagination-link" onClick={() => gotoPage(pageIndex - 1)} disabled={!canPreviousPage}>{pageIndex}</span>
                                </li>
                                <li>
                                    <span className="pagination-link is-current">{pageIndex + 1}</span>
                                </li>
                                <li>
                                    <span className="pagination-link" onClick={() => gotoPage(pageIndex + 1)} disabled={!canNextPage}>{pageIndex + 2}</span>
                                </li>
                                <li>
                                    <span className="pagination-ellipsis">&hellip;</span>
                                </li>
                                <li>
                                    <span className="pagination-link" onClick={() => gotoPage(pageCount - 1)}>{pageOptions.length}</span>
                                </li>
                            </ul>
                        </nav>
                        <strong>Page <strong>{pageIndex + 1} of {pageOptions.length}</strong></strong>
                    </>
                )}
        </>
    )
}

export default DataTable