"use client"
import Image from "next/image"
import Marquee from "react-fast-marquee"
import { Badge } from "@/components/ui/badge"

export default function ClientsSection() {
  const clients = [
    { name: "TechCorp", logo: "/placeholder.svg?height=60&width=120" },
    { name: "InnovateLabs", logo: "/placeholder.svg?height=60&width=120" },
    { name: "GrowthPartners", logo: "/placeholder.svg?height=60&width=120" },
    { name: "FutureVision", logo: "/placeholder.svg?height=60&width=120" },
    { name: "NextLevel", logo: "/placeholder.svg?height=60&width=120" },
    { name: "PeakPerformance", logo: "/placeholder.svg?height=60&width=120" },
    { name: "EliteServices", logo: "/placeholder.svg?height=60&width=120" },
    { name: "PrimeConsulting", logo: "/placeholder.svg?height=60&width=120" },
  ]

  return (
    <section className="py-12 bg-white relative overflow-hidden">
      <div className="container-wide relative z-10">
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-blue-100 text-primary hover:bg-blue-200">Trusted by</Badge>
          <h2 className="text-2xl font-bold">Companies that trust us</h2>
        </div>

        <Marquee gradient={true} gradientWidth={50} speed={40} pauseOnHover={true} className="py-4">
          <div className="flex items-center gap-16">
            {clients.map((client, index) => (
              <div key={index} className="mx-4 grayscale hover:grayscale-0 transition-all duration-300">
                <Image
                  src={client.logo || "/placeholder.svg"}
                  alt={client.name}
                  width={120}
                  height={60}
                  className="h-12 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  )
}
