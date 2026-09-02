import React, { useState, useEffect } from 'react';
import ClientForm from './ClientForm';
import ClientTable from './ClientTable';
import './Dashboard.css';

export default function Dashboard() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/saas_tenants?select=*`,
        {
          headers: {
            apikey: import.meta.env.VITE_SUPABASE_KEY,
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      setClients(data || []);
    } catch (error) {
      setMessage(`Error cargando clientes: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAddClient = async (clientData) => {
    setLoading(true);
    setMessage('Creando cliente...');

    try {
      // 1. Crear tenant en Supabase
      const tenantResponse = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/saas_tenants`,
        {
          method: 'POST',
          headers: {
            apikey: import.meta.env.VITE_SUPABASE_KEY,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nombre_negocio: clientData.nombre_negocio,
            correo: clientData.correo,
            telefono_dueno: clientData.telefono_dueno,
            cfg_descripcion: clientData.cfg_descripcion,
            cfg_productos: clientData.cfg_productos,
            cfg_faqs: clientData.cfg_faqs,
            cfg_tono: clientData.cfg_tono,
            cfg_horario: clientData.cfg_horario,
            activo: true,
            plan: 'saas',
            limite_conversaciones: 1000,
            cfg_model: 'claude-haiku-4-5-20251001',
            stripe_customer_id: clientData.stripe_customer_id || null,
          }),
        }
      );

      if (!tenantResponse.ok) {
        throw new Error('Error creando tenant en Supabase');
      }

      const newTenant = await tenantResponse.json();
      const tenantId = newTenant[0]?.id;

      // 2. Crear número en Meta
      const numberResponse = await fetch(
        `${import.meta.env.VITE_N8N_ENDPOINT}/crear-numero-meta`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tenant_id: tenantId,
            nombre_visible: clientData.nombre_negocio,
            waba_id: import.meta.env.VITE_WABA_ID,
          }),
        }
      );

      const numberData = await numberResponse.json();

      // 3. Actualizar tenant con phone_number_id
      if (numberData.phone_number_id) {
        await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/saas_tenants?id=eq.${tenantId}`,
          {
            method: 'PATCH',
            headers: {
              apikey: import.meta.env.VITE_SUPABASE_KEY,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              whatsapp_phone_number_id: numberData.phone_number_id,
              whatsapp_numero: numberData.phone_number,
            }),
          }
        );
      }

      setMessage(
        `✅ Cliente "${clientData.nombre_negocio}" creado exitosamente. Número: ${numberData.phone_number || 'Pendiente'}`
      );
      loadClients();
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <header className="header">
        <h1>🚀 Panel Admin - WhatsApp SaaS</h1>
        <p>Gestiona tus clientes y números WhatsApp</p>
      </header>

      {message && (
        <div className={`message ${message.startsWith('✅') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <div className="container">
        <div className="form-section">
          <h2>Agregar Nuevo Cliente</h2>
          <ClientForm onSubmit={handleAddClient} disabled={loading} />
        </div>

        <div className="table-section">
          <h2>Clientes Activos ({clients.length})</h2>
          {loading ? (
            <p>Cargando...</p>
          ) : (
            <ClientTable clients={clients} onRefresh={loadClients} />
          )}
        </div>
      </div>
    </div>
  );
}
