import { cn } from "@/lib/utils"

interface SectionDividerProps {
  className?: string
  variant?: "wave" | "curve" | "triangle" | "zigzag"
  position?: "top" | "bottom"
  fill?: string
}

export default function SectionDivider({
  className,
  variant = "wave",
  position = "bottom",
  fill = "fill-white",
}: SectionDividerProps) {
  const isTop = position === "top"

  const getPath = () => {
    switch (variant) {
      case "wave":
        return (
          <path
            d="M0,32L48,37.3C96,43,192,53,288,53.3C384,53,480,43,576,48C672,53,768,75,864,80C960,85,1056,75,1152,64C1248,53,1344,43,1392,37.3L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            fill="currentColor"
            fillOpacity="1"
          ></path>
        )
      case "curve":
        return <path d="M0,0L1440,96L1440,0L0,0Z" fill="currentColor" fillOpacity="1"></path>
      case "triangle":
        return <path d="M0,0L720,96L1440,0L1440,0L0,0Z" fill="currentColor" fillOpacity="1"></path>
      case "zigzag":
        return (
          <path
            d="M0,32L120,37.3C240,43,480,53,720,53.3C960,53,1200,43,1320,37.3L1440,32L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"
            fill="currentColor"
            fillOpacity="1"
          ></path>
        )
      default:
        return (
          <path
            d="M0,32L48,37.3C96,43,192,53,288,53.3C384,53,480,43,576,48C672,53,768,75,864,80C960,85,1056,75,1152,64C1248,53,1344,43,1392,37.3L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            fill="currentColor"
            fillOpacity="1"
          ></path>
        )
    }
  }

  return (
    <div
      className={cn(
        "absolute left-0 right-0 w-full overflow-hidden leading-0 z-10",
        isTop ? "top-0 rotate-180" : "bottom-0",
        className,
      )}
    >
      <svg
        className={cn("relative block w-full h-12 md:h-16", fill)}
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {getPath()}
      </svg>
    </div>
  )
}
