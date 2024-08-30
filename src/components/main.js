import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'

function Main() {
    const [list, setList] = useState([])
    const [search, setSearch] = useState('')

    const navigate = useNavigate()

    const getCountries = async () => {
        try {
            const response = await fetch('https://restcountries.com/v3.1/all')
            const data = await response.json()
            const names = data.map(elem => elem.name.common)
            names.sort()
            setList([...names])
        } catch (err) {
            console.log(err)
        }
    }


    const handleClick = async (e) => {
        const id = e.target.id
        navigate('info/' + id)
    }

    const changeSearch = (e) => {
        const text = e.target.value.toLowerCase()
        setSearch(text)
    }

    useEffect(() => {
        getCountries()
    }, [])

    return (
        <>
        <input placeholder='Enter country name...' className='m-3' onChange={changeSearch}></input>
        {list.length > 0 && <div className='d-flex flex-column flex-wrap'>
            {list.map((elem) => {
                return elem.toLowerCase().includes(search) ? <button id={elem} key={elem} className='btn btn-info m-3 country-button' onClick={handleClick}>{elem}</button> : ''
            })}
        </div>}
        {list.length === 0 && <p className='m-3'>Something went wrong...</p>}
        </>
    )
}

export default Main