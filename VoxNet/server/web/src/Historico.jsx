import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './styles/global.css';
import './styles/historico.css';

export default function Historico() {
	const [devices, setDevices] = useState([]);
	const [tests, setTests] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		async function carregar() {
			try {
				const resDevices = await fetch(
					"http://localhost:3001/devices",
				);
				const tableDevices = await resDevices.json();

				const resTests = await fetch("http://localhost:3001/tests");
				const tableTests = await resTests.json();

				setDevices(tableDevices);
				setTests(tableTests);
			} catch (err) {
				console.log("Não foi possível carregar as tabelas:", err);
			}
		}

		carregar();
	}, []);

	return (
		<div className="historico-container">
			<h1 id="title">HISTÓRICO DE DISPOSITIVOS E TESTES</h1>
			<h2>Dispositivos</h2>
			<table border="1" cellPadding="8" style={{ marginBottom: 30 }}>
				<thead>
					<tr>
						<th>ID</th>
						<th>Nome</th>
						<th>Endereço de IP</th>
						<th>Tipo</th>
					</tr>
				</thead>
				<tbody>
					{devices.map((d) => (
						<tr key={d.id}>
							<td>{d.id}</td>
							<td>{d.nome}</td>
							<td>{d.ip_address}</td>
							<td>{d.tipo}</td>
						</tr>
					))}
				</tbody>
			</table>

			<h2>Testes</h2>
			<table border="1" cellPadding="8">
				<thead>
					<tr>
						<th>ID</th>
						<th>ID do Dispositivo</th>
						<th>Estado</th>
						<th>Latência</th>
						<th>Hora da criação</th>
					</tr>
				</thead>
				<tbody>
					{tests.map((t) => (
						<tr key={t.id}>
							<td>{t.id}</td>
							<td>{t.device_id}</td>
							<td>{t.status}</td>
							<td>{t.latency}</td>
							<td>{t.tempo}</td>
						</tr>
					))}
				</tbody>
			</table>
			<button onClick={() => navigate("/")} type="button">
				Cadastrar Dispositivo
			</button>
		</div>
	);
}
