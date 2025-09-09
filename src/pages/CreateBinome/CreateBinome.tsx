import { useEffect, useState } from "react";
import {type Binome, type BinomeDTO, type Formation, type Session, type Stagiaire, type StagiairePourBinome } from "../../assets/data/types";
import { useNavigate } from "react-router";



const CreateBinome = ()=>{
    const navigate = useNavigate();

    const [firstSelectedSt, setFirstSelectedSt] = useState<number>(-1);
    const [secondSelectedSt, setSecondSelectedSt] = useState<number>(-1);
    const [availableSt, setAvailableSt] = useState<Stagiaire[] | []>([]);
    const [selectedBin, setSelectedBin] = useState<Binome>([-1, -1]);
    const [availableSes, setAvailableSes] = useState<Session[] | []>([]);
    const [availableForm, setAvailableForm] = useState<Formation[] | []>([]);
    const [selectedSes, setSelectedSes] = useState<number>(-1);
    
    useEffect(()=>{
        try {
          fetch("http://127.0.0.1:8080/api/sessions")
            .then((res) => {
              if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
              return res.json();
            })
            .then((data) => {
              setAvailableSes(data);
              console.log("Created:", data);
            })
            .catch((err) => console.error("Failed to fetch sessions:", err));
        } catch (error) {
          console.error(error);
        }
    }, [])

    useEffect(() => {
      try {
        // const sesId = selectedSes.find((s) => s.id);
        fetch(`http://127.0.0.1:8080/api/stagiaires/session/${selectedSes}`)
          .then((res) => {
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return res.json();
          })
          .then((data) => {
            const ListSt: StagiairePourBinome[] = data
            const ListStNonBin = ListSt.filter((s)=>s.binomeId===null)
            setAvailableSt(ListStNonBin);
            console.log("Created:", ListStNonBin);
          })
          .catch((err) =>
            console.error("Failed to fetch stagiaires for the session:", err)
          );
      } catch (error) {
        console.error(error);
      }
      // car il y a plus de nom dans la session
      try {
        fetch(`http://127.0.0.1:8080/api/formations`)
          .then((res) => {
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return res.json();
          })
          .then((data) => {
            setAvailableForm(data);
            console.log("Created:", data);
          })
          .catch((err) => console.error("Failed to fetch formations:", err));
      } catch (error) {
        console.error(error);
      }
    }, [selectedSes]);


    // ! cannot create binome, probably type conversion broblem
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSelectedBin([firstSelectedSt, secondSelectedSt]);
        const binome: BinomeDTO = {
          // !change the value of the varibale to the right one
          nom: `id de des stagiaires: ${firstSelectedSt} ${secondSelectedSt}`,
          stagiaireIds: selectedBin,
        };
        try {
            const res = await fetch("http://127.0.0.1:8080/api/binomes", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(binome),
            });

            if (!res.ok) {
                throw new Error("Failed to create binome");
                
            }

            const data = await res.json();
            console.log("Created:", data)
            
        } catch (error) {
            console.error(error);
        }
    }
    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="sessions">Sessions associées</label>
        <select
          name="sessions"
          id="sessions"
          value={selectedSes}
          onChange={(e) => {
            setSelectedSes(Number(e.target.value));
          }}
        >
          <option value="">Sélectionez une session associée</option>
          {availableSes.map((s) => {
            const formation = availableForm.find((f) => f.id === s.id);
            return (
              <option value={s.id} key={s.id}>
                {`${formation?.nom}: ${s.dateDeb} - ${s.dateFin}`}
              </option>
            );
          })}
        </select>
        <div>
          {/* Dropdown A */}
          <label htmlFor="st1">Stagiaire A</label>
          <select
            id="st1"
            value={firstSelectedSt}
            onChange={(e) => setFirstSelectedSt(Number(e.target.value))}
          >
            <option value="">Sélectionner stagiaire (A)</option>
            {availableSt
              .filter((s) => s.id !== secondSelectedSt)
              .map((s) => (
                <option key={s.id} value={s.id}>
                  {s.nom}
                </option>
              ))}
          </select>

          {/* Dropdown B */}
          <label htmlFor="st1">Stagiaire A</label>
          <select
            id="st1"
            value={secondSelectedSt}
            onChange={(e) => setSecondSelectedSt(Number(e.target.value))}
          >
            <option value="">Sélectionner stagiaire (B)</option>
            {availableSt
              .filter((s) => s.id !== firstSelectedSt) 
              .map((s) => (
                <option key={s.id} value={s.id}>
                  {s.nom}
                </option>
              ))}
          </select>
        </div>
        <button type="submit">Créer le Binome</button>
        <button onClick={() => navigate("/")}>Revenir sur la page Home</button>
      </form>
    );
}

export default CreateBinome;