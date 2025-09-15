"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import emailjs from "emailjs-com"
import toast, { Toaster } from 'react-hot-toast';
import Link from "next/link"
import { Menu, X, Github, Linkedin, Mail, Download, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [scrollY, setScrollY] = useState(0)
  const form = useRef<HTMLFormElement>(null)

    interface FormParams {
      name: string;
      email: string;
      message: string;
      subject: string;
    }

const [parms, setParms] = useState<FormParams>({
  name: "",
  email: "",
  message: "",
  subject: "",
});
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)

      const sections = ["home", "about", "skills", "projects", "resume", "contact"]

      for (const section of sections) {
        const element = document.getElementById(section)
        if (!element) continue

        const rect = element.getBoundingClientRect()
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false)
    const element = document.getElementById(sectionId)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      })
    }
  }

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    emailjs.send(
      "service_92dqcs9",     // Replace with your actual Service ID
      "template_rgctf7k",    // Replace with your Template ID
      { ...parms }, // Convert parms to a Record<string, unknown>
      "GmSnpPNiFPsgEDNUX",   // Replace with your Public Key
    ).then(
      (result) => {
        console.log(result.text);
        toast.success('Mail successfully sent!')
        setParms({
          name: "",
          email: "",
          message: "",
          subject: "",
        })
        // e.target.reset(); // Optional: Reset form
      },
      (error) => {
        console.error(error.text);
        alert("Message failed to send. Please try again.");
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white">
      {/* Navbar */}
      <div><Toaster/></div>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrollY > 50 ? "bg-[#1a1a2e]/90 backdrop-blur-md shadow-lg" : "bg-transparent"}`}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link
            href="/"
            className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent"
          >
            Welcome
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {["home", "about", "skills", "projects", "resume", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`capitalize text-md font-medium hover:text-purple-400 transition-colors ${
                  activeSection === item ? "text-purple-400" : "text-gray-300"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Mobile Navigation Toggle */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#1a1a2e]/95 backdrop-blur-md">
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {["home", "about", "skills", "projects", "resume", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize text-sm font-medium py-2 hover:text-purple-400 transition-colors ${
                    activeSection === item ? "text-purple-400" : "text-gray-300"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center pt-20">
          <div className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 flex justify-center md:justify-end">
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-purple-500/30">
                <Image src="/logo.jpg" alt="Profile" fill className="object-cover" />
              </div>
            </div>
            <div className="md:w-1/2 md:pl-12 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Hi, I'm{" "}
                <span className="bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
                  Aditya Raj
                </span>
              </h1>
              <h2 className="text-xl md:text-2xl font-medium text-gray-300 mb-6">Full Stack Developer</h2>
              <p className="text-gray-400 mb-8 max-w-lg mx-auto md:mx-0">
                Ready to build your next amazing web project.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Button
                  onClick={() => scrollToSection("contact")}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                >
                  Get in Touch
                </Button>
                <Button
                  onClick={() => scrollToSection("projects")}
                  variant="outline"
                  className="border-purple-500 text-purple-400 hover:bg-purple-500/10"
                >
                  View My Work
                </Button>
              </div>
              <div className="flex mt-8 gap-4 justify-center md:justify-start">
                <a
                  href="https://github.com/Ranchi-Raj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/aditya-raj-b13b491b7/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Linkedin size={20} />
                </a>
                {/* <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Twitter size={20} />
                </a> */}
                <a href="mailto:raj.adi792@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-[#16213e]/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-indigo-500 mx-auto"></div>
            </div>

            <div className="flex flex-col md:flex-row gap-10 items-center">
              <div className="md:w-1/2">
                <h3 className="text-2xl font-semibold mb-4 text-purple-400">Who Am I ??</h3>
                <p className="text-gray-300 mb-6">
                  I'm a passionate Full Stack Developer with over 3 years of experience in building web applications. I
                  specialize in creating responsive, user-friendly interfaces and robust backend systems.
                </p>
                <p className="text-gray-300 mb-6">
                  My journey in web development began when I was in , and since then, I've worked with various
                  technologies and frameworks. 
                </p>
                <p className="text-gray-300">
                  When I'm not coding, you can find me travelling, reading tech blogs, watching movies, or experimenting with new
                  technologies to stay at the forefront of web development.
                </p>
              </div>

              <div className="md:w-1/2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-[#1a1a2e] p-6 rounded-lg shadow-lg">
                    <h4 className="text-xl font-semibold mb-2">Education</h4>
                    <p className="text-gray-400">Bachelor of Technology</p>
                    <p className="text-gray-500">IIT Bhubaneshwar - 2027</p>
                  </div>

                  <div className="bg-[#1a1a2e] p-6 rounded-lg shadow-lg">
                    <h4 className="text-xl font-semibold mb-2">Experience</h4>
                    <p className="text-gray-400">3+ Years</p>
                    <p className="text-gray-500">Full Stack Development</p>
                  </div>

                  <div className="bg-[#1a1a2e] p-6 rounded-lg shadow-lg">
                    <h4 className="text-xl font-semibold mb-2">Projects</h4>
                    <p className="text-gray-400">10+ Completed</p>
                    <p className="text-gray-500">Web Applications</p>
                  </div>

                  {/* <div className="bg-[#1a1a2e] p-6 rounded-lg shadow-lg">
                    <h4 className="text-xl font-semibold mb-2">Clients</h4>
                    <p className="text-gray-400">30+ Happy Clients</p>
                    <p className="text-gray-500">Worldwide</p>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20">
  <div className="container mx-auto px-4">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">My Skills</h2>
      <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-indigo-500 mx-auto"></div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div>
        <h3 className="text-2xl font-semibold mb-6 text-purple-400">Technical Skills</h3>

        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-300">JavaScript/TypeScript</span>
              <span className="text-gray-400">90%</span>
            </div>
            <Progress
              value={90}
              className="h-2 bg-[#1a1a2e]"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-300">React/Next.js</span>
              <span className="text-gray-400">88%</span>
            </div>
            <Progress
              value={88}
              className="h-2 bg-[#1a1a2e]"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-300">Node.js/Express</span>
              <span className="text-gray-400">85%</span>
            </div>
            <Progress
              value={85}
              className="h-2 bg-[#1a1a2e]"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-300">React Native</span>
              <span className="text-gray-400">50%</span>
            </div>
            <Progress
              value={50}
              className="h-2 bg-[#1a1a2e]"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-300">Databases (MongoDB, Appwrite, PostgreSQL)</span>
              <span className="text-gray-400">72%</span>
            </div>
            <Progress
              value={72}
              className="h-2 bg-[#1a1a2e]"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-300">Python</span>
              <span className="text-gray-400">65%</span>
            </div>
            <Progress
              value={65}
              className="h-2 bg-[#1a1a2e]"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-300">Java/C</span>
              <span className="text-gray-400">70%</span>
            </div>
            <Progress
              value={70}
              className="h-2 bg-[#1a1a2e]"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-semibold mb-6 text-purple-400">Tools & Technologies</h3>

        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-300">Git & GitHub</span>
              <span className="text-gray-400">85%</span>
            </div>
            <Progress
              value={85}
              className="h-2 bg-[#1a1a2e]"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-300">Docker</span>
              <span className="text-gray-400">45%</span>
            </div>
            <Progress
              value={75}
              className="h-2 bg-[#1a1a2e]"
            />
          </div>

          {/* <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-300">Firebase</span>
              <span className="text-gray-400">45%</span>
            </div>
            <Progress
              value={85}
              className="h-2 bg-[#1a1a2e]"
            />
          </div> */}

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-300">AI Tools (Langchain, Langgraph)</span>
              <span className="text-gray-400">80%</span>
            </div>
            <Progress
              value={80}
              className="h-2 bg-[#1a1a2e]"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-300">Design Tools (Figma, Photoshop, Illustrator)</span>
              <span className="text-gray-400">65%</span>
            </div>
            <Progress
              value={65}
              className="h-2 bg-[#1a1a2e]"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-300">Payment Integration (Razorpay)</span>
              <span className="text-gray-400">85%</span>
            </div>
            <Progress
              value={85}
              className="h-2 bg-[#1a1a2e]"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 bg-[#16213e]/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-indigo-500 mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Project 1 */}
              <div className="bg-[#1a1a2e] rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
                <div className="relative h-48">
                  <Image src="/zuno.png" alt="Project 1" fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Zuno Gaming Platform</h3>
                  <p className="text-gray-400 mb-4">
                    A full-featured Casino type gaming platform built with React, Node.js, and Appwrite with payment intergration and a dedicated admin panel for proper scrutiny.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">React</span>
                    <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">Node.js</span>
                    <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">Appwrite</span>
                  </div>
                  <div className="flex gap-3">
                    <a href="#" className="text-sm text-purple-400 hover:text-purple-300 flex items-center">
                      <Github size={16} className="mr-1" /> Code (Private)
                    </a>
                    <a href="https://zuno-gaming.vercel.app/" className="text-sm text-purple-400 hover:text-purple-300 flex items-center" target="_blank">
                      <ExternalLink size={16} className="mr-1" /> Live Demo
                    </a>
                  </div>
                </div>
              </div>

              {/* Project 2 */}
              <div className="bg-[#1a1a2e] rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
                <div className="relative h-48">
                  <Image src="/ipl.png" alt="Project 2" fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">IPL themed E-Commerce Store</h3>
                  <p className="text-gray-400 mb-4">
                    A collaborative task management application with real-time updates and team features.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">React.js</span>
                    <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">MongoDB</span>
                    <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">oAuth</span>
                  </div>
                  <div className="flex gap-3">
                    <a href="https://github.com/Ranchi-Raj/IPL_client" className="text-sm text-purple-400 hover:text-purple-300 flex items-center">
                      <Github size={16} className="mr-1" /> Code
                    </a>
                    <a href="https://drive.google.com/file/d/1KNwh7Z4tYWUK3bXJW_mXeGKjzOLRz0IZ/view?usp=sharing" className="text-sm text-purple-400 hover:text-purple-300 flex items-center">
                      <ExternalLink size={16} className="mr-1" /> Live Demo (Video)
                    </a>
                  </div>
                </div>
              </div>

              {/* Project 3 */}
              <div className="bg-[#1a1a2e] rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
                <div className="relative h-48">
                  <Image src="/erp.png" alt="Project 3" fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">ERP System</h3>
                  <p className="text-gray-400 mb-4">
                    A comprehensive ERP system for managing student records, faculties, and administrative tasks, giving assignments, there submissions, giving feedbacks and more.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">React</span>
                    <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">MongoDB</span>
                    <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">Express</span>
                  </div>
                  <div className="flex gap-3">
                    <a href="#" className="text-sm text-purple-400 hover:text-purple-300 flex items-center">
                      <Github size={16} className="mr-1" /> Code
                    </a>
                    <a href="https://drive.google.com/file/d/13lzndsX59Lj8AucE2KETjpxuVApUn7Ar/view?usp=sharing" className="text-sm text-purple-400 hover:text-purple-300 flex items-center" target="_blank">
                      <ExternalLink size={16} className="mr-1" /> Live Demo (Video)
                    </a>
                  </div>
                </div>
              </div>

              {/* Project 4 */}
              <div className="bg-[#1a1a2e] rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
                <div className="relative h-48">
                  <Image src="/pravaah.png" alt="Project 4" fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Pravaah Fest Website</h3>
                  <p className="text-gray-400 mb-4">
                    A fully-responsive website for IIT Bhubaneshwar annual techno-cultural fest Pravaah.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">Next.js</span>
                    {/* <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">GraphQL</span>
                    <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">Node.js</span> */}
                  </div>
                  <div className="flex gap-3">
                    <a href="#" className="text-sm text-purple-400 hover:text-purple-300 flex items-center">
                      <Github size={16} className="mr-1" /> Code (Private)
                    </a>
                    <a href="http://Iitbbspravaah.in" className="text-sm text-purple-400 hover:text-purple-300 flex items-center" target="_blank">
                      <ExternalLink size={16} className="mr-1" /> Live Demo
                    </a>
                  </div>
                </div>
              </div>

              {/* Project 5 */}
              <div className="bg-[#1a1a2e] rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
                <div className="relative h-48">
                  <Image src="/coderelay.png" alt="Project 5" fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Code Relay 3.0 website</h3>
                  <p className="text-gray-400 mb-4">
                    A property listing platform with advanced search, map integration, and user accounts.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">React.js</span>
                    <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">Aceternity</span>
                    {/* <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">PostgreSQL</span> */}
                  </div>
                  <div className="flex gap-3">
                    <a href="#" className="text-sm text-purple-400 hover:text-purple-300 flex items-center">
                      <Github size={16} className="mr-1" /> Code
                    </a>
                    <a href="https://code-relay-9efd.vercel.app/" className="text-sm text-purple-400 hover:text-purple-300 flex items-center">
                      <ExternalLink size={16} className="mr-1" /> Live Demo
                    </a>
                  </div>
                </div>
              </div>

              {/* Project 6 */}
              {/* <div className="bg-[#1a1a2e] rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
                <div className="relative h-48">
                  <Image src="/placeholder.svg?height=200&width=400" alt="Project 6" fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Weather Dashboard</h3>
                  <p className="text-gray-400 mb-4">
                    A weather application with forecast data, location search, and interactive maps.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">JavaScript</span>
                    <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">Weather API</span>
                    <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">CSS3</span>
                  </div>
                  <div className="flex gap-3">
                    <a href="#" className="text-sm text-purple-400 hover:text-purple-300 flex items-center">
                      <Github size={16} className="mr-1" /> Code
                    </a>
                    <a href="#" className="text-sm text-purple-400 hover:text-purple-300 flex items-center">
                      <ExternalLink size={16} className="mr-1" /> Live Demo
                    </a>
                  </div>
                </div>
              </div> */}
            </div>
                      {/* from-[#1a1a2e] to-[#16213e] */}
            {/* <div className="text-center mt-12">
              <Button variant="outline" className="border-purple-500 bg-[#16213e] text-purple-400 hover:bg-purple-500/10 hover:text-white">
                View All Projects <ChevronRight size={16} className="ml-1" />
              </Button>
            </div> */}
          </div>
        </section>

        {/* Resume Section */}
        <section id="resume" className="py-20">
  <div className="container mx-auto px-4">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Resume</h2>
      <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-indigo-500 mx-auto"></div>
    </div>

    <div className="flex flex-col md:flex-row gap-10">
      <div className="md:w-1/2">
        <h3 className="text-2xl font-semibold mb-6 text-purple-400 flex items-center">
          <span className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
            <span className="text-purple-400">1</span>
          </span>
          Work Experience
        </h3>

        <div className="space-y-8">
          <div className="relative pl-8 border-l-2 border-purple-500/30 pb-8">
            <div className="absolute w-4 h-4 bg-purple-500 rounded-full -left-[9px] top-0"></div>
            <div className="bg-[#1a1a2e] p-6 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold mb-1">React Native Developer Intern</h4>
              <p className="text-purple-400 mb-2">Taroo AI | [July-September in 2025]</p>
              <p className="text-gray-400">
                Developed key components of a React Native mobile application from scratch. 
                Implemented state management using Zustand for efficient data flow across the application. 
                Integrated Firebase authentication to provide secure user login and registration flows.
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">React Native</span>
                <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">Firebase</span>
                <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">Zustand</span>
              </div>
            </div>
          </div>

          <div className="relative pl-8 border-l-2 border-purple-500/30 pb-8">
            <div className="absolute w-4 h-4 bg-purple-500 rounded-full -left-[9px] top-0"></div>
            <div className="bg-[#1a1a2e] p-6 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold mb-1">Full Stack Developer (Freelance)</h4>
              <p className="text-purple-400 mb-2">Zuno Gaming | [Dec - Jan 2024-25]</p>
              <p className="text-gray-400">
                Developed a full-stack gaming platform in React JS with separate user (gaming section) and admin sections. 
                Integrated real-time features using Appwrite, Razorpay payment integration, and a dedicated server-side clock for synchronized events.
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">MERN Stack</span>
                <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">Appwrite</span>
                <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">Razorpay</span>
              </div>
            </div>
          </div>

          <div className="relative pl-8 border-l-2 border-purple-500/30">
            <div className="absolute w-4 h-4 bg-purple-500 rounded-full -left-[9px] top-0"></div>
            <div className="bg-[#1a1a2e] p-6 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold mb-1">Web Lead</h4>
              <p className="text-purple-400 mb-2">WebnD Society, IIT Bhubaneswar | June 2024 - June 2025</p>
              <p className="text-gray-400">
                Oversee all web-related projects and initiatives within WebnD, and guide junior members in web development tasks.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="md:w-1/2">
        <h3 className="text-2xl font-semibold mb-6 text-purple-400 flex items-center">
          <span className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
            <span className="text-purple-400">2</span>
          </span>
          Education
        </h3>

        <div className="space-y-8">
          <div className="relative pl-8 border-l-2 border-purple-500/30 pb-8">
            <div className="absolute w-4 h-4 bg-purple-500 rounded-full -left-[9px] top-0"></div>
            <div className="bg-[#1a1a2e] p-6 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold mb-1">Bachelor of Technology in Mechanical Engineering</h4>
              <p className="text-purple-400 mb-2">Indian Institute of Technology Bhubaneswar | 2023 - 2027*</p>
              <p className="text-gray-400">
                CGPA: 8.59/10
              </p>
            </div>
          </div>

          <div className="relative pl-8 border-l-2 border-purple-500/30 pb-8">
            <div className="absolute w-4 h-4 bg-purple-500 rounded-full -left-[9px] top-0"></div>
            <div className="bg-[#1a1a2e] p-6 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold mb-1">Intermediate (12th Standard)</h4>
              <p className="text-purple-400 mb-2">Central Board for Secondary Education | 2023</p>
              <p className="text-gray-400">
                Percentage: 94.4%
              </p>
            </div>
          </div>

          <div className="relative pl-8 border-l-2 border-purple-500/30">
            <div className="absolute w-4 h-4 bg-purple-500 rounded-full -left-[9px] top-0"></div>
            <div className="bg-[#1a1a2e] p-6 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold mb-1">Secondary School Certificate (10th Standard)</h4>
              <p className="text-purple-400 mb-2">Council for Indian School Certificate Examination | 2021</p>
              <p className="text-gray-400">
                Percentage: 96.6%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="text-center mt-12">
      <a href="https://drive.google.com/file/d/1yF2thUvQ-nn0Z_pGt3_Jd3kcdCyfxx6o/view?usp=sharing" target="_blank">
        <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
          <Download size={16} className="mr-2" /> Download Resume
        </Button>
      </a>
    </div>
  </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-[#16213e]/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-indigo-500 mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-purple-400">Contact Information</h3>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mr-4">
                      <Mail className="text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-1">Email</h4>
                      <p className="text-gray-400">raj.adi792@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mr-4">
                      <Linkedin className="text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-1">LinkedIn</h4>
                      <p className="text-gray-400">linkedin.com/in/aditya-raj-b13b491b7</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mr-4">
                      <Github className="text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-1">GitHub</h4>
                      <p className="text-gray-400">github.com/Ranchi-Raj</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <h3 className="text-2xl font-semibold mb-6 text-purple-400">Follow Me</h3>
                  <div className="flex gap-4">
                    <a
                      href="https://github.com/Ranchi-Raj"
                      target="_blank"
                      className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center hover:bg-purple-500/30 transition-colors"
                    >
                      <Github className="text-purple-400 w-5 h-5" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/aditya-raj-b13b491b7/"
                      target="_blank"
                      className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center hover:bg-purple-500/30 transition-colors"
                    >
                      <Linkedin className="text-purple-400 w-5 h-5" />
                    </a>
                    {/* <a
                      href="#"
                      className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center hover:bg-purple-500/30 transition-colors"
                    >
                      <Twitter className="text-purple-400 w-5 h-5" />
                    </a> */}
                    <a
                      href="mailto:raj.adi792@gmail.com"
                      className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center hover:bg-purple-500/30 transition-colors"
                    >
                      <Mail className="text-purple-400 w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-6 text-purple-400">Send Me a Message</h3>

                <form ref={form} className="space-y-6" onSubmit={sendEmail}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-gray-300">
                        Your Name
                      </label>
                      <input  
                        type="text"
                        id="name"
                        value={parms.name}
                        onChange={(e) => setParms({ ...parms, name: e.target.value })}
                        className="w-full px-4 py-3 bg-[#1a1a2e] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                        placeholder="Aditya Raj"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-gray-300">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={parms.email}
                        onChange={(e) => setParms({ ...parms, email: e.target.value })}
                        className="w-full px-4 py-3 bg-[#1a1a2e] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                        placeholder="raj@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-gray-300">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      value={parms.subject}
                      onChange={(e) => setParms({ ...parms, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-[#1a1a2e] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                      placeholder="Project Inquiry"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-gray-300">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={parms.message}
                      onChange={(e) => setParms({ ...parms, message: e.target.value })}
                      className="w-full px-4 py-3 bg-[#1a1a2e] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white resize-none"
                      placeholder="Your message here..."
                    ></textarea>
                  </div>

                  <div className="flex justify-center">
                  <Button
                    onClick={sendEmail}
                    className=" bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                  >
                    Send Message
                  </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 bg-[#1a1a2e] border-t border-gray-800">
        <div className="container mx-auto px-4 text-center">
          {/* <p className="text-gray-400">&copy; {new Date().getFullYear()} Joh. All rights reserved.</p> */}
          <p className="text-gray-500 text-sm mt-2">Made with ❤️ by Aditya</p>
        </div>
      </footer>
    </div>
  )
}
