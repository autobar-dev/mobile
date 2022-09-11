import Station from "../../types/Station";

export default function stationQueryToStationObject(station: any): Station {
  const {
    id,
    name,
    description,
    location,
    createdAt,
    modules,
    owner,
  } = station;

  return {
    id,
    name,
    description,
    location: JSON.parse(location),
    createdAt: new Date(createdAt),
    modules,
    owner,
  };
}