import React, { useState } from 'react';

export default function ClientForm({ onSubmit, disabled }) {
  const [formData, setFormData] = useState({
    nombre_negocio: '',
    correo: '',
    telefono_dueno: '',
    cfg_descripcion: '',
    cfg_productos: '',
    cfg_faqs: '',
    cfg_tono: '',
    cfg_horario: '',
    stripe_customer_id: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre_negocio || !formData.correo) {
      alert('Nombre y correo son obligatorios');
      return;
    }
    onSubmit(formData);
    setFormData({
      nombre_negocio: '',
      correo: '',
      telefono_dueno: '',
      cfg_descripcion: '',
      cfg_productos: '',
      cfg_faqs: '',
      cfg_tono: '',
      cfg_horario: '',
      stripe_customer_id: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="client-form">
      <div className="form-row">
        <input
          type="text"
          name="nombre_negocio"
          placeholder="Nombre del negocio *"
          value={formData.nombre_negocio}
          onChange={handleChange}
          required
          disabled={disabled}
        />
        <input
          type="email"
          name="correo"
          placeholder="Correo *"
          value={formData.correo}
          onChange={handleChange}
          required
          disabled={disabled}
        />
      </div>

      <div className="form-row">
        <input
          type="text"
          name="telefono_dueno"
          placeholder="Teléfono del dueño (para escalaciones)"
          value={formData.telefono_dueno}
          onChange={handleChange}
          disabled={disabled}
        />
        <input
          type="text"
          name="stripe_customer_id"
          placeholder="Stripe Customer ID (opcional)"
          value={formData.stripe_customer_id}
          onChange={handleChange}
          disabled={disabled}
        />
      </div>

      <textarea
        name="cfg_descripcion"
        placeholder="Descripción del negocio"
        value={formData.cfg_descripcion}
        onChange={handleChange}
        disabled={disabled}
        rows="3"
      />

      <textarea
        name="cfg_productos"
        placeholder="Productos y servicios (con precios)"
        value={formData.cfg_productos}
        onChange={handleChange}
        disabled={disabled}
        rows="3"
      />

      <textarea
        name="cfg_faqs"
        placeholder="Preguntas frecuentes"
        value={formData.cfg_faqs}
        onChange={handleChange}
        disabled={disabled}
        rows="2"
      />

      <div className="form-row">
        <input
          type="text"
          name="cfg_tono"
          placeholder="Tono de voz (ej: amable, profesional)"
          value={formData.cfg_tono}
          onChange={handleChange}
          disabled={disabled}
        />
        <input
          type="text"
          name="cfg_horario"
          placeholder="Horario y ubicación"
          value={formData.cfg_horario}
          onChange={handleChange}
          disabled={disabled}
        />
      </div>

      <button type="submit" disabled={disabled}>
        {disabled ? 'Procesando...' : '➕ Crear Cliente'}
      </button>
    </form>
  );
}
