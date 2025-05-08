
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type PromotionCardProps = {
  title: string;
  description: string;
  offer: string;
  validUntil: string;
  imageUrl: string;
};

const PromotionCard = ({
  title,
  description,
  offer,
  validUntil,
  imageUrl
}: PromotionCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div
        className="h-48 w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <CardHeader className="p-4">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="text-xs">{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="mb-2">
          <span className="font-bold text-airline-sky text-lg">{offer}</span>
        </div>
        <p className="text-sm text-gray-500">Valid until {validUntil}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button variant="outline" className="w-full">View Details</Button>
      </CardFooter>
    </Card>
  );
};

export default PromotionCard;
