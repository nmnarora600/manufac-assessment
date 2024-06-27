import type {CropData, rawData, YearlyCrops} from "../types"



// convert empty strings to 0
export const convertRawData = (rawData: rawData[]): CropData[] => {
    return rawData.map((entry) => ({
      Country: entry.Country,
      Year: entry.Year,
      "Crop Name": entry["Crop Name"],
      "Crop Production (UOM:t(Tonnes))":
        entry["Crop Production (UOM:t(Tonnes))"] === ""
          ? 0
          : parseFloat(String(entry["Crop Production (UOM:t(Tonnes))"])),
      "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))":
        entry["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"] === ""
          ? 0
          : parseFloat(String(entry["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"])),
      "Area Under Cultivation (UOM:Ha(Hectares))":
        entry["Area Under Cultivation (UOM:Ha(Hectares))"] === ""
          ? 0
          : parseFloat(String(entry["Area Under Cultivation (UOM:Ha(Hectares))"])),
    }));
  };



  // getting maximum and minimum produced crops
  export const getMaxMinCropsByYear = (
    data: CropData[]
  ): { [year: string]: YearlyCrops } => {
    const dataByYear: {
      [key: string]: { cropName: string; production: number }[];
    } = {};

    data.forEach((entry) => {
      const year = entry.Year.slice(-4);
      const cropName = entry["Crop Name"];
      const production = entry["Crop Production (UOM:t(Tonnes))"];

      if (!dataByYear[year]) {
        dataByYear[year] = [];
      }

      dataByYear[year].push({ cropName, production });
    });

    const result: { [year: string]: YearlyCrops } = {};

    Object.keys(dataByYear).forEach((year) => {
      const crops = dataByYear[year];
      if (crops.length) {
        const maxCrop = crops.reduce(
          (max, crop) => (crop.production > max.production ? crop : max),
          crops[0]
        );
        const minCrop = crops.reduce(
          (min, crop) => (crop.production < min.production ? crop : min),
          crops[0]
        );

        result[year] = {
          maxProductionCrop: maxCrop,
          minProductionCrop: minCrop,
        };
      }
    });

    return result;
  };


// function to calculate average yield and cultivation of crops
  export const calculateAverages = (data: CropData[]): { crop: string, averageYield: number, averageArea: number }[] => {
    // Object to store accumulated totals and counts for each crop
    const cropStats: { [cropName: string]: { totalYield: number, totalArea: number, count: number } } = {};
  
    // Iterate through data to accumulate totals
    data.forEach(entry => {
      const cropName = entry["Crop Name"];
      const yieldPerHectare = entry["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"];
      const areaUnderCultivation = entry["Area Under Cultivation (UOM:Ha(Hectares))"];
  
      if (!cropStats[cropName]) {
        cropStats[cropName] = {
          totalYield: 0,
          totalArea: 0,
          count: 0
        };
      }
  
      // Accumulate total yield and area
      cropStats[cropName].totalYield += yieldPerHectare;
      cropStats[cropName].totalArea += areaUnderCultivation;
      cropStats[cropName].count++;
    });
  
    // Array to store results
    const averages: { crop: string, averageYield: number, averageArea: number }[] = [];
  
    // Calculate averages and push to result array
    Object.keys(cropStats).forEach(cropName => {
      const totalYield = cropStats[cropName].totalYield;
      const totalArea = cropStats[cropName].totalArea;
      const count = cropStats[cropName].count;
  
      const averageYield = count > 0 ? totalYield / count : 0;
      const averageArea = count > 0 ? totalArea / count : 0;
  
      averages.push({
        crop: cropName,
        averageYield: averageYield,
        averageArea: averageArea
      });
    });
  
    return averages;
  };

