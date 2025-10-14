"use client"
import React from "react"
import Link from "next/link"
import { ArrowRight, ChevronRight, Github, Linkedin, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TextEffect } from "@/components/ui/text-effect"
import { AnimatedGroup } from "@/components/ui/animated-group"
import { HeroHeader } from "./header"

const transitionVariants = {
  item: {
    hidden: { opacity: 0, filter: "blur(12px)", y: 12 },
    visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { type: "spring" as const, bounce: 0.3, duration: 1.5 } },
  },
}

export default function HeroSection() {
  return (
    <>
      <main className="overflow-hidden pt-20">
        <section className="relative pt-24 md:pt-36 text-center px-6 max-w-7xl mx-auto">
          <AnimatedGroup variants={transitionVariants}>
            <Link
              href="#link"
              className="hover:bg-background dark:hover:border-t-border bg-muted group mx-auto flex w-fit items-center gap-4 rounded-full border p-1 pl-4 shadow-md shadow-zinc-950/5 transition-colors duration-300 dark:border-t-white/5 dark:shadow-zinc-950"
            >
              <span className="text-foreground text-sm">Introducing Inflyte API Suite</span>
              <span className="dark:border-background block h-4 w-0.5 border-l bg-white dark:bg-zinc-700"></span>
              <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
                <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                  <ArrowRight className="m-auto size-3" />
                  <ArrowRight className="m-auto size-3" />
                </div>
              </div>
            </Link>
          </AnimatedGroup>

          <TextEffect
            preset="fade-in-blur"
            speedSegment={0.3}
            as="h1"
            className="mx-auto mt-8 max-w-4xl text-balance text-5xl max-md:font-semibold md:text-7xl lg:mt-16 xl:text-[5.25rem]"
          >
            Powering the Next Generation of API Integrations
          </TextEffect>

          <TextEffect
            per="line"
            preset="fade-in-blur"
            speedSegment={0.3}
            delay={0.5}
            as="p"
            className="mx-auto mt-8 max-w-2xl text-balance text-lg text-muted-foreground"
          >
            Inflyte lets you analyze, generate charts, understand as well as build APIs in minutes — create, visualize requests, and monitor everything in one dashboard.
          </TextEffect>

          <AnimatedGroup
            variants={{
              container: { visible: { transition: { staggerChildren: 0.05, delayChildren: 0.75 } } },
              ...transitionVariants,
            }}
            className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row"
          >
            <Button asChild size="lg" variant="ghost" className="h-10.5 rounded-xl px-5">
              <Link href="/docs"><span className="text-nowrap">Read Docs</span></Link>
            </Button>
          </AnimatedGroup>

          <div id="features" className="mt-20 grid gap-8 md:grid-cols-3">
            <div className="p-6 rounded-xl bg-muted/40 hover:bg-muted/60 transition">
              <h3 className="text-xl font-semibold mb-2">API Builder</h3>
              <p className="text-sm text-muted-foreground">Create and test APIs visually with our interactive workspace and AI. No setup required.</p>
            </div>
            <div className="p-6 rounded-xl bg-muted/40 hover:bg-muted/60 transition">
              <h3 className="text-xl font-semibold mb-2">Analytics</h3>
              <p className="text-sm text-muted-foreground">Get insights into structure, different objects - present in the API. Generate requests to different endpoints. Get graphs about usage, and many more.</p>
            </div>
            <div className="p-6 rounded-xl bg-muted/40 hover:bg-muted/60 transition">
              <h3 className="text-xl font-semibold mb-2">Integrations</h3>
              <p className="text-sm text-muted-foreground">Connect APIs seamlessly and easily. Build and test new APIs as well.</p>
            </div>
          </div>
        </section>

        {/* Social handles */}
        <section className="bg-background py-16 border-t border-border mt-20">
          <div className="flex justify-center gap-8">
            <Link href="https://linkedin.com/in/shreejan-dolai-29a168385" target="_blank" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin size={22} /></Link>
            <Link href="https://github.com/spyke7" target="_blank" className="text-muted-foreground hover:text-primary transition-colors"><Github size={22} /></Link>
            <Link href="https://x.com" target="_blank" className="text-muted-foreground hover:text-primary transition-colors"><Twitter size={22} /></Link>
          </div>
        </section>
      </main>
    </>
  )
}
