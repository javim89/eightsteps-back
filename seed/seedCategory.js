import Category from "../models/Category.js";
import { categories } from "../utils/constants.js";

export default async function seedCategory() {
  const categoriesList = await Category.find();
  if (categoriesList.length === 0) {
    const historyCategory = new Category({
      name: categories.HISTORY,
      mainColor: "#FFD366",
    });
    await historyCategory.save();

    const cultureCategory = new Category({
      name: categories.CULTURE,
      mainColor: "#A6A64C",
    });
    await cultureCategory.save();

    const sportCategory = new Category({
      name: categories.SPORTS,
      mainColor: "#F88796",
    });
    await sportCategory.save();

    const geographyCategory = new Category({
      name: categories.GEOGRAPHY,
      mainColor: "#A0DB8E",
    });
    await geographyCategory.save();

    const technologyCategory = new Category({
      name: categories.TECHNOLOGY,
      mainColor: "#69D9F0",
    });
    await technologyCategory.save();

    const entertainmentCategory = new Category({
      name: categories.ENTERTAINMENT,
      mainColor: "#BC62F4",
    });
    await entertainmentCategory.save();

    const scienceCategory = new Category({
      name: categories.SCIENCE,
      mainColor: "#7C4C4C",
    });
    await scienceCategory.save();

    const winnerCategory = new Category({
      name: categories.WINNER,
      mainColor: "#52AFFC",
    });
    await winnerCategory.save();
  }
}
