// import provinces from 'china-division/dist/provinces.json';
// import cities from 'china-division/dist/cities.json';
// import areas from 'china-division/dist/areas.json';


// areas.forEach((area) => {
//   const matchCity = cities.filter(city => city.code === area.parent_code)[0];
//   if (matchCity) {
//     matchCity.children = matchCity.children || [];
//     matchCity.children.push({
//       label: area.name,
//       value: area.code,
//     });
//   }
// });

const cities = require('china-division/dist/cities.json');
const provinces = require('china-division/dist/provinces.json');

cities.forEach((city) => {
  const matchProvince = provinces.filter(province => province.code === city.parent_code)[0];
  if (matchProvince) {
    matchProvince.children = matchProvince.children || [];
    matchProvince.children.push({
      label: city.name,
      value: city.code,
      isLeaf: true,
    });
  }
});

const options = provinces.map(province => {
  if (province.code == 11 || province.code == 12 || province.code == 31 || province.code == 50 
    || province.code == 71 || province.code == 81 || province.code == 82) {
      //4个直辖市：北京、上海、重庆、天津，两个特区，一个台湾
    return {
      label: province.name,
      value: province.code,
      isLeaf: true
    }
  }
  return {
    label: province.name,
    value: province.code,
    children: province.children,
  }
});

export default options;
