import Header from "./components/Header"
import Weather from "./features/Weather"
import "./layout.css"

export default function Layout() {
    return (
        <>
            <div className="main">
                    <Header />
                    <Weather />
            </div>
        </>
    )
}
