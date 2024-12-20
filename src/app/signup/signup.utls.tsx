import type { NextApiRequest, NextApiResponse } from "next";

export function RegistrationForm() {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);

        const payload = {
            firstname: formData.get("firstname"),
            lastname: formData.get("lastname"),
            email: formData.get("email"),
            password: formData.get("password"),
        };

        await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="firstname" placeholder="First Name" required />
            <input name="lastname" placeholder="Last Name" required />
            <input name="email" type="email" placeholder="Email" required />
            <input name="password" type="password" placeholder="Password" required />
            <button type="submit">Register</button>
        </form>
    );
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(405).send("Method not allowed");

    const { firstname, lastname, email, password } = req.body;

    try {
        // Step 1: Hash the password
        // const hashedPassword = await bcrypt.hash(password, 10);

        // Step 2: Create Mifos Client
        const clientResponse = await fetch("http://localhost:8080/fineract-provider/api/v1/clients", {
            method: "POST",
            headers: {
                Authorization: `Basic ${btoa("admin:adminPassword")}`,
                "Fineract-Platform-TenantId": "default",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                officeId: 1,
                firstname,
                lastname,
                activationDate: ["2024", "1", "15"],
                locale: "en",
                dateFormat: "dd MMMM yyyy",
            }),
        });

        if (!clientResponse.ok) throw new Error("Failed to create client in Mifos");

        const clientData = await clientResponse.json();
        const clientId = clientData.clientId;

        // Step 3: Create Mifos Self-Service User
        const userResponse = await fetch("http://localhost:8080/fineract-provider/api/v1/users", {
            method: "POST",
            headers: {
                Authorization: `Basic ${btoa("admin:adminPassword")}`,
                "Fineract-Platform-TenantId": "default",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: email,
                password,
                repeatPassword: password,
                firstname,
                lastname,
                email,
                officeId: 1,
                roles: [{ id: 1 }], // Maker role
                sendPasswordToEmail: false,
            }),
        });

        if (!userResponse.ok) throw new Error("Failed to create user in Mifos");

        res.status(201).json({ message: "User registered successfully", clientId });
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error message:", error.message);
            res.status(500).json({ error: error.message });
        } else {
            console.error("Unknown error:", error);
        }
    }
}

