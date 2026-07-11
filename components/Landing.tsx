import { Button } from "@/components/ui/Button";
import { ChevronRight } from "@/components/ui/icons";
import { ProofStrip, SocialProofSection } from "@/components/SocialProof";

export function Landing({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="bg-brand-gradient px-5 pb-20 pt-14 text-center text-white">
        <p className="text-sm font-semibold uppercase tracking-wide opacity-80">Noro kviz</p>
        <h1 className="mx-auto mt-3 max-w-md text-3xl font-extrabold leading-tight sm:text-4xl">
          Otkrij koje Noro rešenje je pravo baš za tebe
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base opacity-90">
          Odgovori na par pitanja i dobij personalizovanu preporuku na osnovu tvog problema.
        </p>
      </div>

      <div className="flex-1 px-5">
        <div className="mx-auto -mt-10 max-w-md rounded-2xl bg-white p-6 shadow-xl">
          <Button className="w-full" onClick={onStart}>
            Započni kviz <ChevronRight />
          </Button>
          <div className="mt-4">
            <ProofStrip />
          </div>
        </div>

        <div className="mt-8 pb-12">
          <SocialProofSection />
        </div>
      </div>
    </div>
  );
}
