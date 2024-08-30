import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function Info() {
    const params = useParams()
    const id = params.countryname
    const navigate = useNavigate()
    const [country, setCountry] = useState({})
    const [error, setError] = useState(false)
    const getInfo = async (id) => {
        try {
            const response = await fetch('https://restcountries.com/v3.1/name/' + id)
            const data = await response.json()
            console.log(data)
            if (data.message === 'Not Found') {
                setError(true)
            } else {
                setCountry({...data[0]})
            }
        } catch (err) {
            console.log(err)
            setError(true)
        }
    }

    const handleClick = () => {
        navigate('/')
    }

    useEffect(() => {
        getInfo(id)
    }, [])

    return <div className='m-5 p-5 border border-dark'>
        <button className='mb-2 btn btn-dark' onClick={handleClick}>Back</button>
            {country.name && <div>
                <h3>{country.name.common}</h3>
                {country.capital && country.capital.length > 0 && <p>Capital: {country.capital[0]}</p>}
                {country.flags.png && <img className='border border-dark' src={country.flags.png}></img>}
            </div>}
            {!country.name && !error && <div className='m-3 spinner-border' role='status'>
                <span className='visually-hidden'>Loading...</span>
            </div>}
            {error && <p>Couldn't find country</p>}
        </div>
}

export default Info