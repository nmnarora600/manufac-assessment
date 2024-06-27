export interface CropData {
    Country: string;
    Year: string;
    "Crop Name": string;
    "Crop Production (UOM:t(Tonnes))": number;
    "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": number;
    "Area Under Cultivation (UOM:Ha(Hectares))": number;
  }
 export  interface rawData {
    Country: string;
    Year: string;
    "Crop Name": string;
    "Crop Production (UOM:t(Tonnes))": number | string;
    "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": number | string;
    "Area Under Cultivation (UOM:Ha(Hectares))": number | string;
  }

 export  interface YearlyCrops {
    maxProductionCrop: { cropName: string; production: number };
    minProductionCrop: { cropName: string; production: number };
  }