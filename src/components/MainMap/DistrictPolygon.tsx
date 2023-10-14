import {Polygon, Popup} from "react-leaflet";

interface Props {
    coordinates: [number,number][]
    properties:{
        title:string
    }
}

const DistrictPolygon:React.FC<Props> = ({
                                         coordinates,
                                         properties
                                         }) => {
    return (
        <Polygon positions={coordinates}>
            <Popup>
                {properties.title}
            </Popup>
        </Polygon>
    )

}

export {DistrictPolygon}