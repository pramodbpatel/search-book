export interface IDepartures {
  gateWay: string;
  groupName: string;
  groupCode: string;
  destination?: IDestination[];
  countryName?: string;
  countryId?: string;
}

export interface IDestination {
  durations: string;
  destName?: string;
  destCode?: string;
}
