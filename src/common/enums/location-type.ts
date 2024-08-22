export enum LocationType {
  Cal = 'Cali',
  Bog = 'Bogotá',
  Med = 'Medellín',
}

export enum LocationTypeId {
  Cal = 'CAL',
  Bog = 'BOG',
  Med = 'MED',
}

export const GetLocationTypeId = (locationType: string): string => {
  switch (locationType) {
    case LocationType.Cal:
      return LocationTypeId.Cal;
    case LocationType.Bog:
      return LocationTypeId.Bog;
    case LocationType.Med:
      return LocationTypeId.Med;
    default:
      return locationType;
  }
};

export const GetLocationType = (locationType: string): LocationType => {
  switch (locationType) {
    case LocationTypeId.Cal:
      return LocationType.Cal;
    case LocationTypeId.Bog:
      return LocationType.Bog;
    case LocationTypeId.Med:
      return LocationType.Med;
    default:
      return LocationType.Cal;
  }
};
