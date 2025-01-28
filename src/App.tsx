import MemoryGame from "./MemoryGame";

function App() {
  return (
    <div className="w-screen h-screen flex overflow-auto">
      <MemoryGame
        images={[
          "https://placeholder.pagebee.io/api/random/200/200",
          "https://placeholder.pagebee.io/api/random/201/201",
          "https://placeholder.pagebee.io/api/random/202/202",
          "https://placeholder.pagebee.io/api/random/203/203",
          "https://placeholder.pagebee.io/api/random/204/204",
          "https://placeholder.pagebee.io/api/random/199/199",
          "https://placeholder.pagebee.io/api/random/196/196",
          "https://placeholder.pagebee.io/api/random/197/197",
        ]}
      />
    </div>
  );
}

export default App;
