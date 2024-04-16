import { allFilters } from "../assets/data/productFilters";

const getFilters = (category, subcategory, subSubcategory) => {
  if (category !== "Gear") {
    const filters = allFilters.filter((item) => {
      if (item.category === category) {
        return true;
      }
      return false;
    });
    return filters.length === 1 ? filters[0].filters : [];
  }
  const filters = allFilters.filter((item) => {
    if (item.category === category) {
      if (subcategory) {
        if (item.subcategory === subcategory) {
          if (subSubcategory) {
            if (item.subSubcategory === subSubcategory) {
              return true;
            }
          } else {
            return true;
          }
        }
      } else {
        return true;
      }
    }
    return false;
  });
  return filters.length === 1 ? filters[0].filters : [];
};

export default getFilters;
