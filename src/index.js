import React from "react";
import { useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

export default function CatalogoSchermata() {
  const [filtroLingua, setFiltroLingua] = useState(false);
  const [filtroDisponibile, setFiltroDisponibile] = useState(true);
  const [sceltaOrdinamento, setSceltaOrdinamento] = useState("autore");

  return (
    <div>
      <OrdererContainer
        sceltaOrdinamento={sceltaOrdinamento}
        onChangeOrdine={setSceltaOrdinamento}
      />
      <FilterContainer
        filtroLingua={filtroLingua}
        onChangeLingua={setFiltroLingua}
        filtroDisponibile={filtroDisponibile}
        onChangeDisponibile={setFiltroDisponibile}
      />
      <BooksDisplayer
        filtroLingua={filtroLingua}
        filtroDisponibile={filtroDisponibile}
        sceltaOrdinamento={sceltaOrdinamento}
      />
    </div>
  );
}

function OrdererContainer({ sceltaOrdinamento, onChangeOrdine }) {
  return (
    <div>
      <label for="ordine">catalogo in ordine per:</label>
      <select
        name="ordine"
        id="ordine"
        onChange={(e) => onChangeOrdine(e.target.value)}
      >
        <option value="autore">autore</option>
        <option value="titolo">titolo</option>
        <option value="pagine">pagine</option>
      </select>
    </div>
  );
}

function FilterContainer({
  filtroLingua,
  onChangeLingua,
  filtroDisponibile,
  onChangeDisponibile,
}) {
  return (
    <form>
      <div>
        <input
          type="checkBox"
          id="lingua"
          checked={filtroLingua}
          onChange={() => onChangeLingua(!filtroLingua)}
        ></input>
        <label for="lingua">Solo italiano</label>
      </div>
      <input
        type="checkBox"
        id="disponibile"
        checked={filtroDisponibile}
        onChange={() => onChangeDisponibile(!filtroDisponibile)}
      ></input>
      <label for="disponibile">Solo disponibile</label>
    </form>
  );
}

function BooksDisplayer({
  filtroLingua,
  filtroDisponibile,
  sceltaOrdinamento,
}) {
  let totLibri = [
    {
      titolo: "aaa",
      autore: "aaaa",
      id: 1,
      pagine: 100,
      lingua: "ita",
      disponibile: true,
    },
    {
      titolo: "bbb",
      autore: "cccc",
      id: 2,
      pagine: 50,
      lingua: "ita",
      disponibile: false,
    },
    {
      titolo: "ccc",
      autore: "bbbb",
      id: 0,
      pagine: 200,
      lingua: "eng",
      disponibile: true,
    },
  ];

  //ordino l'array dei libri
  switch (sceltaOrdinamento) {
    case "autore":
      totLibri.sort((a, b) => (a.autore > b.autore ? 1 : -1));
      break;
    case "pagine":
      totLibri.sort((a, b) => a.pagine - b.pagine);
      break;
    case "titolo":
      totLibri.sort((a, b) => (a.titolo > b.titolo ? 1 : -1));
      break;
  }

  //da un punto di vista di prestazioni sarebbe meglio filtrarlo, ordinarlo e poi generare html

  //filtro l'array e genero html
  let booksToShow = totLibri.map((libro) => {
    if (filtroLingua && libro.lingua != "ita") return;
    if (filtroDisponibile && !libro.disponibile) return;
    else
      return (
        <li key={libro.id}>
          <div style={{ color: libro.disponibile ? "black" : "red" }}>
            {libro.titolo}
          </div>
          <div>autore: {libro.autore}</div>
          <div>pagine: {libro.pagine}</div>
          <div>lingua: {libro.lingua}</div>
        </li>
      );
  });

  return (
    <div>
      <ul>{booksToShow}</ul>
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<CatalogoSchermata />);
