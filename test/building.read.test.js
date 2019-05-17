//inside building.read.test.js
const assert = require('assert');
const Building = require('../api/models/building.model');
let building;

describe('อ่านข้อมูลตึก', () => {
    beforeEach((done) => {
        building= new Building({ buildingId: "BBCZ", buildingName: "ตึกตึกโป๊ะ" });
        building.save()
            .then(() => {
                done();
            })
    })
    it('ค้นหาตึกด้วยรหัสตึก BBCZ ได้รหัสตึก BBCZ', (done) => {
        Building.findOne({ buildingId: "BBCZ"})
            .then((building) => {
                assert(building.buildingId == "BBCZ");
                done();
            })
    });
    it('ค้นหาตึกด้วยรหัสตึก BBCZ ได้ชื่อตึก ตึกตึกโป๊ะ', (done) => {
        Building.findOne({ buildingId: "BBCZ"})
            .then((building) => {
                assert(building.buildingName == "ตึกตึกโป๊ะ");
                done();
            })
    });
    it('ค้นหาตึกด้วยชื่อตึก ตึกตึกโป๊ะ ได้รหัสตึก BBCZ', (done) => {
        Building.findOne({ buildingName: "ตึกตึกโป๊ะ"})
            .then((building) => {
                assert(building.buildingId == "BBCZ");
                done();
            })
    });
    it('ค้นหาตึกด้วยรหัสตึก BBCZ ได้ชื่อตึก ตึกตึกโป๊ะ', (done) => {
        Building.findOne({ buildingName: "ตึกตึกโป๊ะ"})
            .then((building) => {
                assert(building.buildingName == "ตึกตึกโป๊ะ");
                done();
            })
    });

    after(done => {
        Building.findOneAndRemove({ buildingId: "BBCZ"})
            .then(() => done())
    })
});