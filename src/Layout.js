import DailyWeather from "./features/DailyWeather"
import "./layout.css"

export default function Layout() {
    return (
        <>
            <div className="main">
                    <div className="header bg-primary">
                        <h1>MeteoApp</h1>
                    </div>
                    <DailyWeather />
                    <div className="right bg-success p-3">Prévision sur 5 jour!!!</div>
            </div>
        </>
    )
}
