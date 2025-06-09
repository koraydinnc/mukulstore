import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setAddressInfo } from "@/store/slices/cartSlice";

const AddressForm = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setAddressInfo(form));
    alert("Adres bilgileri kaydedildi!");
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "2rem auto", display: "flex", flexDirection: "column", gap: 12 }}>
      <input
        name="firstName"
        placeholder="Ad"
        value={form.firstName}
        onChange={handleChange}
        required
      />
      <input
        name="lastName"
        placeholder="Soyad"
        value={form.lastName}
        onChange={handleChange}
        required
      />
      <input
        name="phone"
        placeholder="Telefon"
        value={form.phone}
        onChange={handleChange}
        required
        type="tel"
      />
      <input
        name="email"
        placeholder="E-posta"
        value={form.email}
        onChange={handleChange}
        required
        type="email"
      />
      <textarea
        name="address"
        placeholder="Adres"
        value={form.address}
        onChange={handleChange}
        required
        rows={3}
      />
      <button type="submit" style={{ padding: 8, background: "#2563eb", color: "white", border: 0, borderRadius: 4 }}>
        Kaydet
      </button>
    </form>
  );
};

export default AddressForm;
