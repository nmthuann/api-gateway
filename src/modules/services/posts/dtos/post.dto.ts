export class PackageDetailDto {
  revision: string;
  delivery_day: number;
  unit_price: number;
}

export class PackageDto {
  package_id: number;
  package_name: string;
  package_detail: PackageDetailDto;
}

export class PostDetailDto {
  profile_user: string;
  description: string;
  FAQ: string;
  packages: PackageDto[];
}

export class PostDto {
  post_id: number;
  post_name: string;
  category_detail_name: string;
  vote: number;
  post_detail: PostDetailDto;
}
