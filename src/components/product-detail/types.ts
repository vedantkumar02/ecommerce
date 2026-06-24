import type { Product, Review } from "@/services/httpServices/types";

export type ProductDetailCardProps = {
  product: Product;
  backTo: string;
};

export type BackButtonProps = {
  to: string;
};

export type ProductImageSectionProps = {
  product: Product;
};

export type ProductImageGalleryProps = {
  src: string;
  alt: string;
  onLoad?: () => void;
  onError?: () => void;
};

export type ProductDetailsSectionProps = {
  product: Product;
};

export type ProductHeaderProps = {
  title: string;
  price: number;
  rating: number;
};

export type ProductMetaProps = {
  brand: string;
  category: string;
};

export type ProductDescriptionProps = {
  description: string;
};

export type ProductReviewsProps = {
  reviews: Review[];
};

export type ReviewItemProps = {
  review: Review;
};
