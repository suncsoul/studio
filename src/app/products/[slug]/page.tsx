import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Star } from "lucide-react";
import Image from "next/image"

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = {
    name: "Classic Denim Jacket",
    price: "$79.99",
    images: [
      { id: 1, src: "https://placehold.co/600x800.png", alt: "Denim jacket front", hint: "denim jacket" },
      { id: 2, src: "https://placehold.co/600x800.png", alt: "Denim jacket back", hint: "denim jacket back"  },
      { id: 3, src: "https://placehold.co/600x800.png", alt: "Denim jacket detail", hint: "denim jacket fabric"  },
    ],
    rating: 4,
    reviews: 117,
    description: "A timeless wardrobe staple, this classic denim jacket is crafted from premium, non-stretch denim. It features a button-front closure, chest patch pockets with button-flap closures, and welt side pockets. The versatile design makes it perfect for layering over your favorite outfits.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Blue", "Black", "Light Wash"],
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <Image
            src={product.images[0].src}
            alt={product.images[0].alt}
            width={600}
            height={800}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
            data-ai-hint={product.images[0].hint}
          />
          <div className="mt-4 grid grid-cols-3 gap-4">
            {product.images.slice(1).map(image => (
              <button key={image.id} className="rounded-lg overflow-hidden border-2 border-transparent hover:border-primary">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={200}
                  height={200}
                  className="w-full h-auto object-cover"
                  data-ai-hint={image.hint}
                />
              </button>
            ))}
          </div>
        </div>
        
        <div className="space-y-6">
          <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>

          <div className="flex items-center">
             <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-5 w-5 ${i < product.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
              ))}
            </div>
            <p className="ml-2 text-sm text-gray-500">{product.reviews} reviews</p>
          </div>

          <p className="text-3xl text-gray-900">{product.price}</p>
          
          <Separator />
          
          <p className="text-base text-gray-700">{product.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="size" className="font-semibold">Size</Label>
              <Select>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select a size" />
                </SelectTrigger>
                <SelectContent>
                  {product.sizes.map(size => (
                    <SelectItem key={size} value={size}>{size}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="font-semibold">Color</Label>
               <RadioGroup defaultValue={product.colors[0]} className="mt-3 flex gap-4">
                {product.colors.map(color => (
                  <Label key={color} htmlFor={`color-${color}`} className="cursor-pointer">
                    <RadioGroupItem value={color} id={`color-${color}`} className="sr-only"/>
                    <div className="px-4 py-2 rounded-md border-2 border-gray-200 data-[state=checked]:border-primary">{color}</div>
                  </Label>
                ))}
              </RadioGroup>
            </div>
          </div>

          <Button size="lg" className="w-full">Add to Cart</Button>
        </div>
      </div>
    </div>
  )
}
