import { useState } from "react";
import { useNavigate } from "react-router";


const CreateStagiaire = () => {

    const navigate = useNavigate();

    const [nom, serNom] = useState<string>("");
    const [prenom, setPrenom] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const stagiaire = {nom, prenom, email}
        try {
            const res = await fetch("http://localhost:8080/api/stagiaires", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(stagiaire),
            });

            if (!res.ok) {
                throw new Error("Failed to create stagiaire");
                
            }

            const data = await res.json();
            console.log("Created:", data)
            
        } catch (error) {
            console.error(error);
        }
    }

    return (
      <form onSubmit={handleSubmit}>
        <h1>Creation d'un Stagiaire</h1>
        <label htmlFor="nom">Nom</label>
        <input type="text" placeholder="Nom" id="nom" />
        <label htmlFor="prenom">Prènom</label>
        <input type="text" placeholder="Prènom" id="prenom" />
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" placeholder="Email" />
        <button>Valider</button>
        <button>Annuler</button>
        <button onClick={()=>navigate("/")}>Revenir sur la page Home</button>
      </form>
    );
}

export default CreateStagiaire;