import { Link } from 'react-router-dom';
import { ArrowLeft, Construction } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PlaceholderProps {
  title: string;
  description?: string;
}

export default function Placeholder({ title, description }: PlaceholderProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="bg-luxury-gold/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <Construction className="h-12 w-12 text-luxury-gold" />
        </div>
        
        <h1 className="text-3xl font-bold text-luxury-black mb-4">
          {title}
        </h1>
        
        <p className="text-gray-600 mb-8">
          {description || `The ${title.toLowerCase()} page is currently under construction. We're working hard to bring you an amazing experience.`}
        </p>
        
        <div className="space-y-4">
          <Button asChild className="bg-luxury-gold hover:bg-luxury-gold-light text-luxury-black">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          
          <p className="text-sm text-gray-500">
            Continue exploring our site or contact us if you need assistance.
          </p>
        </div>
      </div>
    </div>
  );
}
