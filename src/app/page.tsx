"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useRef, useEffect, useState  } from "react";
import * as THREE from "three";
import Navbar from "@/components/Navbar";

function MovingStars() {
  const groupRef = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0, y: 0 });
  const scrollOffset = useRef(0);

  const handleMouseMove = (event: MouseEvent) => {
    targetRotation.current.x = event.clientY * 0.0005;
    targetRotation.current.y = event.clientX * 0.0005;
  };

  const handleScroll = () => {
    scrollOffset.current = window.scrollY * 0.0005; // fator pequeno para suavidade
  };

  useFrame(() => {
    if (groupRef.current) {
      // Efeito do rato
      groupRef.current.rotation.x +=
        (targetRotation.current.x - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.y +=
        (targetRotation.current.y - groupRef.current.rotation.y) * 0.05;

      // Efeito do scroll (rotação no eixo Z)
      groupRef.current.rotation.z = scrollOffset.current;
    }
  });

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <group ref={groupRef}>
      <Stars radius={100} depth={50} count={5000} factor={4} fade />
    </group>
  );
}
const glitchColors = ["#ff0000", "#00ffea", "#ffffff", "#ffff00", "#ff00ff"];
export default function Home() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end center"], // anima antes de chegar ao final
  });

  // Animação para o título
  const titleY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Animação para o parágrafo
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.35], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.10, 0.35], [50, 0]);
  const text2Opacity = useTransform(scrollYProgress, [0.25, 0.45], [0, 1]);
  const text2X = useTransform(scrollYProgress, [0.25, 0.45], [-200, 0]);

  // Lista de cores para o "glitch"
  const [glitchColor, setGlitchColor] = useState(glitchColors[0]);

  // Muda a cor da palavra "problemas" a cada 200ms
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchColor(glitchColors[Math.floor(Math.random() * glitchColors.length)]);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative min-h-screen w-full bg-black text-white overflow-hidden">
      <Navbar />

      {/* Fundo 3D interativo */}
      <div className="fixed inset-0 z-0">
        <Canvas>
          <MovingStars />
        </Canvas>
      </div>

      {/* Hero */}
    <section
      ref={ref}
      className="z-10 flex flex-col justify-center h-screen text-center p-6 mt-30"
    >
      {/* Título */}
      <motion.h1
        style={{ y: titleY, opacity: titleOpacity }}
        className="text-5xl md:text-7xl font-bold"
      >
        <span className="text-white">Olá, chamo-me</span>{" "}
        <span className="text-blue-500">Dragos</span>
      </motion.h1>

      {/* Texto que aparece ao scroll */}
      <motion.p
        style={{ y: textY, opacity: textOpacity }}
        className="mt-20 text-2xl md:text-3xl text-gray-300 max-w-3xl mx-auto"
      >
        Sou programador e técnico informático, especializado na criação de
        websites e aplicações web, bem como em infraestruturas e redes.
      </motion.p>
        <motion.p
          style={{ x: text2X, opacity: text2Opacity }}
          className="mt-30 text-2xl md:text-3xl text-gray-300 max-w-3xl mx-auto"
        >
          Gosto de ver os{" "}
          <span style={{ color: glitchColor, transition: "color 0.1s" }}>
            problemas
          </span>
        </motion.p>
    </section>

    <div className="mb-30"></div>

      {/* Projetos */}
      <section id="projetos" className="relative z-15 py-24 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12"
        >
          Projetos
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[1, 2, 3].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-white/10 p-6 rounded-xl hover:bg-white/20 transition"
            >
              <h3 className="text-xl font-semibold mb-2">Projeto {i + 1}</h3>
              <p className="text-gray-300 text-sm">
                Descrição breve do projeto {i + 1} com foco nas tecnologias utilizadas.
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" className="relative z-10 py-24 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12"
        >
          Sobre Mim
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center text-gray-300 text-lg"
        >
          Atualmente tenho 20 anos e estou na faculdade em Engenharia de Telecomunicações e Informática. 
          Desde o início do meu curso profissional de Técnico de Gestão e Programação de Sistemas Informáticos
          , em 2019, tenho me mantido ativo num percurso contínuo no que toca à programação e Informática
          Ao longo destes anos, acumulei experiência prática e profissional como programador, técnico tanto com 
          maquinas virtuais como em redes, trabalhando com diversas tecnologias — desde HTML, CSS, JavaScript, 
          PHP, SQL e WordPress — desenvolvendo soluções tanto no front-end como no back-end.
          Possuo experiência na configuração de máquinas virtuais com VMware, implementação de redes e 
          aplicação de medidas de segurança para proteção de sistemas. Para além da vertente técnica, destaco-me 
          pela capacidade de comunicação, adaptabilidade e facilidade em explicar conceitos técnicos a públicos 
          não especializados.
          O meu objetivo é continuar a evoluir profissionalmente, explorando novas tecnologias e contribuindo 
          para projetos que cada vez mais causam um maior impacto.
        </motion.p>
      </section>
<section
  id="contact"
  className="relative bg-gradient-to-b from-transparent via-transparent via-[20%] to-gray-900 text-white py-16 px-6"
>
  <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
    {/* Formulário */}
    <div className="md:col-span-2">
      <h2 className="text-3xl font-bold mb-4">Envia-me uma mensagem</h2>
      <p className="text-gray-300 mb-8">
        Estou sempre aberto a novas oportunidades e colaborações.
      </p>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="O teu nome"
          className="w-full p-3 rounded bg-gray-800/60 border border-gray-700 focus:outline-none focus:border-blue-500"
        />
        <input
          type="email"
          placeholder="O teu email"
          className="w-full p-3 rounded bg-gray-800/60 border border-gray-700 focus:outline-none focus:border-blue-500"
        />
        <textarea
          placeholder="Escreve a tua mensagem..."
          rows={5}
          className="w-full p-3 rounded bg-gray-800/60 border border-gray-700 focus:outline-none focus:border-blue-500"
        ></textarea>
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 rounded font-semibold hover:bg-blue-800 transition"
        >
          Enviar
        </button>
      </form>
    </div>

    {/* Informação de contacto */}
    <div>
      <h3 className="text-xl font-semibold mb-4">Visita o meu escritório</h3>
      <p className="text-gray-400 mb-6">
        456 Rua Nova, 22000 Lisboa, Portugal
      </p>

      <h3 className="text-xl font-semibold mb-4">Contacto</h3>
      <p className="text-gray-400">
        <i className="fa fa-phone mr-2"></i> +351 912 345 678
      </p>
      <p className="text-gray-400">
        <i className="fa fa-envelope mr-2"></i>{" "}
        <a href="mailto:dragos@email.com" className="hover:underline">
          dragos@email.com
        </a>
      </p>
      <p className="text-gray-400">
        <i className="fa fa-globe mr-2"></i>{" "}
        <a href="#" className="hover:underline">
          dragos.dev
        </a>
      </p>
    </div>
  </div>
</section>

    </main>
  );
}