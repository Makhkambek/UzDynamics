import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Team from "./components/Team";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CLIEasterEgg from "./components/CLIEasterEgg";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Projects />
      <Team />
      <About />
      <Contact />
      <Footer />
      <CLIEasterEgg />
    </main>
  );
}
