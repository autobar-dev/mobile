import GeolocationCoordinates from "./GeolocationCoordinates";

type Station = {
  id: number;

  name: string;
  description: string;

  location: GeolocationCoordinates;

  createdAt: Date;

  modules: any[];
  owner: any;
};

export default Station;