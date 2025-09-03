export default function MathMinecraftPage() {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">Minecraft Math Helper</h2>
      <p className="text-white/80 max-w-prose">
        Quick exercises using crafting counts, block areas, and inventory math. We’ll add interactive
        checks next.
      </p>
      <div className="rounded border border-white/10 p-4 bg-white/5">
        <ol className="list-decimal list-inside space-y-2">
          <li>You have 12 cobblestone and need 8 for a furnace. How many remain?</li>
          <li>Each torch uses 1 coal and 1 stick. With 5 coal and 3 sticks, what’s the max torches?</li>
          <li>A farm is 9 blocks long and 3 blocks wide. How many blocks of soil is that?</li>
        </ol>
      </div>
    </div>
  );
}
