import React from 'react';

export default function ClientTable({ clients, onRefresh }) {
  const toggleClient = async (id, activo) => {
    try {
      await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/saas_tenants?id=eq.${id}`,
        {
          method: 'PATCH',
          headers: {
            apikey: import.meta.env.VITE_SUPABASE_KEY,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ activo: !activo }),
        }
      );
      onRefresh();
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  if (!clients || clients.length === 0) {
    return <p className="empty-state">No hay clientes aún. Crea uno para empezar.</p>;
  }

  return (
    <table className="client-table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Número WhatsApp</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {clients.map((client) => (
          <tr key={client.id}>
            <td>{client.nombre_negocio}</td>
            <td>{client.correo}</td>
            <td>{client.whatsapp_numero || 'Pendiente'}</td>
            <td>
              <span className={`status ${client.activo ? 'active' : 'inactive'}`}>
                {client.activo ? '✅ Activo' : '❌ Inactivo'}
              </span>
            </td>
            <td>
              <button
                onClick={() => toggleClient(client.id, client.activo)}
                className="btn-toggle"
              >
                {client.activo ? 'Desactivar' : 'Activar'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
