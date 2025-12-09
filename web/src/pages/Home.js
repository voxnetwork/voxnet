import { useState } from "react";
import DeviceForm from "../components/DeviceForm";
import DeviceList from "../components/DeviceList";

export default function Home() {
    const [refresh, setRefresh] = useState(false);

    const handleRefresh = () => {
        setRefresh(!refresh);
    };

    return (
        <div>
            <h1>VoxNet - Monitor de Dispositivos</h1>
            <DeviceForm onSuccess={handleRefresh}/>
            <DeviceList key={refresh}/>
        </div>
    );
}