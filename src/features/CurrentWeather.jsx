import { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import '../layout.css'
import { kelvinToCelsius } from '../utilities'

export default function CurrentWeather(props) {
    const { params,onHandleWeatherType } = props
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (params !== null) {
            const url = process.env.REACT_APP_WEATHER_MAP_BASE_URL
            setIsLoading(true)
            axios
                .get(url, { params })
                .then(function (response) {
                    {
                        console.log({ data: response.data })
                    }

                    if (response.status === 200) {
                        setData(response.data)
                        onHandleWeatherType(response.data.weather[0].main.toLowerCase())
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
        }
        // return () => {
        //   setParams(null)
        // }
    }, [params])

    return (
        <>
            <div>
                {isLoading && <Spinner />}
                {error && <div>{error.message}</div>}
                {data !== null ? (
                    <div className='infos p-3'>
                    {data.dt}
                    {data.weather[0].description}
                    {<img src={"https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"} />}
                    
                        <h2>
                            Météo sur la ville de :{' '}
                            {data?.name || 'Ville inconnue'}
                        </h2>
                        <div>
                            <h3>Température :</h3>
                            <div>
                                Température :{' '}
                                {data.main.temp
                                    ? kelvinToCelsius(data.main.temp)
                                    : '---'}{' '}
                                °C
                            </div>
                            <div>
                                Ressentie :{' '}
                                {data.main.feels_like
                                    ? kelvinToCelsius(data.main.feels_like)
                                    : '---'}{' '}
                                °C
                            </div>
                            <div>
                                Pression atmospheric:{' '}
                                {data.main.pressure ?? '---'} hPa
                            </div>
                            <div>Humidité: {data.main.humidity ?? '---'} %</div>
                        </div>
                        <div>
                            <h3>Vent:</h3>
                            <div>Vitesse : {data.wind.speed ?? '---'} m/s</div>
                            <div>Direction : {data.wind.deg ?? '---'} °</div>
                            <div>Rafale : {data.wind.guts ?? '---'} m/s</div>
                        </div>
                        <div>
                            <h3>Divers</h3>
                            <div>Nuages : {data.clouds.all ?? '---'}%</div>
                        </div>
                    </div>
                ) : (
                    'Aucune données trouvées'
                )}
            </div>
        </>
    )
}

