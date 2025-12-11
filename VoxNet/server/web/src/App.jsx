import { useState } from "react";
import { Routes, Route, useNavigate, data } from "react-router-dom";
import Historico from "./Historico";
import './styles/global.css';
import './styles/historico.css'

function App() {
	const [nome, setNome] = useState("");
	const [ip_address, setIp_address] = useState("");
	const [tipo, setTipo] = useState("");
	const navigate = useNavigate();

	function handleRegister(e) {
    e.preventDefault();

    fetch("http://localhost:3001/devices", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nome,
            ip_address,
            tipo,
        }),
    })
        .then(async (res) => {
            let data = null;

            try {
                data = await res.json();
            } catch {
                data = null;
            }

            if (!res.ok) {
                alert("Erro: " + (data?.erro || "Erro desconhecido"));
                console.error("Erro recebido do backend:", data);
                return;
            }

            alert(data.aviso);

            setNome("");
            setIp_address("");
            setTipo("");
        })
        .catch((err) => {
            alert("Erro de rede (backend caiu, porta errada ou CORS). Veja o console.");
            console.error("Erro de rede:", err);
        });
}



	return (
		<Routes>
			<Route
				path="/"
				element={
					<>
						<div id="header">
							<h1> VOXNET </h1>
							<h6> Monitoramento de Dispositos da Rede  </h6>
						</div>
						<div id="voxnet-form">
							<h2>Cadastre seu dispositivo e conecte-se à rede! </h2>
							<form>
								<label>
									Nome do dispositivo:
									<input
										type="text"
										value={nome}
										onChange={(e) => setNome(e.target.value)}
									/>
								</label>
								<label>
									Endereço de IP:
									<input
										type="text"
										value={ip_address}
										onChange={(e) => setIp_address(e.target.value)}
									/>
								</label>
								<label>
									Tipo do dispositivo:
									<input
										type="text"
										value={tipo}
										onChange={(e) => setTipo(e.target.value)}
									/>
								</label>
								<input type="submit" id="submit" onClick={handleRegister} />
								<h10> Confie à nós o seu dispositivo :) </h10>
							</form>
						</div>
						<button onClick={() => navigate("/historico")} type="button">
							Histórico
						</button>
					</>
				}
			/>
			<Route path="/Historico" element={<Historico />} />
		</Routes>
	);
}

export default App;
