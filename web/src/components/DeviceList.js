import { useEffect, useState } from "react";
import { getDevices } from "../api";

export default function DeviceList() {
    const [devices, setDevices] = useState([]);

    const fetchDevices = async () => {
        const data = await getDevices();
        setDevices(data);
    };

    useEffect(() => {
        fetchDevices();
    }, []);

    return (
        <div>
            <h2>Dispositivos</h2>
            <ul>
                {devices.map((d) => (
                    <li key={d.id}>
                        {d.nome} - {d.ip_address} - {d.tipo}
                    </li>
                ))}
            </ul>
        </div>
    );
}