"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Heart, Gift, Sparkles } from "lucide-react"

interface SlideData {
  id: number
  type: "intro" | "photo" | "message" | "memory" | "finale"
  title?: string
  content?: string
  image?: string
}

const slides: SlideData[] = [
  {
    id: 1,
    type: "intro",
    title: "Happy Birthday Dad!",
    content: "A special celebration just for you",
  },
  {
    id: 2,
    type: "photo",
    title: "Beautiful Memories",
    content: "Every moment with you is a treasure, you've given me the best memories, the best childhood. I appreciate all that you stand for, and I have the utmost respect for you.",
  image: "/1.jpg",
  },
  {
    id: 3,
    type: "message",
    title: "You Are Amazing",
    content:
      "Your kindness, wisdom, and love are truly inspiring. Today we celebrate the incredible person you are and all the joy you bring to life. Thank you for always being you, Dad. You taught me that I won't always be able to make everybody happy, so I started loving myself before worrying about everything else. Since then, my life has been abundant with joy and blessings.",
  },
  {
    id: 4,
    type: "photo",
    title: "Cherished Moments",
    content: "Adventures and laughter we'll never forget",
  image: "/2.jpg",
  },
  {
    id: 5,
    type: "memory",
    title: "Remember When...",
    content:
      "You fed me dosa at the temple, you brought me food from taco bell, panera, pizza hut all the time after school. You drove me to tae kwon do, then to basketball for so many years. You watched all of my games throughout school and I am so glad you were there for it. You've supported me through rough rough times, and I appreciate with all my heart. I don't express my emotions often, but I truly love you more than anything, and I am so grateful to have gotten to know more of you in this last year.",
  },
  {
    id: 6,
    type: "photo",
    title: "Thank You",
    content: "Thank you for your guidance and support. Your wisdom, kindness, and determination inspires me to be a better man every day. Much love, I love you till death and beyond, I forever cherish your impact on my life.",
  image: "/3.jpg",
  },
  {
    id: 7,
    type: "finale",
    title: "Here's to Another Year!",
    content:
      "Of adventures, laughter, love, and all the wonderful things that make you uniquely you. Happy Birthday Dad! 🎉",
  },
]

export default function BirthdaySlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVisible, setIsVisible] = useState<boolean[]>(new Array(slides.length).fill(false))
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])
  const [scrollProgress, setScrollProgress] = useState(0)
  const [fireworks, setFireworks] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; y: number; color: string; delay: number }>>(
    [],
  )
  const [balloons, setBalloons] = useState<Array<{ id: number; x: number; color: string; delay: number }>>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = slideRefs.current.indexOf(entry.target as HTMLDivElement)
          if (index !== -1) {
            setIsVisible((prev) => {
              const newVisible = [...prev]
              newVisible[index] = entry.isIntersecting
              return newVisible
            })
            if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
              setCurrentSlide(index)
            }
          }
        })
      },
      { threshold: [0.1, 0.3, 0.5, 0.7, 0.9] },
    )

    slideRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollContainer = document.querySelector(".scroll-container")
      if (scrollContainer) {
        const scrollTop = scrollContainer.scrollTop
        const scrollHeight = scrollContainer.scrollHeight - scrollContainer.clientHeight
        const progress = scrollTop / scrollHeight
        setScrollProgress(progress)
      }
    }

    const scrollContainer = document.querySelector(".scroll-container")
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll, { passive: true })
      return () => scrollContainer.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    // Create fireworks
    const newFireworks = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
    }))
    setFireworks(newFireworks)

    // Create confetti
    const newConfetti = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10 - Math.random() * 50,
      color: ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57", "#ff9ff3"][Math.floor(Math.random() * 6)],
      delay: Math.random() * 3,
    }))
    setConfetti(newConfetti)

    // Create balloons
    const newBalloons = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 90,
      color: ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57", "#ff9ff3"][Math.floor(Math.random() * 6)],
      delay: Math.random() * 2,
    }))
    setBalloons(newBalloons)
  }, [])

  const scrollToSlide = (index: number) => {
    slideRefs.current[index]?.scrollIntoView({ behavior: "smooth" })
    setCurrentSlide(index)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-accent/5 via-secondary/5 to-primary/10 relative overflow-hidden">
      {/* Fireworks */}
      {fireworks.map((firework) => (
        <div
          key={`firework-${firework.id}`}
          className="fixed pointer-events-none z-30"
          style={{
            left: `${firework.x}%`,
            top: `${firework.y}%`,
            animationDelay: `${firework.delay}s`,
          }}
        >
          <div className="firework-rocket"></div>
          <div className="firework-explosion"></div>
        </div>
      ))}

      {/* Confetti Rain */}
      {confetti.map((piece) => (
        <div
          key={`confetti-${piece.id}`}
          className="fixed w-3 h-3 pointer-events-none z-20 confetti-piece"
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}s`,
          }}
        />
      ))}

      {/* Floating Balloons */}
      {balloons.map((balloon) => (
        <div
          key={`balloon-${balloon.id}`}
          className="fixed pointer-events-none z-10 balloon"
          style={{
            left: `${balloon.x}%`,
            bottom: "-100px",
            animationDelay: `${balloon.delay}s`,
          }}
        >
          <div className="w-12 h-16 rounded-full shadow-lg balloon-body" style={{ backgroundColor: balloon.color }} />
          <div className="w-px h-8 bg-gray-400 mx-auto balloon-string" />
        </div>
      ))}

      {/* Sparkle Trail */}
      <div className="fixed inset-0 pointer-events-none z-25">
        {[...Array(20)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute sparkle-trail"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          >
            ✨
          </div>
        ))}
      </div>

      {/* Shooting Stars */}
      <div className="fixed inset-0 pointer-events-none z-15">
        {[...Array(6)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute shooting-star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 50}%`,
              animationDelay: `${Math.random() * 6}s`,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
        <Card className="px-4 py-2 bg-card/80 backdrop-blur-md border-border/50">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? "bg-primary scale-125"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </Card>
      </nav>

      {/* Slides */}
      <div className="scroll-container h-screen overflow-y-auto scroll-smooth">
        {slides.map((slide, index) => {
          const slideProgress = Math.max(
            0,
            Math.min(1, scrollProgress && !isNaN(scrollProgress) ? scrollProgress * slides.length - index + 0.5 : 0),
          )
          const slideOpacity = Math.max(
            0,
            Math.min(1, slideProgress && !isNaN(slideProgress) ? slideProgress * 2 - 0.5 : 0),
          )
          const slideTransform = `translateY(${(1 - slideProgress) * 20}px) scale(${0.95 + slideProgress * 0.05})`

          return (
            <div
              key={slide.id}
              ref={(el) => (slideRefs.current[index] = el)}
              className="min-h-screen flex items-center justify-center relative overflow-hidden"
              style={{ paddingTop: "2rem", paddingBottom: "2rem" }}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(120,119,198,0.05)_25%,rgba(120,119,198,0.05)_50%,transparent_50%,transparent_75%,rgba(120,119,198,0.05)_75%)] bg-[length:60px_60px]" />
              </div>

              {/* Content */}
              <div
                className="relative z-10 max-w-4xl mx-auto px-6 text-center transition-all duration-500 ease-out"
                style={{
                  opacity: isVisible[index] && !isNaN(slideOpacity) ? slideOpacity : 0,
                  transform: isVisible[index] ? slideTransform : "translateY(40px) scale(0.9)",
                }}
              >
                {slide.type === "intro" && (
                  <div className="space-y-8">
                    <div className="transition-all duration-700 ease-out" style={{ transitionDelay: "200ms" }}>
                      <Sparkles className="w-16 h-16 mx-auto text-primary mb-6 animate-pulse rainbow-sparkle" />
                      <h1 className="text-6xl md:text-8xl font-serif font-bold text-primary mb-4 text-balance rainbow-text animate-bounce-gentle">
                        {slide.title}
                      </h1>
                      <p className="text-xl md:text-2xl font-sans text-muted-foreground text-pretty">{slide.content}</p>
                    </div>
                    <div
                      className="flex justify-center gap-4 transition-all duration-700 ease-out"
                      style={{ transitionDelay: "400ms" }}
                    >
                      <Gift
                        className="w-8 h-8 text-accent animate-bounce celebration-icon"
                        style={{ animationDelay: "0s" }}
                      />
                      <Heart
                        className="w-8 h-8 text-secondary animate-bounce celebration-icon"
                        style={{ animationDelay: "0.2s" }}
                      />
                      <Sparkles
                        className="w-8 h-8 text-primary animate-bounce celebration-icon"
                        style={{ animationDelay: "0.4s" }}
                      />
                    </div>
                  </div>
                )}

                {slide.type === "photo" && (
                  <div className="space-y-8">
                    <div className="relative group">
                      <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                      <img
                        src={slide.image || "/placeholder.svg"}
                        alt={slide.title}
                        className="relative w-full max-w-2xl mx-auto rounded-2xl shadow-2xl transform group-hover:scale-105 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
                    </div>
                    <div className="transition-all duration-700 ease-out" style={{ transitionDelay: "300ms" }}>
                      <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4 text-balance">
                        {slide.title}
                      </h2>
                      <p className="text-lg md:text-xl font-sans text-muted-foreground text-pretty">{slide.content}</p>
                    </div>
                  </div>
                )}

                {(slide.type === "message" || slide.type === "memory") && (
                  <div className="space-y-8">
                    <div className="transition-all duration-700 ease-out" style={{ transitionDelay: "100ms" }}>
                      <div className="relative">
                        <div className="absolute -inset-8 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl blur-2xl" />
                        <Card className="relative p-12 bg-card/80 backdrop-blur-sm border-border/50 shadow-2xl">
                          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-8 text-balance">
                            {slide.title}
                          </h2>
                          <p className="text-lg md:text-xl font-sans leading-relaxed text-foreground text-pretty max-w-3xl">
                            {slide.content}
                          </p>
                        </Card>
                      </div>
                    </div>
                    <div className="transition-all duration-700 ease-out" style={{ transitionDelay: "400ms" }}>
                      <Heart className="w-12 h-12 mx-auto text-accent animate-pulse" />
                    </div>
                  </div>
                )}

                {slide.type === "finale" && (
                  <div className="space-y-8">
                    <div className="transition-all duration-700 ease-out" style={{ transitionDelay: "100ms" }}>
                      <div className="relative">
                        <div className="absolute -inset-12 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 rounded-full blur-3xl animate-pulse celebration-glow" />
                        <div className="relative space-y-6">
                          <h1 className="text-5xl md:text-7xl font-serif font-bold text-primary mb-6 text-balance rainbow-text celebration-bounce">
                            {slide.title}
                          </h1>
                          <p className="text-xl md:text-2xl font-sans text-foreground text-pretty max-w-3xl mx-auto">
                            {slide.content}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div
                      className="flex justify-center gap-6 transition-all duration-700 ease-out"
                      style={{ transitionDelay: "400ms" }}
                    >
                      {[...Array(5)].map((_, i) => (
                        <Sparkles
                          key={i}
                          className="w-10 h-10 text-accent animate-bounce celebration-sparkle"
                          style={{ animationDelay: `${i * 0.1}s` }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Floating Elements */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-accent/30 rounded-full animate-float celebration-float"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${30 + (i % 3) * 20}%`,
                      animationDelay: `${i * 0.5}s`,
                      animationDuration: `${3 + i * 0.5}s`,
                      opacity: isVisible[index] && !isNaN(slideOpacity) ? slideOpacity * 0.7 : 0,
                      transition: "opacity 0.5s ease-out",
                    }}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes fireworkRocket {
          0% { transform: translateY(100vh) translateX(0) scale(0.5); opacity: 1; }
          70% { transform: translateY(-20vh) translateX(20px) scale(1); opacity: 1; }
          100% { transform: translateY(-30vh) translateX(30px) scale(0); opacity: 0; }
        }
        
        @keyframes fireworkExplosion {
          0% { transform: scale(0); opacity: 0; }
          20% { transform: scale(0); opacity: 0; }
          30% { transform: scale(1); opacity: 1; }
          100% { transform: scale(3); opacity: 0; }
        }
        
        @keyframes confettiFall {
          0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        
        @keyframes balloonFloat {
          0% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-50vh) rotate(2deg); }
          100% { transform: translateY(-120vh) rotate(-2deg); }
        }
        
        @keyframes sparkleTrail {
          0%, 100% { transform: scale(0) rotate(0deg); opacity: 0; }
          50% { transform: scale(1.5) rotate(180deg); opacity: 1; }
        }
        
        @keyframes shootingStar {
          0% { transform: translateX(-100px) translateY(0) rotate(45deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(100vw) translateY(50px) rotate(45deg); opacity: 0; }
        }
        
        @keyframes rainbow {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }
        
        @keyframes celebrationGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 107, 107, 0.5), 0 0 40px rgba(78, 205, 196, 0.3), 0 0 60px rgba(69, 183, 209, 0.2); }
          50% { box-shadow: 0 0 40px rgba(255, 107, 107, 0.8), 0 0 80px rgba(78, 205, 196, 0.6), 0 0 120px rgba(69, 183, 209, 0.4); }
        }
        
        @keyframes gentleBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .firework-rocket {
          width: 4px;
          height: 20px;
          background: linear-gradient(to top, #ff6b6b, #feca57);
          border-radius: 2px;
          animation: fireworkRocket 3s ease-out infinite;
        }
        
        .firework-explosion {
          position: absolute;
          top: -10px;
          left: -15px;
          width: 30px;
          height: 30px;
          background: radial-gradient(circle, #ff6b6b 0%, #feca57 30%, #4ecdc4 60%, transparent 100%);
          border-radius: 50%;
          animation: fireworkExplosion 3s ease-out infinite;
          animation-delay: 2s;
        }
        
        .confetti-piece {
          border-radius: 2px;
          animation: confettiFall 4s linear infinite;
        }
        
        .balloon {
          animation: balloonFloat 15s ease-in-out infinite;
        }
        
        .balloon-body {
          position: relative;
        }
        
        .balloon-body::before {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-top: 6px solid currentColor;
        }
        
        .balloon-string {
          margin-top: -2px;
        }
        
        .sparkle-trail {
          font-size: 1.5rem;
          animation: sparkleTrail 2s ease-in-out infinite;
        }
        
        .shooting-star {
          width: 2px;
          height: 2px;
          background: linear-gradient(45deg, #fff, #feca57);
          border-radius: 50%;
          box-shadow: 0 0 10px #feca57, -20px -5px 0 -2px #fff, -40px -10px 0 -4px #feca57;
          animation: shootingStar 8s linear infinite;
        }
        
        .rainbow-text {
          animation: rainbow 3s linear infinite;
        }
        
        .rainbow-sparkle {
          animation: rainbow 2s linear infinite, pulse 1s ease-in-out infinite;
        }
        
        .celebration-glow {
          animation: celebrationGlow 2s ease-in-out infinite;
        }
        
        .celebration-bounce {
          animation: gentleBounce 2s ease-in-out infinite;
        }
        
        .celebration-icon {
          animation: bounce 1s infinite, rainbow 3s linear infinite;
        }
        
        .celebration-sparkle {
          animation: bounce 1s infinite, rainbow 2s linear infinite;
        }
        
        .celebration-float {
          animation: float 3s ease-in-out infinite, rainbow 4s linear infinite;
        }
        
        .animate-bounce-gentle {
          animation: gentleBounce 3s ease-in-out infinite;
        }
        
        .scroll-container {
          scroll-behavior: smooth;
        }
        .scroll-container::-webkit-scrollbar {
          width: 4px;
        }
        .scroll-container::-webkit-scrollbar-track {
          background: transparent;
        }
        .scroll-container::-webkit-scrollbar-thumb {
          background: rgba(120, 119, 198, 0.3);
          border-radius: 2px;
        }
        .scroll-container::-webkit-scrollbar-thumb:hover {
          background: rgba(120, 119, 198, 0.5);
        }
      `}</style>
    </div>
  )
}
