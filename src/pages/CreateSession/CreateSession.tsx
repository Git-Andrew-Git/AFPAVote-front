import { useNavigate } from "react-router";
import AjouterStagiaireDansSession from "../../components/AjouterStagiaireDansSession";
import { useEffect, useState } from "react";
import type { Formation, SessionDTO, Stagiaire } from "../../assets/data/types";

const CreateSession = () => {
  const navigate = useNavigate();
  const [availableStagiaires, setAvailableStagiaires] = useState<Stagiaire[] | []>([]);
  const [selectedStagiaires, setSelectedStagiaires] = useState<Stagiaire[] | []>([]);
  const [selectedDateDeb, setSelectedDateDeb] = useState<Date>(new Date());
  const [selectedDateFin, setSelectedDateFin] = useState<Date>(new Date());
  const [availableFormations, setAvailableFormations] = useState<Formation[] | []>([]);
  const [selectedFormation, setSelectedFormation] = useState<number>(-1);
  useEffect(() => {
    try {
      fetch("http://127.0.0.1:8080/api/stagiaires")
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          return res.json();
        })
        .then((data) => {
          setAvailableStagiaires(data);
          console.log("Created:", data);
        })
        .catch((err) => console.error("Failed to fetch stagiaires:", err));
    } catch (error) {
      console.error(error);
    }

    try {
      fetch("http://127.0.0.1:8080/api/formations")
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          return res.json();
        })
        .then((data) => {
          setAvailableFormations(data);
          console.log("Created:", data);
        })
        .catch((err) => console.error("Failed to fetch formations:", err));
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleAdd = (stagiaire: Stagiaire): void =>{
    setSelectedStagiaires((prev) => [...prev, stagiaire]);
    setAvailableStagiaires((prev)=>prev.filter((s)=>s.id!==stagiaire.id));
  }

  const handleRemove = (stagiaire: Stagiaire): void => {
    // Remove from selected
    setSelectedStagiaires((prev) => prev.filter((s) => s.id !== stagiaire.id));
    // Put back into available
    setAvailableStagiaires((prev) => [...prev, stagiaire]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const IdStagiaire: number[] = selectedStagiaires.map((s)=>s.id)
        const session: SessionDTO = {
          dateDeb: selectedDateDeb,
          dateFin: selectedDateFin,
          formationId: selectedFormation,
          stagiairesId: IdStagiaire,
        };
        try {
            const res = await fetch("http://127.0.0.1:8080/api/sessions", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(session),
            });

            if (!res.ok) {
                throw new Error("Failed to create session");
                
            }

            const data = await res.json();
            console.log("Created:", data)
            
        } catch (error) {
            console.error(error);
        }
    }


  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="formations">Formation associé</label>
      <select
        name="formations"
        id="formations"
        value={selectedFormation}
        onChange={(e) => setSelectedFormation(Number(e.target.value))}
      >
        <option value="">Sélectionner une formation</option>
        {availableFormations.map((opt: Formation) => (
          <option key={opt.id} value={opt.id}>
            {opt.nom}
          </option>
        ))}
      </select>

      <label htmlFor="dateDeb">Date de début</label>
      <input type="date" id="dateDeb" onChange={(e)=>setSelectedDateDeb(new Date(e.target.value))} />
      <label htmlFor="dateFin">Date de fin</label>
      <input type="date" id="dateFin" onChange={(e)=>setSelectedDateFin(new Date(e.target.value))}/>
      {selectedStagiaires.map((stagiaire) => (
        <AjouterStagiaireDansSession
          key={stagiaire.id}
          stagiaire={stagiaire}
          onRemove={handleRemove}
        />
      ))}
      <AjouterStagiaireDansSession
        options={availableStagiaires}
        onAdd={handleAdd}
      />
      <button type="submit">Créer la session</button>
      <button onClick={() => navigate("/")}>Revenir sur la page Home</button>
    </form>
  );
};

export default CreateSession;
