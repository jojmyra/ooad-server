//inside building.read.test.js
const assert = require('assert');
const Building = require('../api/models/building.model');

describe(`ลบตึก`, () => {
    var building;


    beforeEach((done) => {
        building = new Building({
            buildingId: "nana",
            buildingName: "ตึกนะ"
        })
        building.save()
            .then(() => {
                done();
            })
    })

    it('ลบตึกโดยใช้ instance', (done) => {
        building.remove()
            .then(() => Building.findOne({
                buildingId: 'nana'
            }))
            .then((result) => {
                assert(result === null);
                done();
            });
    });

    it('ลบทุกตัวที่ชื่อรหัสตึก nana', (done) => {
        Building.remove({
                buildingId: 'nana'
            })
            .then(() => Building.findOne({
                buildingId: 'nana'
            }))
            .then((result) => {
                assert(result === null);
                done();
            });
    });

    it('หาและลบรหัสตึก nana', (done) => {
        Building.findOneAndRemove({
                buildingId: 'nana'
            })
            .then(() => Building.findOne({
                buildingId: 'nana'
            }))
            .then((result) => {
                assert(result === null);
                done();
            });
    });

})