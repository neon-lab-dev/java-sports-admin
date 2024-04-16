import Swal from "sweetalert2";
import * as XLSX from "xlsx";
export default function jsonToXlsx(data, name) {
  /**
   * Error handling
   */
  if (!Array.isArray(data)) return Swal.fire("Invalid data", "", "error");
  if (data.length === 0) return Swal.fire("No data to export", "", "warning");

  try {
    const dataToExport = data.map((obj) => {
      // convert every keys of object to string
      const keys = Object.keys(obj);
      const newObj = {};
      keys.forEach((key) => {
        const item = obj[key];
        if (typeof item === "string") {
          newObj[key] = item;
        } else if (typeof item === "object" || Array.isArray(item)) {
          newObj[key] = JSON.stringify(item);
        } else {
          newObj[key] = String(item);
        }
      });
      return newObj;
    });

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, `${name}.xlsx`);
  } catch (error) {
    console.error(error);
    Swal.fire("Error", "Something went wrong while exporting data", "error");
  }
}
