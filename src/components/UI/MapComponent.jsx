import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const MapComponent = () => {
   const position = [51.505, -0.09] // Координаты местоположения на карте

   return (
      <MapContainer
         center={position}
         zoom={13}
         style={{ height: '400px', width: '100%' }}
      >
         <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
         />
         <Marker position={position}>
            <Popup>
               Бишкек
               <br />
               Дополнительная информация.
            </Popup>
         </Marker>
      </MapContainer>
   )
}

export default MapComponent
