export default function Button(props) {
    const {onClick } = props
    // console.log(process.env.REACT_APP_NOT_SECRET_CODE)
    return <button className="btn btn-primary" onClick={onClick}>Me localiser</button>
}

