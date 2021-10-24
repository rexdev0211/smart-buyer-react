export const getMetaTitle = (filters, t) => {
  let titleArr = [];

  let maxQty = 8;
  let minTags = 3;
  let tagsToSlice = Math.min(minTags, filters.tags.length);
  let brandsToSlice = Math.min(filters.brands.length, maxQty - tagsToSlice);

  if ((maxQty - tagsToSlice - brandsToSlice) > 0) {
    if (tagsToSlice < filters.tags.length) {
      tagsToSlice += Math.min(filters.tags.length, maxQty - brandsToSlice) - tagsToSlice;
    }
    if (brandsToSlice < filters.brands.length) {
      brandsToSlice += Math.min(filters.brands.length, maxQty - tagsToSlice) - brandsToSlice;
    }
  }

  if (brandsToSlice) {
    titleArr.push(filters.brands.slice(0, brandsToSlice).map(decodeURIComponent).join(', '));
  }
  if (tagsToSlice) {
    titleArr.push(filters.tags.slice(0, tagsToSlice).map(decodeURIComponent).join(', '));
  }

  if (filters.page > 1) {
    titleArr.push(`${t('Page')} ${filters.page}`)
  }

  titleArr.push('SmartBuyer');

  return titleArr.join(' | ')
}

export const getMetaDescription = (filters, t) => {
  let desc;
  if (filters.tags.length && !filters.brands.length) {
    desc = t('searchMetaDescriptionTag', { tags: filters.tags.join(', ') })
  }

  if (filters.brands.length && !filters.tags.length) {
    desc = t('searchMetaDescriptionBrand', { brands: filters.brands.join(', ') })
  }

  return desc || t('searchMetaDescriptionDefault');
}
