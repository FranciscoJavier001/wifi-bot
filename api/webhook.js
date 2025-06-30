export default async function handler(req, res) {
  const TELEGRAM_TOKEN = "7244092835:AAHkCrWGfXRhj4cZenxTIrAFeRcw2BxD3-A";
  const CHAT_ID = "8019447535";

  if (req.method === "POST") {
    const data = req.body;

    const message = `
🚨 *Nuevo dispositivo conectado*:
📱 Nombre: ${data.deviceName || 'Desconocido'}
💻 MAC: ${data.mac || 'No disponible'}
🕒 Hora: ${new Date().toLocaleTimeString()}
`;

    await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    return res.status(200).json({ status: "ok" });
  }

  res.status(405).json({ error: "Method not allowed" });
}
