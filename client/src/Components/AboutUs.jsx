import Hero from "./DefaultLayout/Hero";
import Services from "./DefaultLayout/Services";
import PlaygroundDefault from "./DefaultLayout/PlaygroundDefault";

export default function AboutUs() {
  return (
    <div>
      <Hero />
      <Services />
      <PlaygroundDefault />
    </div>

    // <div className="AboutUs">
    //   <h1>OUR MISSION</h1>
    //   <h3>
    //     Our mission is to provide a seamless experience for any and all dog
    //     owners/lovers! We aim to provide all types of services and needs for
    //     everyone's favorite furry friends, as well as allow our community to
    //     engage with one another in ways they never had before in just one
    //     central location. Our Playground feature allows for many to set their
    //     own terms for how they want their pups to socailize especially for those
    //     more anxious pups that don't thrive in big dog parks and need some
    //     easing and adjusting. Set up events for your pup and invite others to
    //     join in on the fun! Share videos and pictures with your community of all
    //     the fun and silly things our furry friends get up to! Get all their
    //     needs from servicers that will tend to and care for your pups as much as
    //     you do and build strong bonds with the ones you feel adhered to your pups' needs the best!
    //   </h3>
    // </div>
  );
}
