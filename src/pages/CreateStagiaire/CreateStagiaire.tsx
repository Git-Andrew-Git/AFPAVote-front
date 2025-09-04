

const CreateStagiaire = () => {

    return (
      <>
        <h1>Creation d'un Stagiaire</h1>
        <label htmlFor="nom">Nom</label>
        <input type="text" placeholder="Nom" id="nom" />
        <label htmlFor="prenom">Prènom</label>
        <input type="text" placeholder="Prènom" id="prenom" />
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" placeholder="Email" />
      </>
    );
}

export default CreateStagiaire;