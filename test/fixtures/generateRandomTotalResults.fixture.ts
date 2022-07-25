import { faker } from '@faker-js/faker';

export function generateRandomTotalResults() {
  const randomAdCount = faker.datatype.number(100);
  const randomLinkCount = faker.datatype.number(100);
  const randomSearchCount = faker.datatype.number();

  return {
    total_ad_count: randomAdCount,
    total_link_count: randomLinkCount,
    total_search_results: `About ${randomSearchCount} results (0.1 seconds)`,
  };
}
