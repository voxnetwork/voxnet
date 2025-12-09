import { useState } from "react";
import { createDevice } from "../api";

export default function DeviceForm({ onSuccess }) {
    const [nome, setNome] = useState("");
    const [ipAddress, setIpAddress] = useState("");
    const [tipo, setTipo] = useState("PC");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const device = { nome, ip_address: ipAddress, tipo };
        await createDevice(device);
        setNome("");
        setIpAddress("");
        setTipo("PC");
        if (onSuccess) onSuccess();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
            />
            <input
                placeholder="Endereço de IP"
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
                required
            />
            <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                <option value="">Selecione</option>
                <option value="PC">PC</option>
                <option value="roteador">Roteador</option>
                <option value="servidor">Servidor</option>
            </select>
            <button type="submit">Cadastrar</button>
        </form>
    );
}
