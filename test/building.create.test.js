//inside building.create.test.js
const assert = require('assert');
const Building = require('../api/models/building.model');
describe('Creating documents', () => {
    before(done => {
        Building.findOneAndRemove({ buildingId: "RRRR"})
            .then(() => {
                done()
            })
    })
    it('สร้างตึก', (done) => {
        const building = new Building({ buildingId: "RRRR", buildingName: "ชื่อตึก" });
        building.save()
            .then(() => {
                assert(!building.isNew); //if poke is saved to db it is not new
                Building.remove(building)
                done();
            });
    });
});