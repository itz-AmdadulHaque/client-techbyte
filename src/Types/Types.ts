export type UserType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  district?: string;
  thana?: string;
  address?: string;
  isBlocked: boolean;
  isDeleted: boolean;
  role: string;
  image?: string;
  createdAt: Date;
};

export type Auth = {
  user: UserType | null;
  accessToken: string | null;
  isLoading: boolean;
};

export type SubCategory = {
  id: string;
  title: string;
  image: string;
  categoryId: number;
  category: CategoryType;
};

export type CategoryType = {
  id: string;
  title: string;
  image: string;
  isDeleted: boolean;
  isActive: boolean;
  createdById: string;
  updatedById: string;
  createdAt: string;
  updatedAt: string;
  createdBy: CategoryUser;
  updatedBy: CategoryUser;
  subCategories: SubCategory[];
};

export type CategoryUser = {
  id: string;
  firstName: string;
  lastName: string;
  image: string | null;
  email: string;
};



export type BannerType = {
  id: number;
  image: string;
  isActive: boolean;
  createdById: string;
  updatedById: string;
};

export type ProductImageType = {
  id: string;
  image: string;
}

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  categoryId: number;
  subCategoryId: number;
  category: CategoryType;
  subCategory: SubCategory;
  model: string;
  brand: string;
  images: ProductImageType[];
};

export type BreadcrumbItemType = {
  label: string;
  href?: string; // If not provided, it's the current page
};
