import Link from "next/link"

import { Button } from "../ui/button"

export function Logo() {
  return (
    <Button asChild variant={"ghost"}>
      <Link href={"/"} className="gap-x-2 px-0">
        <Icon className="size-10" />
        <span className="text-5xl font-black leading-10">Tarc</span>
      </Link>
    </Button>
  )
}

export function Icon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <mask id="logo-mask">
          <rect x="0" y="0" width="280" height="280" fill="white" />
          <path
            fill="black"
            fill-rule="evenodd"
            clip-rule="evenodd"
            className="origin-center rotate-45"
            d="M72 140.641C72 108.391 94.1651 81.3519 124 74.1106V41.2816C76.3772 48.9889 40 90.5396 40 140.641C40 190.742 76.3772 232.293 124 240V207.171C94.1651 199.93 72 172.89 72 140.641ZM240 140.641C240 190.742 203.623 232.293 156 240V207.171C185.835 199.93 208 172.89 208 140.641C208 108.391 185.835 81.3519 156 74.1106V41.2816C203.623 48.9889 240 90.5396 240 140.641Z"
          />
        </mask>
      </defs>
      <rect
        x="0"
        y="0"
        width="280"
        height="280"
        rx="32"
        className="fill-primary"
        mask="url(#logo-mask)"
      />
    </svg>
  )
}
