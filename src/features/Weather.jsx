import { useState } from 'react'
import Button from '../components/Button'
import CurrentWeather from './CurrentWeather'
import ForecastWeather from './ForecastWeather'
import { use } from 'react'

export default function Weather() {
    const [params, setParams] = useState(null)
    const [weatherType,setWeatherType] = useState('default-weather')

    const onHandleClick = (e) => {
        if ('geolocation' in navigator) {
            /* geolocation is available */
            navigator.geolocation.getCurrentPosition((position) => {
                setParams({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                    appid: process.env.REACT_APP_WEATHER_MAP_APP_ID,
                    lang : 'fr'
                })
            })
        } else {
            /* geolocation IS NOT available */
            alert('Geolocatio is not Not ok')
        }
    }

    return (
        <> 
            <div className={"current-weather p-3 " + weatherType.toLowerCase()}>
                <div className="row g-3 align-items-center mb-3">
                    <div className="col-8">
                        <input
                            type="text"
                            placeholder="Saisissez le nom d'une ville"
                            className="form-control"
                        />
                    </div>

                    <div className="col">
                        <Button label="Chercher" onClick={onHandleClick} />
                    </div>

                    <div className="col-2">
                        <Button label="Me localiser" onClick={onHandleClick} />
                    </div>
                </div>

                <CurrentWeather params={params} onHandleWeatherType={setWeatherType} />
            </div>
            <div className="forecast-weather p-3">
            <ForecastWeather params={params} />
            </div>
                
        </>
    )
}

