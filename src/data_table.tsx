import { Table } from "@mantine/core";
import type { YearlyCrops} from "../types";

type Props = {
  maxminCrops?: { [year: string]: YearlyCrops };
  averages?: { crop: string; averageYield: number; averageArea: number }[];
};

export default function DataTable({ maxminCrops, averages }: Props) {
  let rows;
  //table 1
  if (maxminCrops) {
    rows = Object.entries(maxminCrops).map(([year, yearlyCrops]) => (
      <Table.Tr key={year} className="rowpad">
        <Table.Td style={{ textAlign: "center" }} className="border">
          {year}
        </Table.Td>
        <Table.Td style={{ textAlign: "center" }} className="border">
          {yearlyCrops.maxProductionCrop.cropName}
        </Table.Td>
        <Table.Td style={{ textAlign: "center" }} className="border">
          {yearlyCrops.maxProductionCrop.production}
        </Table.Td>
        <Table.Td style={{ textAlign: "center" }} className="border">
          {yearlyCrops.minProductionCrop.cropName}
        </Table.Td>
        <Table.Td style={{ textAlign: "center" }} className="border">
          {yearlyCrops.minProductionCrop.production}
        </Table.Td>
      </Table.Tr>
    ));
  }

  //table 2
  if (averages) {
    rows = averages.map((year) => (
      <Table.Tr key={year.crop}>
        <Table.Td style={{ textAlign: "center" }} className="border">
          {year.crop}
        </Table.Td>
        <Table.Td style={{ textAlign: "center" }} className="border">
          {year.averageArea.toFixed(3)}
        </Table.Td>
        <Table.Td style={{ textAlign: "center" }} className="border">
          {year.averageYield.toFixed(3)}
        </Table.Td>
      </Table.Tr>
    ));
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }} className="scale">
        {/* table 1 title */}
      {maxminCrops && (
        <h2> Yearwise Maximum and Minimum Producing Crop (1950 - 2020)</h2>
      )}
        {/* table 2 title */}
      {averages && (
        <h2> Cropwise Average Yield and Cultivation Area (1950 - 2020)</h2>
      )}

      <Table striped highlightOnHover withTableBorder withColumnBorders>
        <Table.Thead>
      {/* table 1 header */}
          {maxminCrops && (
            <Table.Tr>
              <Table.Th
                className="border"
                style={{ paddingLeft: "5px", paddingRight: "5px" }}
              >
                Financial Year
              </Table.Th>
              <Table.Th
                className="border"
                style={{ paddingLeft: "5px", paddingRight: "5px" }}
              >
                Max Producing Crop
              </Table.Th>
              <Table.Th
                className="border"
                style={{ paddingLeft: "5px", paddingRight: "5px" }}
              >
                Count
              </Table.Th>
              <Table.Th
                className="border"
                style={{ paddingLeft: "5px", paddingRight: "5px" }}
              >
                Minimum Producing Crop
              </Table.Th>
              <Table.Th
                className="border"
                style={{ paddingLeft: "5px", paddingRight: "5px" }}
              >
                Count
              </Table.Th>
            </Table.Tr>
          )}
            {/* table 2 header */}
          {averages && (
            <Table.Tr>
              <Table.Th
                className="border"
                style={{ paddingLeft: "5px", paddingRight: "5px" }}
              >
                Crop Name
              </Table.Th>
              <Table.Th
                className="border"
                style={{ paddingLeft: "5px", paddingRight: "5px" }}
              >
                Average Area
              </Table.Th>
              <Table.Th
                className="border"
                style={{ paddingLeft: "5px", paddingRight: "5px" }}
              >
                Average Yield
              </Table.Th>
            </Table.Tr>
          )}
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  );
}
