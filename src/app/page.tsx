import { HeroCover } from '@/components/HeroCover';
import { About } from '@/components/About';
import { ExperienceHomeList } from '@/components/ExperienceHomeList';
import { ProjectsHome } from '@/components/ProjectsHome';
import { BlogHomeList } from '@/components/BlogHomeList';
import { Education } from '@/components/Education';
import { Skills } from '@/components/Skills';
import { Testimonials } from '@/components/Testimonials';
import { BookCall } from '@/components/BookCall';
import { AnimatedSocialLinks } from '@/components/AnimatedSocialLinks';
// dead code — re-enable when GRAPHQL_TOKEN works
// import { GitHubActivity } from '@/components/GitHubActivity';
import { Chatbot } from '@/components/Chatbot';
import { SiteFooter } from '@/components/SiteFooter';
import { PageRail } from '@/components/PageRail';
import { PostCoverChrome } from '@/components/PostCoverChrome';
import { testimonials } from '@/data/testimonials';
import { SHOW_FLOATING_CHROME } from '@/lib/featureFlags';

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      {/* Current role and primary actions, followed by the editorial body. */}
      <HeroCover />

      <div className="mx-auto w-full max-w-[1200px] px-6 pb-12 pt-12 md:px-10 md:pb-14 md:pt-16 lg:px-12 lg:pt-20">
        <div className="lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[16rem_minmax(0,1fr)] xl:gap-16">
          <PageRail />
          <main className="min-w-0">
            <div id="about" className="scroll-mt-4 md:scroll-mt-10">
              <About />
            </div>
            <div id="experience" className="scroll-mt-4 md:scroll-mt-10">
              <ExperienceHomeList />
            </div>
            <div id="projects" className="scroll-mt-4 md:scroll-mt-10">
              <ProjectsHome />
            </div>
            <div id="testimonials" className="scroll-mt-4 md:scroll-mt-10">
              <Testimonials testimonials={testimonials} />
            </div>
            <div id="blog" className="scroll-mt-4 md:scroll-mt-10">
              <BlogHomeList />
            </div>
            {/* dead code — re-enable when GRAPHQL_TOKEN works */}
            {/* <GitHubActivity /> */}
            <div id="education" className="scroll-mt-4 md:scroll-mt-10">
              <Education />
            </div>
            <div id="skills" className="scroll-mt-4 md:scroll-mt-10">
              <Skills />
            </div>
            <div id="contact" className="scroll-mt-4 md:scroll-mt-10">
              <BookCall />
            </div>
          </main>
        </div>
      </div>

      <SiteFooter />

      {/* Floating chrome is gated — it only mounts once the cover has
          scrolled out of view, so the magazine first view stays clean. */}
      {SHOW_FLOATING_CHROME && (
        <PostCoverChrome>
          <AnimatedSocialLinks />
          <Chatbot />
        </PostCoverChrome>
      )}
    </div>
  );
}

export default Index;
