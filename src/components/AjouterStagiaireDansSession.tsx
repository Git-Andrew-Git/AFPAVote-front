import { useState } from "react";
import type { PropsSt, Stagiaire } from "../assets/data/types";

const AjouterStagiaireDansSession = (props: PropsSt) => {
    const [selectedValue, setSelectedValue] = useState<number | "">("");
    if ("options" in props) {
        return (
          <>
            <div>
              <label htmlFor="stagiaire">Stagiaire</label>
              <select
                name="stagiaire"
                id="stagiaire"
                value={selectedValue}
                onChange={(e) => setSelectedValue(Number(e.target.value))}
              >
                <option value="">Sélectionner un stagiaire</option>
                {props.options.map((opt: Stagiaire) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.nom}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button type="button" disabled={selectedValue === ""} onClick={() => {
                const stagiaire = props.options.find((s) => s.id === selectedValue);
                if (stagiaire) {
                    props.onAdd(stagiaire);
                    setSelectedValue("");
                }
              }}>Ajouter</button>
              
            </div>
          </>
        );
    }
  return (
    <>
    <span>{props.stagiaire.nom}</span>
    <button type="button" onClick={()=>props.onRemove(props.stagiaire)}>Supprimer</button>
    </>
  )
};

export default AjouterStagiaireDansSession;
