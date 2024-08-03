import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import client from "@/lib/mongodb";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import NavBar from "@/components/NavBar/NavBar";

type ConnectionStatus = {
  isConnected: boolean;
};

const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps: GetServerSideProps<
  ConnectionStatus
> = async () => {
  try {
    await client.connect(); // `await client.connect()` will use the default database passed in the MONGODB_URI
    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
};

export default function Home({
  isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <NavBar />
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
      >
        <div className="flex flex-col place-items-center gap-12">
          {isConnected ? (
            <h2 className="text-lg text-green-500">
              You are connected to MongoDB!
            </h2>
          ) : (
            <h2 className="text-lg text-red-500">
              You are NOT connected to MongoDB. Check the <code>README.md</code>{" "}
              for instructions.
            </h2>
          )}
        </div>
      </main>
    </>
  );
}
