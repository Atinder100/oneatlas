import { Container } from "@/components/ui/Container";

export default function RankingsPage() {
  return (
    <main className="flex flex-1 items-center bg-slate-50">
      <Container className="py-16">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950">Rankings</h1>
        <p className="mt-3 text-slate-600">Review AI model rankings and trends.</p>
      </Container>
    </main>
  );
}
