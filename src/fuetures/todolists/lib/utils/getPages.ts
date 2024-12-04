export const getPages = (pagesCount: number) => {
  const paginationArray = [];
  for (let i = 1; i < pagesCount; i++) {
    paginationArray.push(i)
  }
  return paginationArray;
}
