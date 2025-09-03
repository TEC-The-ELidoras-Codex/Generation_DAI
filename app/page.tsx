export default function Page() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Welcome, parent</h2>
      <p className="text-white/80 max-w-prose">
        Your agentic companion for guiding kids through the internet—reading, math, and media literacy,
        with a practical CRAP test mindset. Start with the wiki or jump into Minecraft-themed helpers.
      </p>
      <ul className="list-disc list-inside space-y-1 text-white/90">
        <li>
          Wiki: <a href="/wiki">critical thinking, media tricks, and parenting recipes</a>
        </li>
        <li>
          Reading helper: <a href="/reading/minecraft">Minecraft-themed reading</a>
        </li>
        <li>
          Math helper: <a href="/math/minecraft">Minecraft-themed math</a>
        </li>
      </ul>
    </section>
  );
}
