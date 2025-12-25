function App() {
  return (
    <article className="min-h-screen p-8 bg-white relative">

      {/* Main content - Two columns */}
      <section className="w-full h-full flex flex-row gap-12 justify-center items-center">
        <section className="space-y-8">
          <h2 className="text-headline-3 text-brown-600">Colors</h2>

          {/* Base Colors */}
          <div className="space-y-4">
            <h3 className="text-body-1 text-brown-500  tracking-wide">
              BASE
            </h3>
            <div className="flex flex-wrap gap-4">
              <div className="space-y-2 min-w-[120px]">
                <div className="w-full h-20 rounded border border-brown-300 bg-brown-600"></div>
                <p className="text-sm text-brown-600">Brown 600</p>
                <p className="text-xs text-brown-400 font-mono">#26231E</p>
              </div>
              <div className="space-y-2 min-w-[120px]">
                <div className="w-full h-20 rounded border border-brown-300 bg-brown-500"></div>
                <p className="text-sm text-brown-600">Brown 500</p>
                <p className="text-xs text-brown-400 font-mono">#43403B</p>
              </div>
              <div className="space-y-2 min-w-[120px]">
                <div className="w-full h-20 rounded border border-brown-300 bg-brown-400"></div>
                <p className="text-sm text-brown-600">Brown 400</p>
                <p className="text-xs text-brown-400 font-mono">#75716B</p>
              </div>
              <div className="space-y-2 min-w-[120px]">
                <div className="w-full h-20 rounded border border-brown-300 bg-brown-300"></div>
                <p className="text-sm text-brown-600">Brown 300</p>
                <p className="text-xs text-brown-400 font-mono">#DAD6D1</p>
              </div>
              <div className="space-y-2 min-w-[120px]">
                <div className="w-full h-20 rounded border border-brown-300 bg-brown-200"></div>
                <p className="text-sm text-brown-600">Brown 200</p>
                <p className="text-xs text-brown-400 font-mono">#EFEEEB</p>
              </div>
              <div className="space-y-2 min-w-[120px]">
                <div className="w-full h-20 rounded border border-brown-300 bg-brown-100"></div>
                <p className="text-sm text-brown-600">Brown 100</p>
                <p className="text-xs text-brown-400 font-mono">#F9F8F6</p>
              </div>
              <div className="space-y-2 min-w-[120px]">
                <div className="w-full h-20 rounded border border-brown-300 bg-white"></div>
                <p className="text-sm text-brown-600">White</p>
                <p className="text-xs text-brown-400 font-mono">#FFFFFF</p>
              </div>
            </div>
          </div>

          {/* Brand Colors */}
          <div className="space-y-4">
            <h3 className="text-body-1 text-brown-500 tracking-wide">
              BRAND
            </h3>
            <div className="flex flex-wrap gap-4">
              <div className="space-y-2 min-w-[120px]">
                <div className="w-full h-20 rounded border border-brown-300 bg-brand-orange"></div>
                <p className="text-sm text-brown-600">Orange</p>
                <p className="text-xs text-brown-400 font-mono">#F2B68C</p>
              </div>
              <div className="space-y-2 min-w-[120px]">
                <div className="w-full h-20 rounded border border-brown-300  bg-brand-green"></div>
                <p className="text-sm text-brown-600">Green</p>
                <p className="text-xs text-brown-400 font-mono">#12B279</p>
              </div>
              <div className="space-y-2 min-w-[120px]">
                <div className="w-full h-20 rounded border border-brown-300  bg-brand-green-light"></div>
                <p className="text-sm text-brown-600">Green-light</p>
                <p className="text-xs text-brown-400 font-mono">#D7F2E9</p>
              </div>
              <div className="space-y-2 min-w-[120px]">
                <div className="w-full h-20 rounded border border-brown-300  bg-brand-red"></div>
                <p className="text-sm text-brown-600">Red</p>
                <p className="text-xs text-brown-400 font-mono">#EB5164</p>
              </div>
            </div>
          </div>
        </section>

        {/* Right Column: Fonts */}
        <section className="space-y-8">
          <h2 className="text-headline-3 text-brown-600">Fonts</h2>
          <div className="space-y-4">
            <p className="text-headline-1 text-brown-600">Headline 1</p>
            <p className="text-headline-2 text-brown-600">Headline 2</p>
            <p className="text-headline-3 text-brown-600">Headline 3</p>
            <p className="text-headline-4 text-brown-600">Headline 4</p>
            <p className="text-body-1 text-brown-600">Body 1</p>
            <p className="text-body-2 text-brown-600">Body 2</p>
            <p className="text-body-3 text-brown-600">Body 3</p>
          </div>
        </section>
      </section>
    </article>
  );
}

export default App;
