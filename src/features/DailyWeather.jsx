import { useEffect, useState } from 'react'
import Button from '../components/Button'
import axios from 'axios'

function CurrentWeather(props) {
    console.log({ data: props.data })
    const { data } = props

    return (
        <div>
            <h2>Météo sur la ville de : {data?.name || 'Ville inconnue'}</h2>
            <div>
                <h3>Température:</h3>
                <div>Température: {data.main.temp ?? '---'} K</div>
                <div>Ressentie: {data.main.feels_like ?? '---'} K</div>
                <div>Pression atmospheric: {data.main.pressure ?? '---'} K</div>
                <div>Humidité: {data.main.humidity ?? '---'} K</div>
            </div>
            <div>
                <h3>Vent:</h3>
                <div>Vitesse: {data.wind.speed ?? '---'} m/s</div>
                <div>Direction: {data.wind.deg ?? '---'} °</div>
                <div>Rafale: {data.wind.guts ?? '---'} m/s</div>
            </div>
            <div>
                <h3>Divers</h3>
                <div>Nuages: {data.clouds.all ?? '---'}%</div>
            </div>
        </div>
    )
}

export default function DailyWeather() {
    const [params, setParams] = useState(null)
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const onHandleClick = (e) => {
        if ('geolocation' in navigator) {
            /* geolocation is available */
            navigator.geolocation.getCurrentPosition((position) => {
                setParams({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                    appid: process.env.REACT_APP_WEATHER_MAP_APP_ID,
                })
            })
        } else {
            /* geolocation IS NOT available */
            alert('Geolocatio is not Not ok')
        }
    }

    useEffect(() => {
        if (params !== null) {
            const url = process.env.REACT_APP_WEATHER_MAP_BASE_URL
            setIsLoading(true)
            axios
                .get(url, { params })
                .then(function (response) {
                    if (response.status === 200) {
                        setData(response.data)
                    }
                    // handle success
                })
                .catch(function (error) {
                    setError(error)
                    console.log({error})
                })
                .finally(function () {
                    setIsLoading(false)
                })

        }
        // return () => {
        //   setParams(null)
        // }
    }, [params])

    return (
        <div className='left p-3'>
            <div>
                <input type="text" placeholder="Saisissez le nom d'une ville" />
                <Button onClick={onHandleClick} />
            </div>

            {isLoading && <div>Chargement en cours...</div>}
            {error && <div>{error.message}</div>}
            {data !== null && <CurrentWeather data={data} />}
        </div>
    )
}

