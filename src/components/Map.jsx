import { Map, Marker } from "pigeon-maps"

export default function MyMap({lat, long}) {
    return (
        <Map height={400} width={800} defaultCenter={[lat, long]} defaultZoom={15}>
            <Marker width={50} anchor={[lat, long]} />
        </Map>
    )
}
