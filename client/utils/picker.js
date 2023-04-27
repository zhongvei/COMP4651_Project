import { exchangeRate } from "./converter";

export const chooseBestFlat = async ( flats, preference, setSelectedFlat ) => {

    const rate =  await exchangeRate('ethereum', 'hkd');

    preference.rentalPrice = preference.rentalPrice / rate;

    flats.forEach(flat => {
        let score = 0;
        if (preference.rentalPrice >= flat.price) {
            score += 1 + (preference.rentalPrice - flat.price) / preference.rentalPrice;
        }
        if (preference.propertyType === flat.flatInfo['propertyType']) {
            score += 1;
        }
        if (preference.location === flat.address) {
            score += 1;
        }
        if (preference.room <= flat.room) {
            score += 1 - (flat.room - preference.room) / flat.room;
        }
        if (preference.flatSize <= flat.area) {
            score += 1 - (flat.area - preference.flatSize) / flat.area;
        }
        if (preference.duration <= flat.duration) {
            score += 0.5 - (flat.duration - preference.duration) / flat.duration;
        }
        if (preference.furnished === flat.flatInfo['furnished']) {
            score += 1;
        }
        if (preference.buildingAge <= flat.flatInfo['buildingAge']) {
            score += 1 - (flat.flatInfo['buildingAge'] - preference.buildingAge) / preference.buildingAge;
        }
        if (preference.bathrooms >= flat.flatInfo['baths']) {
            score += 0.1;
        }
        if (preference.parking === flat.flatInfo['parking']) {
            score += 0.1;
        }
        if (preference.pets === flat.flatInfo['pets']) {
            score += 0.1;
        }
        flat.score = score;
    });
    flats.sort((a, b) => (a.score < b.score) ? 1 : -1);
    setSelectedFlat(flats[0]);
    return flats;
};
