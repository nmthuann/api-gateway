export class PackageDto {
  package_id: number;
  package_name: string;
  packageDetail: {
    revision: string;
    deliveryDay: Date;
    unit_price: number;
  };
}