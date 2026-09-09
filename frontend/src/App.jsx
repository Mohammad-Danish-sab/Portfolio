import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Services } from "./components/Services";
import { Experience } from "./components/Experience";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { ProjectDetail } from "./components/ProjectDetail"; 

function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Services />
      <Experience />
      <Contact />
    </main>
  );
}

export default function App() {
  return (
    <div className="bg-[#030712] text-gray-100 min-h-screen font-sans selection:bg-cyan-500 selection:text-black flex flex-col justify-between">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
      </Routes>
      <Footer />
    </div>
  );
}
