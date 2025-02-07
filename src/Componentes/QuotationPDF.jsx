import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";

// Estilos personalizados
const styles = StyleSheet.create({
  page: { padding: 20, fontSize: 10, fontFamily: "Helvetica", position: "relative" },
  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  logo: { width: 80 },
  footerImage: { position: "absolute", bottom: 0, left: 0, right: 0, height: 50 },
  section: { marginBottom: 10 },
  title: { fontSize: 14, fontWeight: "bold" },
  table: { width: "100%", marginTop: 10 },
  tableRow: { flexDirection: "row", borderBottom: "1px solid #ccc", padding: 5, backgroundColor: "#56C3CE" },
  tableHeader: { fontWeight: "bold", backgroundColor: "#f2f2f2" },
  tableCell: { flex: 1, textAlign: "center" },
  totalSection: { marginTop: 10, textAlign: "right" },
  infoSection: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  leftColumn: { width: "50%" },
  rightColumn: { width: "50%", textAlign: "right" },
});

const QuotationPdf = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Logo en la esquina superior izquierda */}
        <Image style={styles.logo} src="https://i.imgur.com/y18ao7s.png" />
        
        {/* Encabezado */}
        <View style={styles.header}>
          <View style={styles.rightColumn}>
            <Text style={styles.title}>Cotización #{data.id}</Text>
            <Text>Fecha: {new Date(data.fecha).toLocaleDateString()}</Text>
            <Text>Validez hasta: {new Date(data.fechaValidez).toLocaleDateString()}</Text>
          </View>
        </View>

        {/* Información del Cliente y Envío */}
        <View style={styles.infoSection}>
          <View style={styles.leftColumn}>
            <Text style={styles.title}>Cliente:</Text>
            <Text>ID: {data.cliente_id}</Text>
            <Text>Destino: {data.destino}</Text>
          </View>

          <View style={styles.rightColumn}>
            <Text style={styles.title}>Datos de Envío:</Text>
            <Text>Origen: {data.origen}</Text>
            <Text>Modo: {data.modo}</Text>
            <Text>Condición de Flete: {data.condicionFlete}</Text>
          </View>
        </View>

        {/* Tabla de Productos/Servicios */}
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCell}>Cant.</Text>
            <Text style={styles.tableCell}>Descripción</Text>
            <Text style={styles.tableCell}>Precio Unit.</Text>
            <Text style={styles.tableCell}>Total</Text>
          </View>
          {data.lineas.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.cant}</Text>
              <Text style={styles.tableCell}>{item.descripcion}</Text>
              <Text style={styles.tableCell}>${item.precioUnit.toFixed(2)}</Text>
              <Text style={styles.tableCell}>${item.totalLinea.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        {/* Totales */}
        <View style={styles.totalSection}>

          <Text>IVA: ${data.porcIva > 0 && <Text>MAS IVA</Text>}</Text>
          
          <Text style={{ fontWeight: "bold" }}>Total: ${data.subtotal.toFixed(2)}</Text>
        </View>

        {/* Términos y Condiciones */}
        <View style={styles.section}>
          <Text style={styles.title}>Términos y Condiciones</Text>
          <Text>{data.terminosCondiciones}</Text>
        </View>

        {/* Imagen de pie de página */}
        <Image style={styles.footerImage} src="https://imgur.com/a/D91OMT3.png" />
      </Page>
    </Document>
  );
};

export default QuotationPdf;
