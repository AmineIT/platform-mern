import React from 'react'
import { ImagePlaceholder, FlexWrapper, ShortenName, Name } from './style'

export const COLUMNS = [
    {
        Header: 'Candidate',
        accessor: 'fullName',
        Cell: ({ row }) => {
            const { original } = row
            const name = original.fullName.split(' ').map(item => { return item[0] }).join('')
            return (
                <FlexWrapper>
                    {
                        original.profileImage === '' ? (
                            <ImagePlaceholder className='mr-4'>
                                <ShortenName>{name}</ShortenName>
                            </ImagePlaceholder>
                        ) : (
                                <figure className="image is-38x38 mr-4">
                                    <img className='is-rounded' style={{ width: '38px', height: '38px' }} src={`http://localhost:5000/${original.profileImage}`} alt="Profile" />
                                </figure>
                            )
                    }
                    <Name>
                        {original.fullName}
                    </Name>
                </FlexWrapper>
            )
        }
    },
    {
        Header: 'Email',
        accessor: 'email'
    },
    {
        Header: 'Job role',
        accessor: 'currentJobRole'
    },
    {
        Header: 'Phone Number',
        accessor: 'phoneNumber'
    },
    {
        Header: 'Location',
        accessor: 'country',
        Cell: ({ row }) => {
            const { original } = row
            return (
                original.city === '' || original.country === '' ? 'Not montioned' : <p>{original.city}, {original.country}</p>
            )
        }
    }
]