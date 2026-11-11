/**
 * =====================================================================
 * CÓDIGO PARA VINCULAR LA INVITACIÓN CON GOOGLE SHEETS
 * =====================================================================
 * 
 * PASO 1: Crea una hoja nueva en Google Sheets (sheets.new).
 * PASO 2: En la primera fila (Fila 1), coloca los siguientes títulos:
 *   - A1: Fecha y Hora Registro
 *   - B1: Nombre del Invitado
 *   - C1: ¿Asistirá?
 *   - D1: Cantidad de Pases
 *   - E1: Teléfono / WhatsApp
 *   - F1: Mensaje para Amelia
 * 
 * PASO 3: En el menú superior de Google Sheets, entra a:
 *   Extensiones > Apps Script
 * 
 * PASO 4: Borra todo el código que aparezca y pega este código completo:
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = {};

    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter;
      }
    } else if (e.parameter) {
      data = e.parameter;
    }

    // Inserta una nueva fila con la respuesta
    sheet.appendRow([
      new Date().toLocaleString('es-PA', { timeZone: 'America/Panama' }),
      data.name || '',
      data.attending === 'yes' ? 'SÍ ASISTIRÁ' : 'NO ASISTIRÁ',
      data.attending === 'yes' ? (data.guests || '1') : '0',
      data.phone || '',
      data.message || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * PASO 5: Haz clic en el botón azul superior: "Implementar" > "Nueva implementación".
 * PASO 6: En el engranaje  a la izquierda selecciona "Aplicación web".
 * PASO 7: Configura:
 *   - Descripción: "RSVP Amelia"
 *   - Ejecutar como: "Yo" (tu cuenta)
 *   - Quién tiene acceso: "Cualquier persona" (Anyone)  <--- ¡MUY IMPORTANTE!
 * PASO 8: Presiona "Implementar", autoriza los permisos de Google, y copia la URL generada.
 * PASO 9: Pega esa URL en el archivo `src/config.js` dentro de `googleSheetsWebhookUrl`.
 */
