import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import heroVilla from "@/assets/hero-villa.jpg";
import houseNight from "@/assets/house-night.jpg";
import plotsAerial from "@/assets/plots-aerial.jpg";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactBar } from "@/components/ContactBar";
import { projects } from "@/lib/company";

const imageMap: Record<string, string> = {
  "hero-villa.jpg": heroVilla,
  "house-night.jpg": houseNight,
  "plots-aerial.jpg": plotsAerial,
};

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Gallery - Our Projects | Guru Shree Sai Realators" },
      {
        name: "description",
        content:
          "View our completed real estate projects including residential villas, apartments, commercial spaces, and plots across Bengaluru.",
      },
      {
        property: "og:title",
        content: "Our Projects Gallery - Guru Shree Sai Realators",
      },
      {
        property: "og:description",
        content:
          "Explore our portfolio of completed residential, commercial, and industrial projects.",
      },
    ],
  }),
  component: Projects,
});

function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);

  const categories = [...new Set(projects.map((p) => p.category))];
  const filteredProjects = selectedCategory
    ? projects.filter((p) => p.category === selectedCategory)
    : projects;

  const currentIndex = selectedProject ? filteredProjects.indexOf(selectedProject) : -1;

  const handleNext = () => {
    if (currentIndex < filteredProjects.length - 1) {
      setSelectedProject(filteredProjects[currentIndex + 1]);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setSelectedProject(filteredProjects[currentIndex - 1]);
    }
  };

  return (
    <div className="min-h-screen pb-16 sm:pb-0">
      <SiteHeader />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 to-background px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <p className="eyebrow text-primary">Our Portfolio</p>
            <h1 className="mt-3 font-display text-3xl sm:text-5xl">Completed Projects</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Explore our portfolio of completed residential, commercial, industrial and
              residential plot projects across Bengaluru. Each project reflects our commitment to
              quality, innovation and customer satisfaction.
            </p>
          </div>
        </section>

        {/* Filter Section */}
        <section className="border-b border-border bg-secondary/30 px-4 py-8">
          <div className="mx-auto max-w-6xl">
            <p className="mb-4 text-sm font-semibold text-muted-foreground">Filter by Category</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`rounded-sm px-4 py-2 text-sm font-medium transition-colors ${
                  selectedCategory === null
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-card text-foreground hover:bg-secondary"
                }`}
              >
                All Projects ({projects.length})
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-sm px-4 py-2 text-sm font-medium transition-colors ${
                    selectedCategory === cat
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-card text-foreground hover:bg-secondary"
                  }`}
                >
                  {cat} ({projects.filter((p) => p.category === cat).length})
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="group overflow-hidden rounded-md border border-border transition-all hover:border-accent hover:shadow-lg"
                >
                  <div className="relative h-48 overflow-hidden bg-muted">
                    <img
                      src={imageMap[project.image] || heroVilla}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                        {project.category}
                      </p>
                      <h3 className="mt-2 font-display text-lg font-semibold">{project.title}</h3>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-muted-foreground">{project.location}</p>
                    <p className="mt-2 line-clamp-2 text-sm text-foreground">
                      {project.description}
                    </p>
                    <p className="mt-3 text-xs font-medium text-primary">Completed {project.year}</p>
                  </div>
                </button>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="rounded-md border border-border bg-card p-12 text-center">
                <p className="text-muted-foreground">No projects found in this category.</p>
              </div>
            )}
          </div>
        </section>

        {/* Project Detail Modal */}
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white backdrop-blur transition-colors hover:bg-white/20"
              aria-label="Close"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div
              className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-card"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              <div className="relative h-96 overflow-hidden bg-muted">
                <img
                  src={imageMap[selectedProject.image] || heroVilla}
                  alt={selectedProject.title}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                      {selectedProject.category}
                    </p>
                    <h2 className="mt-2 font-display text-2xl sm:text-4xl">
                      {selectedProject.title}
                    </h2>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Location
                    </p>
                    <p className="mt-2 text-foreground">{selectedProject.location}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Completed
                    </p>
                    <p className="mt-2 text-foreground">{selectedProject.year}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Description
                  </p>
                  <p className="mt-2 leading-relaxed text-foreground">
                    {selectedProject.description}
                  </p>
                </div>

                {selectedProject.details && selectedProject.details.length > 0 && (
                  <div className="mt-6">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Highlights
                    </p>
                    <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                      {selectedProject.details.map((detail, idx) => (
                        <li key={idx} className="flex gap-2 text-foreground">
                          <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-accent" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Navigation */}
                <div className="mt-8 flex items-center justify-between">
                  <button
                    onClick={handlePrev}
                    disabled={currentIndex <= 0}
                    className="inline-flex items-center gap-2 rounded-sm border border-border bg-secondary px-4 py-2 text-sm font-medium text-foreground transition-colors disabled:opacity-50 hover:enabled:bg-primary hover:enabled:text-primary-foreground"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </button>

                  <span className="text-sm text-muted-foreground">
                    {currentIndex + 1} of {filteredProjects.length}
                  </span>

                  <button
                    onClick={handleNext}
                    disabled={currentIndex >= filteredProjects.length - 1}
                    className="inline-flex items-center gap-2 rounded-sm border border-border bg-secondary px-4 py-2 text-sm font-medium text-foreground transition-colors disabled:opacity-50 hover:enabled:bg-primary hover:enabled:text-primary-foreground"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <ContactBar />
      <SiteFooter />
    </div>
  );
}
