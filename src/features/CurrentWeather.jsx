import { useEffect, useState } from 'react'
import '../layout.css'
import { kelvinToCelsius } from '../utilities'
import WeatherLineDetail from './WeatherLineDetail'

export default function CurrentWeather(props) {
    const { data } = props
    const sunriseDate = new Date(data.sys.sunrise)

    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    const dateFormatee = sunriseDate.toLocaleDateString('fr-FR', options)
    console.log(dateFormatee)
    return (
        <>
            <div>
                {data !== null ? (
                    <div className="infos p-3">
                        {/* {data.dt} */}
                        <h2>{data?.name || 'Ville inconnue'}</h2>
                        <WeatherLineDetail label="LABEL" value="VALUE" />
                        {data.weather[0].description}
                        {
                            <img
                                src={
                                    'https://openweathermap.org/img/wn/' +
                                    data.weather[0].icon +
                                    '@2x.png'
                                }
                            />
                        }
                        <div>
                            <div>Lever du soleil : {data.sys.sunrise}</div>
                            <div>
                                Coucher du soleil : {data.sys.sunet ?? '---'}
                            </div>
                        </div>
                        <div>
                            <h3>Température :</h3>
                            <div>
                                Température :
                                {data.main.temp
                                    ? kelvinToCelsius(data.main.temp)
                                    : '---'}
                                °C
                            </div>
                            <div>
                                Ressentie :
                                {data.main.feels_like
                                    ? kelvinToCelsius(data.main.feels_like)
                                    : '---'}
                                °C
                            </div>
                            <div>
                                Pression atmospheric:
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

