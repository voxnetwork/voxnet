const API_URL = "http://localhost:3000/devices";

export async function getDevices() {
    const res = await fetch(API_URL);
    return res.json();
}

export async function createDevice(device) {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(device),
    });
    return res.json();
}
