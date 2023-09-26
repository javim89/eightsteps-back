import Category from "../models/Category.js";

export default async function seedCategory() {
  const categories = await Category.find();
  if (categories.length === 0) {
    const historyCategory = new Category({
      name: "HISTORIA",
      mainColor: "#FFD366",
    });
    await historyCategory.save();

    const cultureCategory = new Category({
      name: "CULTURA",
      mainColor: "#A6A64C",
    });
    await cultureCategory.save();

    const sportCategory = new Category({
      name: "DEPORTES",
      mainColor: "#F88796",
    });
    await sportCategory.save();

    const geographyCategory = new Category({
      name: "GEOGRAFIA",
      mainColor: "#A0DB8E",
    });
    await geographyCategory.save();

    const technologyCategory = new Category({
      name: "TECNOLOGIA",
      mainColor: "#69D9F0",
    });
    await technologyCategory.save();

    const entertainmentCategory = new Category({
      name: "ENTRETENIMIENTO",
      mainColor: "#BC62F4",
    });
    await entertainmentCategory.save();

    const scienceCategory = new Category({
      name: "CIENCIA",
      mainColor: "#7C4C4C",
    });
    await scienceCategory.save();

    const winnerCategory = new Category({
      name: "GANADOR",
      mainColor: "#52AFFC",
    });
    await winnerCategory.save();
  }
}
