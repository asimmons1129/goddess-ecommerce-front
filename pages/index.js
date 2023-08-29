import Header from "../components/Header";
import Hero from "../components/Hero";
import Instagram from "../components/Instagram";
import Products from "../components/Products";
import { useSession, signIn, signOut } from "next-auth/react";


export default function Home(){
  const { data: session } = useSession()
  
  return (
    <>
      <Header />
      <Hero />
      <Products />
      <Instagram />
    </>
  );
}