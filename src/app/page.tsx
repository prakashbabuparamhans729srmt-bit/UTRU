import { generateBananaFact } from '@/ai/flows/generate-banana-fact';
import { suggestBananaRecipe, type SuggestBananaRecipeOutput } from '@/ai/flows/suggest-banana-recipe';
import { BananaFact } from '@/components/banana-fact';
import { BananaRecipe } from '@/components/banana-recipe';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Banana, AlertTriangle } from 'lucide-react';
import Image from 'next/image';

export default async function Home() {
  let initialFact: string;
  let initialRecipe: SuggestBananaRecipeOutput;

  const apiKey = process.env.GEMINI_API_KEY;
  const apiKeyMissing = !apiKey || apiKey === 'YOUR_API_KEY_HERE'

  if (apiKeyMissing) {
    initialFact = "Did you know? Bananas are berries, but strawberries aren't! Add your Gemini API key to the .env file to generate more fun facts.";
    initialRecipe = {
      recipeName: 'Classic Banana Bread',
      instructions: "To get a delicious AI-suggested recipe, please add your Gemini API key to the .env file. For now, here's a classic: Mash 3 ripe bananas, mix with 1/2 cup melted butter, 1 cup sugar, 1 egg, 1 tsp vanilla, 1 tsp baking soda, and 1 1/2 cups flour. Bake at 350°F (175°C) for 1 hour.",
    };
  } else {
    [initialFact, initialRecipe] = await Promise.all([
      generateBananaFact(),
      suggestBananaRecipe(),
    ]);
  }

  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-banana');

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <header className="p-4 sm:p-6 container mx-auto z-10">
        <div className="flex items-center gap-3">
          <Banana className="w-10 h-10 text-primary" />
          <h1 className="text-3xl font-bold font-headline tracking-tight">
            Banana Buddy
          </h1>
        </div>
      </header>

      <main className="flex-grow">
        <section className="relative w-full h-[40vh] md:h-[50vh] flex flex-col items-center justify-center text-center overflow-hidden bg-yellow-100/50">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              data-ai-hint={heroImage.imageHint}
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="relative z-10 p-4 flex flex-col items-center justify-end h-full w-full pb-10">
            <h2 className="text-4xl md:text-6xl font-extrabold text-white font-headline drop-shadow-lg">
              Go Bananas!
            </h2>
            <p className="mt-2 text-lg md:text-xl text-yellow-200 max-w-2xl mx-auto drop-shadow-md">
              Your daily dose of banana facts and fun recipes.
            </p>
          </div>
        </section>

        {apiKeyMissing && (
          <div className="container mx-auto px-4 mt-8">
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md" role="alert">
              <div className="flex">
                <div className="py-1"><AlertTriangle className="h-6 w-6 text-yellow-500 mr-4" /></div>
                <div>
                  <p className="font-bold">API Key Missing</p>
                  <p className="text-sm">Please add your Gemini API key to the <code>.env</code> file to enable AI-powered features.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-stretch">
              <BananaFact initialFact={initialFact} />
              <BananaRecipe initialRecipe={initialRecipe} />
            </div>
          </div>
        </section>
      </main>

      <footer className="py-6 px-4 sm:px-6 border-t bg-card">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>Powered by AI & Bananas &copy; {new Date().getFullYear()} Banana Buddy.</p>
        </div>
      </footer>
    </div>
  );
}
