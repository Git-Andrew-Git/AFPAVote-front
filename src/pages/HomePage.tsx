const HomePage = () => {
  return (
    <>
      <h1>AFPAVote</h1>
      <h2>
        Application AFPAVote pour créer des scrutins et organiser les votes.
      </h2>

      {/* <ol>
        <li>CreateStagiaire.tsx</li>
      </ol> */}
      <br />
      <br />
      <h3>Descriptif du projet</h3>
      <br />
      <p>
        Le vote des délégués pour la formation approche et cette année l'Afpa
        souhaite mettre en place le vote numérique pour simplifier le processus
        de vote.
      </p>
      <br />
      <p>
        L'objectif est de développer une application web comportant deux modules
        :
      </p>
      <br />
      <ul>
        <li>
          une module application présentant une interface d'administration
          permettant à une personne habilitée de créer des sessions de
          formation, y associer des stagiaires et organiser une séance de vote ;
        </li>
        <br />
        <li>
          un module permettant aux stagiaires d'une formation de choisir un
          binôme de délégué.e.s qui se présentent, ceci pour une séance de vote
          pré-organisée.
        </li>
      </ul>
      <br />
      <p>
        Le vote devra être anonyme (rien de l'identité des votants ne devra être
        stocké en BDD sur le long terme, il n'y aura que leurs choix).
      </p>
      <br />
      <p>
        Le nom du projet est libre, il vous est proposé "Cballot" pour "Class
        ballot" mais toute proposition peut être acceptée.
      </p>
    </>
  );
};

export default HomePage
