export interface IArsenalDetails {
  uuid: string;
  displayName: string;
  category: string;
  defaultSkinUuid: string;
  displayIcon: string;
  killStreamIcon: string;
  assetPath: string;
  shopData: {
    cost: number;
    category: string;
    categoryText: string;
  } | null;
  skins: {
    uuid: string;
    contentTierUuid: string | null;
    displayName: string;
    displayIcon: string;
    levels: {
      uuid: string;
      displayName: string;
      displayIcon: string;
    }[];
  }[];
  weaponStats: {
    magazineSize: number;
    damageRanges:
      | {
          rangeStartMeters: number;
          rangeEndMeters: number;
          headDamage: number;
          bodyDamage: number;
          legDamage: number;
        }[];
  } | null;
}
