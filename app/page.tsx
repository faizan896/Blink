"use client";

import { useEffect, useRef, useState } from "react";

type View = "home" | "result" | "library";
type Depth = "15 sec" | "30 sec" | "2 min";

const recent = [
  { type: "ARTICLE", title: "The quiet shift in Apple’s services strategy", source: "The Long View · Today", time: "30 sec", tone: "rust", takeaway: "Apple’s next chapter is recurring revenue, not more devices." },
  { type: "REPORT · 84 PAGES", title: "Global energy outlook 2025", source: "Aperture Institute · Aug 12", time: "2 min", tone: "moss", takeaway: "Grid investment has become the bottleneck in the energy transition." },
  { type: "SCREENSHOT", title: "Why small teams are winning", source: "Screenshot · Aug 9", time: "15 sec", tone: "ochre", takeaway: "AI is changing the smallest viable size of a meaningful company." },
];

function Logo({ onClick }: { onClick: () => void }) {
  return <button className="logo" onClick={onClick} aria-label="Blink home"><span className="mark"><i/><i/></span><b>blink</b></button>;
}

function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => { document.documentElement.dataset.theme = dark ? "dark" : "light"; }, [dark]);
  return <button className="iconButton" onClick={() => setDark(!dark)} aria-label="Toggle color theme">{dark ? "☼" : "◐"}</button>;
}

function Header({ view, setView }: { view: View; setView: (v: View) => void }) {
  return <header><Logo onClick={() => setView("home")}/><nav><button className={view === "library" ? "active" : ""} onClick={() => setView("library")}>Library</button><button>Settings</button></nav><div className="navEnd"><ThemeToggle/><button className="avatar" aria-label="Profile">AE</button></div></header>;
}

function UniversalInput({ onSubmit }: { onSubmit: () => void }) {
  const [text, setText] = useState(""); const [drag, setDrag] = useState(false); const file = useRef<HTMLInputElement>(null);
  return <div className={`universal ${drag ? "dragging" : ""}`} onDragOver={e => {e.preventDefault();setDrag(true)}} onDragLeave={() => setDrag(false)} onDrop={e => {e.preventDefault();setDrag(false);setText(e.dataTransfer.files[0]?.name || "")}}>
    <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Paste a link, drop a file, or add text…" aria-label="Content to blink"/>
    <div className="inputBottom"><div className="tools"><button onClick={() => file.current?.click()} className="attach" aria-label="Attach file">⌕</button><input ref={file} hidden type="file" accept=".pdf,image/*" onChange={e => setText(e.target.files?.[0]?.name || "")}/><span>Article</span><span>PDF</span><span>Screenshot</span><span>Text</span></div><button className="primary" onClick={onSubmit}>Blink it <b>↗</b></button></div>
  </div>;
}

function ProcessingState() {
  const steps = ["Reading the source", "Finding the signal", "Pulling out key numbers", "Connecting the important pieces", "Building your brief"];
  const [step, setStep] = useState(0);
  useEffect(() => { const t = setInterval(() => setStep(s => Math.min(s + 1, 4)), 450); return () => clearInterval(t); }, []);
  return <main className="processing"><div className="processingMark"><i/><i/></div><p>{steps[step]}</p><div className="progress"><i style={{width: `${(step + 1) * 20}%`}}/></div><small>{step + 1} of 5</small></main>;
}

function LibraryCard({ item, onOpen }: { item: typeof recent[number]; onOpen: () => void }) {
  return <button className="libraryCard" onClick={onOpen}><div className={`thumb ${item.tone}`}><span className="miniMark">—<br/>—</span><em>{item.type.split(" ")[0]}</em></div><div className="cardCopy"><div className="eyebrow">{item.type}</div><h3>{item.title}</h3><p>{item.takeaway}</p><footer><span>{item.source}</span><span>{item.time} read</span></footer></div></button>;
}

function Home({ onSubmit, onOpen }: { onSubmit: () => void; onOpen: () => void }) {
  return <main><section className="hero"><div className="kicker"><i/> A clearer way to read</div><h1>Understand anything<br/>in <em>30 seconds.</em></h1><p>Paste an article, drop a PDF, screenshot something, or add text.<br/>Blink turns it into the part that actually matters.</p><UniversalInput onSubmit={onSubmit}/><div className="privacy">Your content stays private <span>·</span> Supports links, PDF, PNG, JPG and text</div></section><section className="recent"><div className="sectionHead"><div><small>YOUR READING ROOM</small><h2>Recent Blinks</h2></div><button onClick={onOpen}>View library <span>→</span></button></div><div className="recentGrid">{recent.map((r,i) => <LibraryCard key={i} item={r} onOpen={onOpen}/>)}</div></section></main>;
}

function DepthSwitch({ depth, setDepth }: { depth: Depth; setDepth: (d: Depth) => void }) { return <div className="depth" aria-label="Reading depth">{(["15 sec","30 sec","2 min"] as Depth[]).map(d => <button key={d} className={depth === d ? "selected" : ""} onClick={() => setDepth(d)}>{d}</button>)}</div> }

function Result() {
  const [depth,setDepth] = useState<Depth>("30 sec"); const [saved,setSaved]=useState(false); const [answer,setAnswer]=useState("");
  return <main className="result"><div className="resultToolbar"><button className="back">← Back</button><DepthSwitch depth={depth} setDepth={setDepth}/><div><button onClick={()=>setSaved(!saved)}>{saved ? "✓ Saved" : "♡ Save"}</button><button>↗ Share</button></div></div><article>
    <div className="sourceMeta"><div className="sourceIcon">LV</div><div><strong>The Long View</strong><span>thelongview.com</span></div><dl><div><dt>Original</dt><dd>12 min</dd></div><div><dt>Blink</dt><dd>{depth}</dd></div><div><dt>Published</dt><dd>Aug 14, 2025</dd></div></dl></div>
    <div className="resultTitle"><span>THE BLINK</span><h1>Apple’s quiet shift from devices to a services empire</h1><p>Apple’s new strategy is less about selling more devices and more about turning its installed base into dependable, recurring revenue.</p></div>
    <section className="sentence"><h2><span>01</span> In one sentence</h2><p>With hardware growth slowing, Apple is building a high-margin services layer around the two billion devices it has already sold.</p></section>
    <section><h2><span>02</span> What matters</h2><div className="insights">
      <div><b>01</b><h3>The installed base is the product</h3><p>Apple now has more than two billion active devices worldwide. Each one is a lasting distribution channel for subscriptions, payments, and media.</p><a>Annual report, p. 3 ↗</a></div>
      <div><b>02</b><h3>Margins tell the real story</h3><p>Services margins are nearly double those of hardware. Even modest services growth can reshape Apple’s overall profitability.</p><a>Q3 earnings call ↗</a></div>
      <div><b>03</b><h3>Growth without a new hit</h3><p>The shift makes Apple less dependent on blockbuster product launches and more resilient to longer upgrade cycles.</p></div>
      {depth === "2 min" && <div><b>04</b><h3>Regulation is the counterweight</h3><p>The same closed ecosystem that powers services growth is attracting scrutiny, creating meaningful long-term uncertainty.</p></div>}
    </div></section>
    {depth !== "15 sec" && <><section><h2><span>03</span> Numbers worth knowing</h2><div className="stats"><div><strong>$24.2B</strong><p>Quarterly services revenue</p><small>Q3 2025</small></div><div><strong>+14%</strong><p>Year-over-year growth</p><small>Services segment</small></div><div><strong>2.2B</strong><p>Active devices worldwide</p><small>Across the ecosystem</small></div></div></section><section className="why"><h2><span>04</span> Why this matters</h2><p>Apple is gradually becoming a different kind of company—one whose value comes as much from the ongoing relationship with its customers as from the devices that begin it. That makes revenue more predictable, but it also puts the company’s platform control under a brighter regulatory spotlight.</p></section><section><h2><span>05</span> People & companies</h2><div className="entities"><span><i>AP</i><b>Apple</b><small>Company</small></span><span><i>TC</i><b>Tim Cook</b><small>CEO</small></span><span><i>EU</i><b>European Union</b><small>Regulator</small></span></div></section></>}
    <section className="ask"><div><h2>Still curious?</h2><p>Ask Blink about anything in this source.</p></div><form onSubmit={e=>{e.preventDefault();setAnswer("Apple’s services business has become its most reliable growth engine, supported by a large installed base and substantially higher margins than hardware.")}}><input placeholder="Ask something about this source…"/><button>↑</button></form>{answer && <p className="answer">{answer}</p>}</section>
  </article></main>;
}

function Library({ onOpen }: { onOpen: () => void }) { return <main className="library"><div className="libraryHero"><div className="kicker"><i/> Your reading room</div><h1>Library</h1><p>Everything you’ve understood, kept close.</p></div><div className="filters"><div>{["All","Articles","PDFs","Screenshots","Text"].map((x,i)=><button className={i===0?"selected":""} key={x}>{x}</button>)}</div><label>⌕ <input placeholder="Search your Blinks"/></label></div><div className="libraryGrid">{recent.concat([{...recent[0],title:"The new economics of small software companies",source:"Operator Notes · Aug 4",takeaway:"Tiny, profitable teams are becoming a durable company model."}]).map((r,i)=><LibraryCard key={i} item={r} onOpen={onOpen}/>)}</div></main> }

export default function App() {
  const [view,setView]=useState<View>("home"); const [processing,setProcessing]=useState(false);
  const submit=()=>{setProcessing(true);setTimeout(()=>{setProcessing(false);setView("result")},2600)};
  return <><Header view={view} setView={setView}/>{processing ? <ProcessingState/> : view==="home" ? <Home onSubmit={submit} onOpen={()=>setView("result")}/> : view==="library" ? <Library onOpen={()=>setView("result")}/> : <Result/>}<footer className="siteFooter"><Logo onClick={()=>setView("home")}/><span>Read less. Know more.</span><small>© 2025 Blink</small></footer></>;
}
