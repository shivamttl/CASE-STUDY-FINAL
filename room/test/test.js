const chai = require('chai');
const chaiHttp = require('chai-http');
const server=require("../room");
chai.should(); 
chai.use(chaiHttp);
describe('Get /room/read',()=>{
    it('it should get all data',(done)=>{
        chai.request(server)
        .get('/room/read')
        .end((err,response)=>{
            response.should.have.status(200);
            response.body.should.be.a('array');
            // response.body.length.should.be.eq(3);
        done();
        })
    });
    it("It should NOT GET all the tasks", (done) => {
        chai.request(server)
            .get("/room/reads")
            .end((err, response) => {
                response.should.have.status(404);
            done();
            });
    });


});
describe("GET /room/read/:id", () => {
    it("It should GET a task by ID", (done) => {
        const taskId = "60cba742b510e0236821e265";
        chai.request(server)                
            .get("/room/read/" + taskId)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('_id');
            done();
            });
    }),
    it("It should NOT GET a task by ID", (done) => {
        const taskId = "123559748";
        chai.request(server)                
            .get("/room/read/" + taskId)
            .end((err, response) => {
                response.should.have.status(404);
            done();
            });
    });

});
describe("POST /room/create", () => {
    it("It should POST a new task", (done) => {
        const task = {
            type: "Task",
            number: 20,
            rate: 500,
            size: 2,
            available: true
        };
        chai.request(server)                
            .post("/room/create")
            .send(task)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
            done();
            });
    });

    it("It should NOT POST a new task without the name property", (done) => {
        const task = {
            completed: false
        };
        chai.request(server)                
            .post("/create")
            .send(task)
            .end((err, response) => {
                response.should.have.status(404);
            done();
            });
    });
/**
     * Test the PUT route
     */
 describe("PUT /room/update/:name", () => {
    it("It should PUT an existing task", (done) => {
        const taskId = "60da11200a99343f0499f995";
        const task = {
            type: "Task",
            number: 20,
            rate: 500,
            size: 2,
            available: true
        };
        chai.request(server)                
            .put("/room/update/" + taskId)
            .send(task)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
            done();
            });
    });

    it("It should NOT PUT ", (done) => {
        const taskId = "602e7";
        const task = {
            type: "Task",
            number: 20,
            rate: 500,
            size: 2,
            available: true
        };;
        chai.request(server)                
            .put("/room/update/" + taskId)
            .send(task)
            .end((err, response) => {
                response.should.have.status(404);
            done();
            });
    });        
});



/**
 * Test the DELETE route
 */
describe("DELETE /room/delete/:id", () => {
    it("It should DELETE an existing task", (done) => {
        const taskId = "60d24630e962ea4bf8befe12";
        chai.request(server)                
            .delete("/room/delete/" + taskId)
            .end((err, response) => {
                response.should.have.status(200);
            done();
            });
    });

    it("It should NOT DELETE a task that is not in the database", (done) => {
        const taskId = "6009";
        chai.request(server)                
            .delete("/room/delet/" + taskId)
            .end((err, response) => {
                response.should.have.status(404);
            done();
            });
    });

});


});


