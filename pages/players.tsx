import { GetServerSideProps } from "next";
import { MongoClient, WithId, Document } from "mongodb";
import clientPromise from "../lib/mongodb";

type Player = {
  id: string;
  name: string;
  regiment: string;
  city: string;
  bio: string;
};

type RegionData = {
  _id: string;
  Region: string;
  players: Player[];
};

type PlayersProps = {
  players: RegionData[];
};

const Players: React.FC<PlayersProps> = ({ players }) => {
  return (
    <div style={{ color: "white" }}>
      <ul>
        {players.map((playerChar) => (
          <li key={playerChar._id}>
            <h2>{playerChar.Region}</h2>
            <ul>
              {playerChar.players.map((player, index) => (
                <li key={player.id}>
                  <h3>
                    {index + 1}. {player.name}
                  </h3>
                  <p>Regiment: {player.regiment}</p>
                  <p>City: {player.city}</p>
                  <p>Bio: {player.bio}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const client: MongoClient = await clientPromise;
    const db = client.db("HOLDFASTMAP");

    // Fetch data from the NAREGION collection
    const naRegionData: WithId<Document>[] = await db
      .collection("NAREGION")
      .find({})
      .sort({
        /* Specify your sorting criteria here */
      })
      .limit(10)
      .toArray();

    // Fetch data from the EUREGION collection
    const euRegionData: WithId<Document>[] = await db
      .collection("EUREGION")
      .find({})
      .sort({
        /* Specify your sorting criteria here */
      })
      .limit(10)
      .toArray();

    // Transform data structure for both collections
    const transformData = (data: WithId<Document>[]): RegionData[] => {
      return data.map((entry) => ({
        _id: entry._id.toString(),
        Region: entry.Region,
        players: entry.players.map((player: any) => ({
          id: player.id,
          name: player.name,
          regiment: player.regiment,
          city: player.city,
          bio: player.bio,
        })),
      }));
    };

    // Transform the data from both collections
    const transformedNaRegionData = transformData(naRegionData);
    const transformedEuRegionData = transformData(euRegionData);

    // Combine the transformed data from both collections
    const allData = transformedNaRegionData.concat(transformedEuRegionData);

    return {
      props: { players: JSON.parse(JSON.stringify(allData)) },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { players: [] },
    };
  }
};

export default Players;
