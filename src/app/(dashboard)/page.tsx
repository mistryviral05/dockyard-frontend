import { Button } from "@/shared/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div>
       <div className="flex items-center justify-between">
        <div>
          <h1>Dashboard</h1>
        </div>

        <div>
          <UserButton/>
        </div>

       </div>
    </div>
  );
}
