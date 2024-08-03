import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, WithId, Document } from "mongodb";
import clientPromise from "../../lib/mongodb";

type Player = {
  id: string;
  name: string;
  regiment: string;
  city: string;
  bio: string;
};

type RegionData = {
  Region: string;
  players: Player[];
};

type TransformedRegionData = {
  _id: string;
  Region: string;
  players: Player[];
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
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

    const transformData = (
      data: WithId<Document>[]
    ): TransformedRegionData[] => {
      return data.map((entry) => ({
        _id: entry._id.toString(),
        Region: entry.Region,
        players: entry.players.map((player: Player) => ({
          id: player.id,
          name: player.name,
          regiment: player.regiment,
          city: player.city,
          bio: player.bio,
        })),
      }));
    };

    const transformedNaRegionData = transformData(naRegionData);
    const transformedEuRegionData = transformData(euRegionData);

    const allData = {
      NAREGION: transformedNaRegionData,
      EUREGION: transformedEuRegionData,
    };

    res.json(allData);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default handler;
