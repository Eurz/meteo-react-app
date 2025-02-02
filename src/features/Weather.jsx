import { useEffect, useState } from 'react'
import Button from '../components/Button'
import CurrentWeather from './CurrentWeather'
import ForecastWeather from './ForecastWeather'
import axios from 'axios'
import Spinner from '../components/Spinner'

export default function Weather() {
    const [localisation, setLocalisation] = useState(null)
    const [weatherType, setWeatherType] = useState('default-weather')

    const [data, setData] = useState({ weather: null, forecast: null })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const onHandleData = (e) => {
        if ('geolocation' in navigator) {
            /* geolocation is available */
            navigator.geolocation.getCurrentPosition((position) => {
                setLocalisation({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                    appid: process.env.REACT_APP_WEATHER_MAP_APP_ID,
                    lang: 'fr',
                })
            })
        } else {
            /* geolocation IS NOT available */
            alert('Geolocation is not ok')
        }
    }
    useEffect(() => {
        if (localisation !== null) {
            const url = process.env.REACT_APP_WEATHER_MAP_BASE_URL
            setIsLoading(true)
            axios
                .get(url + '/weather', { params: localisation })
                .then(function (response) {
                    if (response.status === 200) {
                        const currentData = Object.assign(data, {
                            weather: response.data,
                        })
                        setData(currentData)
                        setWeatherType(
                            response.data.weather[0].main.toLowerCase()
                        )
                        console.log(data)
                    }
                    // handle success
                })
                .catch(function (error) {
                    setError(error)
                    console.log({ error })
                })
                .finally(function () {
                    setIsLoading(false)
                })

            // axios
            //     .get(url + '/forecast', { params: localisation })
            //     .then(function (response) {
            //         if (response.status === 200) {
            //             const forecastData = Object.assign(data, {
            //                 forecast: response.data,
            //             })
            //             setData(forecastData)
            //             setWeatherType(
            //                 response.data.weather[0].main.toLowerCase()
            //             )
            //         }
            //         // handle success
            //     })
            //     .catch(function (error) {
            //         setError(error)
            //         console.log({ error })
            //     })
            //     .finally(function () {
            //         setIsLoading(false)
            //     })
        }
        // return () => {
        //   setParams(null)
        // }
    }, [localisation])
    return (
        <>
            <div className={'current-weather p-3 ' + weatherType.toLowerCase()}>
                <div className="row g-3 align-items-center mb-3">
                    <div className="col-8">
                        <input
                            type="text"
                            placeholder="Saisissez le nom d'une ville"
                            className="form-control"
                        />
                    </div>

                    <div className="col">
                        <Button label="Chercher" onClick={onHandleData} />
                    </div>

                    <div className="col-2">
                        <Button label="Me localiser" onClick={onHandleData} />
                    </div>
                </div>
                {isLoading && <Spinner />}
                {error && <div>{error.message}</div>}
                {data.weather !== null && (
                    <>
                        <CurrentWeather data={data.weather} />
                    </>
                )}
            </div>
            <div className="forecast-weather p-3">
                <ForecastWeather localisation={localisation} />
            </div>
        </>
    )
}

