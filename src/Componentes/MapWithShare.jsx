import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { FaMapMarkerAlt, FaWaze, FaWhatsapp } from "react-icons/fa";

// Crear un icono personalizado para el marcador
const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/252/252025.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const MapWithShare = ({ address }) => {
  const [coordinates, setCoordinates] = useState(null);
  const [error, setError] = useState(null);

  // Función para buscar las coordenadas usando Nominatim
  useEffect(() => {
    if (!address) return;

    const fetchCoordinates = async () => {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        address
      )}&countrycodes=uy`;

      try {
        const response = await fetch(url, {
          headers: {
            "User-Agent": "TuAplicacion/1.0 (tu_email@ejemplo.com)",
          },
        });
        const data = await response.json();

        if (data.length > 0) {
          const { lat, lon } = data[0];
          setCoordinates({ lat: parseFloat(lat), lon: parseFloat(lon) });
          setError(null);
        } else {
          setCoordinates(null);
          setError("No se encontraron resultados para la dirección proporcionada.");
        }
      } catch (err) {
        console.error("Error al buscar coordenadas:", err);
        setError("Error al buscar coordenadas. Intenta nuevamente.");
      }
    };

    fetchCoordinates();
  }, [address]);

  // Función para manejar el compartir en distintas plataformas
  const handleShare = (platform) => {
    if (!coordinates) return;

    const { lat, lon } = coordinates;
    const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lon}`;
    const wazeUrl = `https://www.waze.com/ul?ll=${lat},${lon}&navigate=yes`;
    const whatsappUrl = `https://wa.me/?text=Ubicación:%20${lat},${lon}%20Ver%20en%20Google%20Maps:%20${encodeURIComponent(
      googleMapsUrl
    )}`;

    switch (platform) {
      case "google":
        window.open(googleMapsUrl, "_blank");
        break;
      case "waze":
        window.open(wazeUrl, "_blank");
        break;
      case "whatsapp":
        window.open(whatsappUrl, "_blank");
        break;
      default:
        console.error("Plataforma no soportada");
    }
  };

  return (
    <div>
      <p><strong>Dirección:</strong> {address}</p>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {coordinates ? (
        <>
          <MapContainer
            center={[coordinates.lat, coordinates.lon]}
            zoom={14}
            style={{ height: "300px", width: "300px" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[coordinates.lat, coordinates.lon]} icon={customIcon}>
              <Popup>Ubicación: {address}</Popup>
            </Marker>
          </MapContainer>

          <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
      {/* Botón para Google Maps */}
          <button
            onClick={() => handleShare("google")}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px",
              border: "none",
              backgroundColor: "#4285F4",
              color: "white",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            <FaMapMarkerAlt size="20px" color="white" style={{ marginRight: "8px" }} />
            Maps
          </button>

          {/* Botón para Waze */}
          <button
            onClick={() => handleShare("waze")}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px",
              border: "none",
              backgroundColor: "#2DB4E5",
              color: "white",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            <FaWaze size="20px" color="white" style={{ marginRight: "8px" }} />
            Waze
          </button>

          {/* Botón para WhatsApp */}
          <button
            onClick={() => handleShare("whatsapp")}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px",
              border: "none",
              backgroundColor: "#25D366",
              color: "white",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            <FaWhatsapp size="20px" color="white" style={{ marginRight: "8px" }} />
            WhatsApp
          </button>
    </div>
        </>
      ) : (
        !error && <p>Buscando coordenadas...</p>
      )}
    </div>
  );
};

export default MapWithShare;
