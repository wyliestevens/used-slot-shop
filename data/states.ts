export type StateLegality = "allowed-all" | "age-restricted" | "class-ii-only" | "prohibited" | "restricted";

export type StateInfo = {
  slug: string;
  name: string;
  status: StateLegality;
  rule: string;
  minAge?: string;
  summary: string;
};

export const states: StateInfo[] = [
  { slug: "alabama", name: "Alabama", status: "class-ii-only", rule: "Class II machines only", summary: "Alabama permits Class II slot machines; Class III is prohibited for private ownership." },
  { slug: "alaska", name: "Alaska", status: "allowed-all", rule: "All types allowed", summary: "Alaska places no restrictions on private slot machine ownership." },
  { slug: "arizona", name: "Arizona", status: "allowed-all", rule: "All types allowed", summary: "Arizona permits private ownership of any slot machine, new or used." },
  { slug: "arkansas", name: "Arkansas", status: "allowed-all", rule: "All types allowed", summary: "Arkansas has no private-ownership restriction for slot machines." },
  { slug: "california", name: "California", status: "age-restricted", minAge: "25+ years old", rule: "Machines 25+ years old only", summary: "California allows slot ownership only if the machine is at least 25 years old." },
  { slug: "colorado", name: "Colorado", status: "age-restricted", minAge: "25+ years old", rule: "Machines 25+ years old only", summary: "Slot machines manufactured 25+ years ago may be privately owned in Colorado." },
  { slug: "connecticut", name: "Connecticut", status: "prohibited", rule: "Prohibited", summary: "Private ownership of slot machines is prohibited in Connecticut." },
  { slug: "delaware", name: "Delaware", status: "age-restricted", minAge: "25+ years old", rule: "Machines 25+ years old only", summary: "Delaware allows ownership of machines 25+ years old for home amusement." },
  { slug: "florida", name: "Florida", status: "age-restricted", minAge: "20+ years old", rule: "Machines 20+ years old only", summary: "Florida permits ownership of antique slot machines 20+ years old." },
  { slug: "georgia", name: "Georgia", status: "age-restricted", minAge: "25+ years old", rule: "Machines 25+ years old only", summary: "Georgia restricts slot ownership to antique machines 25+ years old." },
  { slug: "hawaii", name: "Hawaii", status: "prohibited", rule: "Prohibited", summary: "Hawaii prohibits private ownership of all slot machines." },
  { slug: "idaho", name: "Idaho", status: "age-restricted", minAge: "25+ years old", rule: "Machines 25+ years old only", summary: "Idaho allows antique slot machine ownership (25+ years)." },
  { slug: "illinois", name: "Illinois", status: "age-restricted", minAge: "25+ years old", rule: "Machines 25+ years old only", summary: "Illinois permits antique slot ownership with a 25-year rule." },
  { slug: "indiana", name: "Indiana", status: "prohibited", rule: "Prohibited", summary: "Private ownership of slot machines is prohibited in Indiana." },
  { slug: "iowa", name: "Iowa", status: "age-restricted", minAge: "25+ years old", rule: "Machines 25+ years old only", summary: "Iowa allows private ownership of antique slots 25+ years old." },
  { slug: "kansas", name: "Kansas", status: "age-restricted", minAge: "25+ years old", rule: "Machines 25+ years old only", summary: "Kansas limits ownership to antique machines 25+ years old." },
  { slug: "kentucky", name: "Kentucky", status: "allowed-all", rule: "All types allowed", summary: "Kentucky has no age restriction on slot machine ownership." },
  { slug: "louisiana", name: "Louisiana", status: "age-restricted", minAge: "25+ years old", rule: "Machines 25+ years old only", summary: "Louisiana allows antique slots 25+ years old only." },
  { slug: "maine", name: "Maine", status: "allowed-all", rule: "All types allowed", summary: "Maine places no restriction on private slot ownership." },
  { slug: "maryland", name: "Maryland", status: "restricted", rule: "Varies by county", summary: "Maryland rules vary by county — contact your local authority." },
  { slug: "massachusetts", name: "Massachusetts", status: "age-restricted", minAge: "30+ years old", rule: "Machines 30+ years old only", summary: "Massachusetts allows antique slots 30+ years old." },
  { slug: "michigan", name: "Michigan", status: "age-restricted", minAge: "25+ years old", rule: "Machines 25+ years old only", summary: "Michigan permits antique slot ownership (25-year rule)." },
  { slug: "minnesota", name: "Minnesota", status: "allowed-all", rule: "All types allowed", summary: "Minnesota places no age restriction on private slot ownership." },
  { slug: "mississippi", name: "Mississippi", status: "age-restricted", minAge: "25+ years old", rule: "Machines 25+ years old only", summary: "Mississippi limits ownership to antique machines 25+ years old." },
  { slug: "missouri", name: "Missouri", status: "age-restricted", minAge: "30+ years old", rule: "Machines 30+ years old only", summary: "Missouri allows antique slot ownership with a 30-year rule." },
  { slug: "montana", name: "Montana", status: "restricted", rule: "Licensed owners only", summary: "Private slot ownership in Montana generally requires a license." },
  { slug: "nebraska", name: "Nebraska", status: "prohibited", rule: "Prohibited", summary: "Nebraska prohibits private ownership of slot machines." },
  { slug: "nevada", name: "Nevada", status: "allowed-all", rule: "All types allowed", summary: "Nevada permits private ownership of all slot machine types." },
  { slug: "new-hampshire", name: "New Hampshire", status: "age-restricted", minAge: "25+ years old", rule: "Machines 25+ years old only", summary: "New Hampshire allows antique slots 25+ years old." },
  { slug: "new-jersey", name: "New Jersey", status: "age-restricted", minAge: "25+ years old", rule: "Machines 25+ years old only", summary: "New Jersey permits antique slot ownership (25-year rule)." },
  { slug: "new-mexico", name: "New Mexico", status: "prohibited", rule: "Prohibited", summary: "Private slot ownership is prohibited in New Mexico." },
  { slug: "new-york", name: "New York", status: "age-restricted", minAge: "30+ years old", rule: "Machines 30+ years old only", summary: "New York allows antique slots 30+ years old." },
  { slug: "north-carolina", name: "North Carolina", status: "age-restricted", minAge: "25+ years old", rule: "Machines 25+ years old only", summary: "North Carolina limits ownership to antique slots 25+ years old." },
  { slug: "north-dakota", name: "North Dakota", status: "age-restricted", minAge: "25+ years old", rule: "Machines 25+ years old only", summary: "North Dakota allows antique slot ownership (25-year rule)." },
  { slug: "ohio", name: "Ohio", status: "allowed-all", rule: "All types allowed", summary: "Ohio places no age restriction on private slot ownership." },
  { slug: "oklahoma", name: "Oklahoma", status: "age-restricted", minAge: "25+ years old", rule: "Machines 25+ years old only", summary: "Oklahoma permits antique slots 25+ years old." },
  { slug: "oregon", name: "Oregon", status: "age-restricted", minAge: "25+ years old", rule: "Machines 25+ years old only", summary: "Oregon allows antique slot ownership (25-year rule)." },
  { slug: "pennsylvania", name: "Pennsylvania", status: "age-restricted", minAge: "25+ years old", rule: "Machines 25+ years old only", summary: "Pennsylvania limits ownership to antique machines 25+ years old." },
  { slug: "rhode-island", name: "Rhode Island", status: "allowed-all", rule: "All types allowed", summary: "Rhode Island places no restriction on private slot ownership." },
  { slug: "south-carolina", name: "South Carolina", status: "prohibited", rule: "Prohibited", summary: "South Carolina prohibits private ownership of slot machines." },
  { slug: "south-dakota", name: "South Dakota", status: "age-restricted", minAge: "25+ years old", rule: "Machines 25+ years old only", summary: "South Dakota allows antique slot ownership (25-year rule)." },
  { slug: "tennessee", name: "Tennessee", status: "prohibited", rule: "Prohibited", summary: "Tennessee prohibits private ownership of slot machines." },
  { slug: "texas", name: "Texas", status: "allowed-all", rule: "All types allowed", summary: "Texas has no private-ownership age restriction on slot machines." },
  { slug: "utah", name: "Utah", status: "allowed-all", rule: "All types allowed", summary: "Utah places no restriction on private slot ownership." },
  { slug: "vermont", name: "Vermont", status: "age-restricted", minAge: "25+ years old", rule: "Machines 25+ years old only", summary: "Vermont permits antique slot ownership (25-year rule)." },
  { slug: "virginia", name: "Virginia", status: "allowed-all", rule: "All types allowed", summary: "Virginia places no age restriction on private slot ownership." },
  { slug: "washington", name: "Washington", status: "age-restricted", minAge: "25+ years old", rule: "Machines 25+ years old only", summary: "Washington allows antique slot ownership (25-year rule)." },
  { slug: "west-virginia", name: "West Virginia", status: "allowed-all", rule: "All types allowed", summary: "West Virginia places no restriction on private slot ownership." },
  { slug: "wisconsin", name: "Wisconsin", status: "prohibited", rule: "Prohibited", summary: "Wisconsin prohibits private ownership of slot machines." },
  { slug: "wyoming", name: "Wyoming", status: "age-restricted", minAge: "25+ years old", rule: "Machines 25+ years old only", summary: "Wyoming permits antique slot ownership (25-year rule)." },
];

export function getState(slug: string) {
  return states.find((s) => s.slug === slug);
}
