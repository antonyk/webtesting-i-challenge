module.exports = {
  succeed,
  fail,
  repair,
  get,
};

function succeed(item) {
  return {
    ...item,
    enhancement: item.enhancement < 20 ? item.enhancement+1 : item.enhancement
  }
}

function fail(item) {
  return {
    ...item,
    enhancement: item.enhancement > 16 ? item.enhancement-1 : item.enhancement,
    durability: item.enhancement > 14 ? Math.max(0, item.durability-10) : Math.max(0, item.durability-5)
  }
}

function repair(item) {
  return {...item, durability: 100};
}

function get(item) {
  return { ...item };
}
