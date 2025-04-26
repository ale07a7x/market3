import { MercadoPagoConfig, Preference } from 'mercadopago';

// Configuración de MercadoPago
const mp = new MercadoPagoConfig({
  accessToken: "APP_USR-2024774855283120-042610-fd8236e843ef5f0208ebf6d78e06daa8-2410909824"
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const items = req.body.items;
    const nombreComprador = req.body.nombre;

    const preference = {
      items: items.map(item => ({
        title: item.nombre,
        quantity: item.cantidad,
        unit_price: item.subtotal / item.cantidad,
        currency_id: 'ARS'
      })),
      payer: {
        name: nombreComprador
      },
      back_urls: {
        success: 'https://market2-d8dj.vercel.app/success',
        failure: 'https://tuweb.com/failure',
        pending: 'https://tuweb.com/pending'
      },
      auto_return: 'approved'
    };

    const client = new Preference(mp);
    const response = await client.create({ body: preference });

    res.status(200).json({ id: response.id, init_point: response.init_point });

  } catch (error) {
    console.error('Error al crear preferencia:', error);
    res.status(500).json({ error: 'Error al crear preferencia' });
  }
}
