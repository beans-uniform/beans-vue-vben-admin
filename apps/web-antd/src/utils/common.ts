const cloneDeep = (obj: any) => {
  return structuredClone(obj);
  // return JSON.parse(JSON.stringify(obj));
};

export { cloneDeep };
