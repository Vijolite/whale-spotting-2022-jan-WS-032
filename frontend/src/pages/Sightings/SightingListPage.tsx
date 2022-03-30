import { useEffect, useState } from "react";
import "./SightingListPage.scss";
import { Sighting } from "../../clients/apiClients";
import { GetAllSightings } from "../../clients/apiClients";

export function SightingListPage(): JSX.Element {
  const [sightings, setSightings] = useState<Array<Sighting>>([]);
  useEffect(() => {
    GetAllSightings().then(setSightings);
  }, []);

  return (
    <>
      <h1 className="title">Sightings</h1>
      <ul className="sighting_list">
        {sightings.map((s, i) => (
          <li className="sighting_list_item" key={i}>
            <div className="sighting">
              <h2>
                {s.species.name} ({s.species.latinName})
              </h2>

              <img src={s.photoUrl} alt={s.description} />

              <div className="sighting_info">
                <p>About: {s.description}</p>
                <p>Sighting Location: {s.location.name}</p>
                <p>On: {s.date}</p>
                <p>
                  Seen by: {s.user.name} ({s.user.username})
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
