
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Leaf, Target, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-center text-white overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1920&q=80"
          alt="Team collaborating"
          fill
          className="absolute z-0 object-cover object-center"
          data-ai-hint="team collaboration fashion"
        />
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight !leading-tight">
            The Story Behind the Style
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-white/90">
            KOKIYUM was born from a passion for fashion that empowers and inspires. We believe that what you wear is a reflection of who you are.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative w-full aspect-w-4 aspect-h-3 rounded-lg overflow-hidden shadow-lg">
                <Image
                    src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80"
                    alt="Fashion model"
                    fill
                    className="object-cover"
                    data-ai-hint="fashion model portrait"
                />
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-muted-foreground text-lg mb-4">
                Founded in a small studio with a big dream, KOKIYUM started with a simple idea: to make trendy, high-quality fashion accessible to everyone. We noticed a gap between fleeting trends and timeless style, and we set out to bridge it.
              </p>
              <p className="text-muted-foreground text-lg">
                From hand-picking fabrics to designing unique collections, our journey has been driven by a love for craftsmanship and a desire to create pieces that you'll cherish. Today, we're proud to be a destination for fashion lovers who seek style, quality, and a story.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* What We Stand For Section */}
      <section className="bg-muted/50 py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-16">What We Stand For</h2>
            <div className="grid md:grid-cols-3 gap-12">
                <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-6">
                        <Leaf className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-4">Quality Craftsmanship</h3>
                    <p className="text-muted-foreground text-lg">
                        We are committed to creating high-quality garments that not only look great but also stand the test of time. Every stitch matters.
                    </p>
                </div>
                <div className="flex flex-col items-center">
                     <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-6">
                        <Target className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
                    <p className="text-muted-foreground text-lg">
                        Our mission is to empower individuals to express their unique style with confidence, by providing curated collections that blend modern trends with timeless elegance.
                    </p>
                </div>
                <div className="flex flex-col items-center">
                     <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-6">
                        <Heart className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-4">Customer-Centric</h3>
                    <p className="text-muted-foreground text-lg">
                        You are at the heart of everything we do. We strive to provide an exceptional shopping experience, from discovery to delivery.
                    </p>
                </div>
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold">Join the KOKIYUM Family</h2>
          <p className="text-muted-foreground mt-4 mb-8 max-w-xl mx-auto text-lg">
            Ready to tell your style story? Explore our latest collections and find pieces that speak to you.
          </p>
          <Button size="lg" asChild>
            <Link href="/#products">Shop Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
