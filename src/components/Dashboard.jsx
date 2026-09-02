import { useState } from 'react';

export default function Dashboard() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <h2>Gestión de Clientes WhatsApp</h2>
      <p>Panel de administración listo</p>
    </div>
  );
}
