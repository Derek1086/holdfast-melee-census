// lib/dataFetching.ts
import { MongoClient, WithId, Document } from "mongodb";
import clientPromise from "../../lib/mongodb";

export type Player = {
  id: string;
  name: string;
  regiment: string;
  city: string;
  state: string;
  bio: string;
  rating: string;
};

export type RegionData = {
  _id: string;
  Region: string;
  players: Player[];
};

export const fetchPlayersData = async (): Promise<RegionData[]> => {
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
        state: player.state,
        bio: player.bio,
        rating: player.rating,
      })),
    }));
  };

  // Transform the data from both collections
  const transformedNaRegionData = transformData(naRegionData);
  const transformedEuRegionData = transformData(euRegionData);

  // Combine the transformed data from both collections
  return transformedNaRegionData.concat(transformedEuRegionData);
};
