import Image from "next/image";
import NA from "../../../../regionImages/NA.jpg";
import Alabama from "../../../../regionImages/Alabama.png";
import Alaska from "../../../../regionImages/Alaska.png";
import Arizona from "../../../../regionImages/Arizona.png";
import Arkansas from "../../../../regionImages/Arkansas.png";
import California from "../../../../regionImages/California.jpg";
import Colorado from "../../../../regionImages/Colorado.png";
import Connecticut from "../../../../regionImages/Connecticut.png";
import Delaware from "../../../../regionImages/Delaware.png";
import Florida from "../../../../regionImages/Florida.png";
import Georgia from "../../../../regionImages/Georgia.jpg";
import Hawaii from "../../../../regionImages/Hawaii.png";
import Idaho from "../../../../regionImages/Idaho.png";
import DC from "../../../../regionImages/DC.png";
import EU from "../../../../regionImages/EU.png";
import Illinois from "../../../../regionImages/Illinois.png";
import Indiana from "../../../../regionImages/Indiana.png";
import Iowa from "../../../../regionImages/Iowa.png";
import Kansas from "../../../../regionImages/Kansas.png";
import Kentucky from "../../../../regionImages/Kentucky.png";
import Louisiana from "../../../../regionImages/Louisiana.png";
import Maine from "../../../../regionImages/Maine.png";
import Maryland from "../../../../regionImages/Maryland.png";
import Massachusetts from "../../../../regionImages/Massachusetts.png";
import Michigan from "../../../../regionImages/Michigan.png";
import Minnesota from "../../../../regionImages/Minnesota.png";
import Mississippi from "../../../../regionImages/Mississippi.png";
import Missouri from "../../../../regionImages/Missouri.png";
import Montana from "../../../../regionImages/Montana.png";
import Nebraska from "../../../../regionImages/Nebraska.png";
import Nevada from "../../../../regionImages/Nevada.png";
import NewHampshire from "../../../../regionImages/New_Hampshire.png";
import NewJersey from "../../../../regionImages/New_Jersey.png";
import NewMexico from "../../../../regionImages/New_Mexico.png";
import NewYork from "../../../../regionImages/New_York.png";
import NorthCarolina from "../../../../regionImages/North_Carolina.png";
import NorthDakota from "../../../../regionImages/North_Dakota.png";
import Ohio from "../../../../regionImages/Ohio.png";
import Oklahoma from "../../../../regionImages/Oklahoma.png";
import Oregon from "../../../../regionImages/Oregon.png";
import Pennsylvania from "../../../../regionImages/Pennsylvania.png";
import RhodeIsland from "../../../../regionImages/Rhode_Island.png";
import SouthCarolina from "../../../../regionImages/South_Carolina.png";
import SouthDakota from "../../../../regionImages/South_Dakota.png";
import Tennessee from "../../../../regionImages/Tennessee.png";
import Texas from "../../../../regionImages/Texas.png";
import Utah from "../../../../regionImages/Utah.png";
import Vermont from "../../../../regionImages/Vermont.png";
import Virginia from "../../../../regionImages/Virginia.png";
import Washington from "../../../../regionImages/Washington.png";
import WestVirginia from "../../../../regionImages/West_Virginia.png";
import Wisconsin from "../../../../regionImages/Wisconsin.png";
import Wyoming from "../../../../regionImages/Wyoming.png";
import Alberta from "../../../../regionImages/Alberta.png";
import BritishColumbia from "../../../../regionImages/British_Columbia.png";
import Manitoba from "../../../../regionImages/Manitoba.png";
import NewBrunswick from "../../../../regionImages/New_Brunswick.png";
import NewfoundlandAndLabrador from "../../../../regionImages/Newfoundland_and_Labrador.png";
import Newfoundland from "../../../../regionImages/Newfoundland.png";
import NovaScotia from "../../../../regionImages/Nova_Scotia.png";
import Nunavut from "../../../../regionImages/Nunavut.png";
import Ontario from "../../../../regionImages/Ontario.png";
import PrinceEdwardIsland from "../../../../regionImages/Prince_Edward_Island.png";
import Quebec from "../../../../regionImages/Quebec.png";
import Saskatchewan from "../../../../regionImages/Saskatchewan.png";
import NorthwestTerritory from "../../../../regionImages/Northwest_Territory.png";
import Yukon from "../../../../regionImages/Yukon.png";

import Albania from "../../../../regionImages/Albania.png";
import Kazakhstan from "../../../../regionImages/Kazakhstan.png";
import Andorra from "../../../../regionImages/Andorra.png";
import Armenia from "../../../../regionImages/Armenia.png";
import Azerbaijan from "../../../../regionImages/Azerbaijan.png";
import Austria from "../../../../regionImages/Austria.png";
import Belgium from "../../../../regionImages/Belgium.png";
import Bulgaria from "../../../../regionImages/Bulgaria.png";
import BosniaandHerzegovina from "../../../../regionImages/Bosnia_and_Herzegovina.png";
import Belarus from "../../../../regionImages/Belarus.png";
import Switzerland from "../../../../regionImages/Switzerland.png";
import CzechRepublic from "../../../../regionImages/Czech_Republic.png";
import Germany from "../../../../regionImages/Germany.png";
import Denmark from "../../../../regionImages/Denmark.png";
import Estonia from "../../../../regionImages/Estonia.png";
import Finland from "../../../../regionImages/Finland.png";
import UnitedKingdom from "../../../../regionImages/United_Kingdom.png";
import GeorgiaCountry from "../../../../regionImages/GeorgiaCountry.png";
import Guernsey from "../../../../regionImages/Guernsey.png";
import Greece from "../../../../regionImages/Greece.png";
import Croatia from "../../../../regionImages/Croatia.png";
import Hungary from "../../../../regionImages/Hungary.png";
import Ireland from "../../../../regionImages/Ireland.png";
import Iceland from "../../../../regionImages/Iceland.png";
import Italy from "../../../../regionImages/Italy.png";
import Liechtenstein from "../../../../regionImages/Liechtenstein.png";
import Lithuania from "../../../../regionImages/Lithuania.png";
import Luxembourg from "../../../../regionImages/Luxembourg.png";
import Latvia from "../../../../regionImages/Latvia.png";
import Moldova from "../../../../regionImages/Moldova.png";
import Macedonia from "../../../../regionImages/Macedonia.png";
import Malta from "../../../../regionImages/Malta.png";
import Montenegro from "../../../../regionImages/Montenegro.png";
import Norway from "../../../../regionImages/Norway.png";
import Poland from "../../../../regionImages/Poland.png";
import Portugal from "../../../../regionImages/Portugal.png";
import Romania from "../../../../regionImages/Romania.png";
import Serbia from "../../../../regionImages/Serbia.png";
import Slovakia from "../../../../regionImages/Slovakia.png";
import Slovenia from "../../../../regionImages/Slovenia.png";
import Sweden from "../../../../regionImages/Sweden.png";
import Turkey from "../../../../regionImages/Turkey.png";
import Ukraine from "../../../../regionImages/Ukraine.png";
import Kosovo from "../../../../regionImages/Kosovo.png";
import Netherlands from "../../../../regionImages/Netherlands.png";
import Spain from "../../../../regionImages/Spain.png";
import France from "../../../../regionImages/France.png";
import Russia from "../../../../regionImages/Russia.png";
import Cyprus from "../../../../regionImages/Cyprus.png";
import VaticanCity from "../../../../regionImages/Vatican_City.png";
import Algeria from "../../../../regionImages/Algeria.png";

function findNAFlag(state: string) {
  switch (state) {
    case "NA":
      return NA;
    case "AL":
      return Alabama;
    case "AK":
      return Alaska;
    case "AZ":
      return Arizona;
    case "AR":
      return Arkansas;
    case "CA":
      return California;
    case "CO":
      return Colorado;
    case "CT":
      return Connecticut;
    case "DE":
      return Delaware;
    case "FL":
      return Florida;
    case "GA":
      return Georgia;
    case "HI":
      return Hawaii;
    case "DC":
      return DC;
    case "ID":
      return Idaho;
    case "IL":
      return Illinois;
    case "IN":
      return Indiana;
    case "IA":
      return Iowa;
    case "KS":
      return Kansas;
    case "KY":
      return Kentucky;
    case "LA":
      return Louisiana;
    case "ME":
      return Maine;
    case "MD":
      return Maryland;
    case "MA":
      return Massachusetts;
    case "MI":
      return Michigan;
    case "MN":
      return Minnesota;
    case "MS":
      return Mississippi;
    case "MO":
      return Missouri;
    case "MT":
      return Montana;
    case "NE":
      return Nebraska;
    case "NV":
      return Nevada;
    case "NH":
      return NewHampshire;
    case "NJ":
      return NewJersey;
    case "NM":
      return NewMexico;
    case "NY":
      return NewYork;
    case "NC":
      return NorthCarolina;
    case "ND":
      return NorthDakota;
    case "OH":
      return Ohio;
    case "OK":
      return Oklahoma;
    case "OR":
      return Oregon;
    case "PA":
      return Pennsylvania;
    case "RI":
      return RhodeIsland;
    case "SC":
      return SouthCarolina;
    case "SD":
      return SouthDakota;
    case "TN":
      return Tennessee;
    case "TX":
      return Texas;
    case "UT":
      return Utah;
    case "VT":
      return Vermont;
    case "VA":
      return Virginia;
    case "WA":
      return Washington;
    case "WV":
      return WestVirginia;
    case "WI":
      return Wisconsin;
    case "WY":
      return Wyoming;
    case "AB":
      return Alberta;
    case "BC":
      return BritishColumbia;
    case "MB":
      return Manitoba;
    case "NB":
      return NewBrunswick;
    case "NL":
      return NewfoundlandAndLabrador;
    case "NS":
      return NovaScotia;
    case "NT":
      return NorthwestTerritory;
    case "NU":
      return Nunavut;
    case "ON":
      return Ontario;
    case "PE":
      return PrinceEdwardIsland;
    case "QC":
      return Quebec;
    case "SK":
      return Saskatchewan;
    case "YT":
      return Yukon;
    case "NF":
      return Newfoundland;
    default:
      return NA;
  }
}

function findEUFlag(state: string) {
  switch (state) {
    case "EU":
      return EU;
    case "AL":
      return Albania;
    case "KZ":
      return Kazakhstan;
    case "AD":
      return Andorra;
    case "AM":
      return Armenia;
    case "AZ":
      return Azerbaijan;
    case "AT":
      return Austria;
    case "BE":
      return Belgium;
    case "BG":
      return Bulgaria;
    case "BA":
      return BosniaandHerzegovina;
    case "BY":
      return Belarus;
    case "CH":
      return Switzerland;
    case "CZ":
      return CzechRepublic;
    case "DE":
      return Germany;
    case "DK":
      return Denmark;
    case "EE":
      return Estonia;
    case "FI":
      return Finland;
    case "GB":
      return UnitedKingdom;
    case "GE":
      return Georgia;
    case "GR":
      return Greece;
    case "HR":
      return Croatia;
    case "HU":
      return Hungary;
    case "IE":
      return Ireland;
    case "IS":
      return Iceland;
    case "IT":
      return Italy;
    case "GE":
      return GeorgiaCountry;
    case "GG":
      return Guernsey;
    case "LI":
      return Liechtenstein;
    case "LT":
      return Lithuania;
    case "LU":
      return Luxembourg;
    case "LV":
      return Latvia;
    case "MD":
      return Moldova;
    case "MK":
      return Macedonia;
    case "MT":
      return Malta;
    case "ME":
      return Montenegro;
    case "NO":
      return Norway;
    case "PL":
      return Poland;
    case "PT":
      return Portugal;
    case "RO":
      return Romania;
    case "RS":
      return Serbia;
    case "SK":
      return Slovakia;
    case "SI":
      return Slovenia;
    case "SE":
      return Sweden;
    case "TR":
      return Turkey;
    case "UA":
      return Ukraine;
    case "KV":
      return Kosovo;
    case "NL":
      return Netherlands;
    case "ES":
      return Spain;
    case "FR":
      return France;
    case "RU":
      return Russia;
    case "CY":
      return Cyprus;
    case "VA":
      return VaticanCity;
    case "DZ":
      return Algeria;
    default:
      return EU;
  }
}

interface LocationIconProps {
  region: string;
  location: string;
}

const LocationIcon: React.FC<LocationIconProps> = ({ region, location }) => {
  return (
    <Image
      src={region === "NA" ? findNAFlag(location) : findEUFlag(location)}
      alt={location}
      height={50}
      width={70}
      unoptimized
      style={{ borderRadius: "5px" }}
    />
  );
};

export default LocationIcon;
