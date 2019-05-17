//inside building.read.test.js
const assert = require('assert');
const Building = require('../api/models/building.model');
let building;

describe('แก้ไขตึก', () => {
    beforeEach((done) => {
        building= new Building({ buildingId: "edit", buildingName: "ยังไม่ได้แก้" });
        building.save()
            .then(() => {
                done();
            })
    })

    function assertHelper(statement, done) {
        statement
         .then(() => Building.find({}))
         .then((building) => {
          assert(building.length === 1);
          assert(building[0].buildingName === 'แก้ไขแล้ว');
          done();
        });
      }

      it('ตั้งข้อมูล building ใหม่ และบันทึกลงด้วย instance', (done) => {
        building.set('buildingName', 'แก้ไขแล้ว'); 
        assertHelper(building.save(), done);
       });
     
      it('อัพเดทข้อมูลโดยใช้ instance', (done) => {
        // สำหรับถ้ามีชื่อซ้ำกันหลายๆอะ
        assertHelper(building.update({ buildingName: 'แก้ไขแล้ว' }), done);
      });
    
      it('อัพเดทข้อมูลทั้งหมดที่ตรงโดยใช้ model', (done) => {
        assertHelper(Building.update({ buildingName: 'ยังไม่ได้แก้' }, { buildingName: 'แก้ไขแล้ว' }), done);
      });
    
      it('อัพเดทข้อมูลที่เจอครั้งเดียวโดยใช้ model', (done) => {
        assertHelper(Building.findOneAndUpdate({ buildingName: 'ยังไม่ได้แก้' }, { buildingName: 'แก้ไขแล้ว' }), done);
      });
    
      it('อัพเดทข้อมูลโดยใช้ object id ของ mongodb', (done) => {
        assertHelper(Building.findByIdAndUpdate(building._id, { buildingName: 'แก้ไขแล้ว' }), done);
      });
});