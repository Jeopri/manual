import MainSection from "@/app/pages/mainsection";
import BackgroundRippleEffectDemo from "@/app/pages/main"
import Tools from "@/app/pages/tools";
import ContactUs from "@/app/pages/contactus";
import Experience from "@/app/pages/experience";

export default function Home() {
  return (
    <>
    <BackgroundRippleEffectDemo />
      <MainSection />
      <Experience />
      <Tools />
      <ContactUs />
    </>
  ) 
  

}
