import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import TestClient from "@/src/components/TestClient";
import { wrapper } from "@/src/redux/store";
import { getTodos } from "@/src/redux/testApi";
import { getRunningQueriesThunk } from "@/src/redux/rtkApi";

type Repo = {
   name: string;
   stargazers_count: number;
};

const inter = Inter({ subsets: ["latin"] });

export default function Home({ data }) {
   console.log("data-----", data);
   return (
      <>
         <Head>
            <title>Create Next App</title>
            <meta name='description' content='Generated by create next app' />
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <link rel='icon' href='/favicon.ico' />
         </Head>
         <main className={`${styles.main} ${inter.className}`}>
            <TestClient data={data} />
         </main>
      </>
   );
}

export const getServerSideProps = wrapper.getServerSideProps(store => async context => {
   const { data } = await store.dispatch(getTodos.initiate());
   await Promise.all(store.dispatch(getRunningQueriesThunk()));

   return {
      props: {
         //  data,
      },
   };
});

// export const getServerSideProps = async () => {
//    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
//    const data = await res.json();

//    return {
//       props: {
//          data,
//       },
//    };
// };
