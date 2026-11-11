// Configuración general del evento y guardado de datos
export const EVENT_CONFIG = {
  girlName: "Amelia",
  eventTitle: "Mis 15 Años",
  dateString: "21 de Noviembre, 2026",
  timeString: "8:00 PM",
  locationName: "Casa de Amelia",
  locationAddress: "Barriada San Judas Tadeo calle 3ra",
  locationCoordinates: {
    lat: 7.9284008,
    lng: -80.4133545
  },
  googleMapsUrl: "https://www.google.com/maps/place/Casa+de+Amelia/@7.9284008,-80.4133545,17z/data=!4m8!3m7!1s0x8fad9300287b2811:0x2355b2a34a285120!8m2!3d7.9284008!4d-80.4133545",
  wazeUrl: "https://waze.com/ul?ll=7.9284008,-80.4133545&navigate=yes",
  targetDate: "2026-11-21T20:00:00",

  // Webhook de Google Sheets para registrar respuestas en tiempo real
  // Pega aquí la URL generada al implementar tu Apps Script
  googleSheetsWebhookUrl: "https://script.google.com/macros/s/AKfycbwlCioDTC1A8FUQmfFXCRDt7n27bme9xWj2zWdi5y8g3zahTSjWf8b_MFNrqwaillvX/exec",

  // (Opcional) Número de WhatsApp para recibir las confirmaciones directamente (formato internacional sin signos, ej: 50761234567)
  whatsappPhoneNumber: "",
};
