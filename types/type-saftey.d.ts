import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      id: string;
    };
  }

  interface User {
    id: string;
  }


}


// guideline page type saftey 

declare module "@/app/guidelines/page" {
  
  interface GuidelinePoint {
  text: string;
}

interface Guideline {
  id: number | string,
  title: string,
  image?: string,
  color: string,
  points: GuidelinePoint[];

}}
