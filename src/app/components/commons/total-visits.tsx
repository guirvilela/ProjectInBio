import { MoveRight, TrendingUp } from "lucide-react";
import { manageAuth } from "../../actions/manage-auth";
import { auth } from "../../lib/auth";
import { PortalButton } from "./portal-button";

interface TotalVisitsProps {
  visits: number;
  isHome?: boolean;
}

export async function TotalVisits({ visits = 0, isHome }: TotalVisitsProps) {
  const session = await auth();
  return (
    <div className="w-min whitespace-nowrap flex items-center gap-5 bg-background-secondary border border-border-primary px-8 py-3 rounded-xl shadow-lg">
      <span className="font-bold text-white ">Total de visitas</span>

      <div
        className={`flex items-center gap-2 ${
          visits == 0 ? "text-gray-400" : "text-accent-green"
        } `}
      >
        <span className="text-3xl font-bold">{visits}</span>
        {visits == 0 ? <MoveRight /> : <TrendingUp />}
      </div>

      {!isHome && (
        <div className="flex items-center gap-2">
          {session?.user.isSubscribed && <PortalButton />}

          {session && (
            <form action={manageAuth}>
              <button>Sair</button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
