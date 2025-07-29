"use client"
import BlurText from '@/TextAnimations/BlurText/BlurText';
import FlowingMenu from '@/components/FlowingMenu/FlowingMenu';


const demoItems = [
  { link: '#', text: 'Categories', image: 'https://picsum.photos/600/400?random=1' },
];
export default function HeroSection() {
  return (
    <section className="w-full flex flex-col items-center justify-center bg-transparent py-9">
      <BlurText
        text="Isn't this so cool?!"
        delay={150}
        animateBy="words"
        direction="top"
        // onAnimationComplete={handleAnimationComplete}
        className="text-2xl mb-8"
      />

      <div style={{ height: '100px', width:'100%', position: 'relative' }}>
        <FlowingMenu items={demoItems} />
      </div>
    </section>
  );
}
