import MainSection from "@/app/pages/mainsection";
import BackgroundRippleEffectDemo from "@/app/pages/main"
import Tools from "@/app/pages/tools";
import ContactUs from "@/app/pages/contactus";
import Experience from "@/app/pages/experience";
import ScrollSpy from "@/components/scroll-spy";

export default function Home() {
  return (
    <>
    <ScrollSpy />
    <BackgroundRippleEffectDemo />
      <MainSection />
      <Experience />
      <Tools />
      <ContactUs />
      <footer className="border-t border-border px-4 py-6 md:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-center text-xs text-muted-foreground gap-1">
          <span className="font-medium">Jeffrey Sedoro</span>
          <span>·</span>
          <span>{new Date().getFullYear()}</span>
        </div>
      </footer>
    </>
  ) 
  

}
