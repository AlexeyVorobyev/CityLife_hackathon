import {EditControl} from "react-leaflet-draw";
import {Controller} from "react-hook-form";
import {FeatureGroup, GeoJSON} from "react-leaflet";
import {v4 as uuidv4} from 'uuid';
import React, {useCallback} from "react";
import {useNavigate} from "react-router-dom";

export interface IDataPolygon {
    id: string
    geometry: GeoJSON.Polygon
}

interface Value {
    geoData:IDataPolygon | null
}
interface Props {
    name:string
    defaultValue: Value | null
}

const MapDrawPolygon:React.FC<Props> = ({
                                    name,
                                    defaultValue,
                                    }) => {

    const navigate = useNavigate()

    const leafletId = uuidv4();
    const _onCreate = (e: any, value:Value,onChange:Function) => {
        const {layerType, layer} = e;
        if (layerType === "polygon") {
            const coordinates = layer._latlngs[0].map((val: any) => [val.lat, val.lng])
            onChange({
                ...value,
                geoData:{id: leafletId, geometry: {type: "Polygon", coordinates: coordinates}}
            } as Value)
        }
    };

    const _onEdited = (e: any,value:Value,onChange:Function) => {
        const {
            layers: {_layers}
        } = e;

        Object.values(_layers).map(({editing}: any) => {
            const coordinates = editing.latlngs[0][0].map((val: any) => [val.lat, val.lng])
            onChange({
                ...value,
                geoData:{id: leafletId, geometry: {type: "Polygon", coordinates: coordinates}}
            } as Value)
        });
    };


    const _onDeleted = (event:any,onChange:Function) => {
        console.log(event)
        onChange(null)
        navigate('/')
    };

    return (
        <Controller
            name={name}
            defaultValue={defaultValue}
            render={({field:{onChange,value}}) => {
                return (
                    <FeatureGroup>
                        <EditControl
                            position="topright"
                            onCreated={(event) => _onCreate(event,value,onChange)}
                            onEdited={(event) => _onEdited(event,value,onChange)}
                            onDeleted={(event) => _onDeleted(event,onChange)}
                            draw={{
                                rectangle: false,
                                polygon:value === null,
                                polyline: false,
                                circle: false,
                                circlemarker: false,
                                marker: false
                            }}
                        />
                    </FeatureGroup>
                )
            }}/>
    )
}

export {MapDrawPolygon}