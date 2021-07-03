const chai = require('chai');
const chaiHttp = require('chai-http');
const server=require("../staff")

chai.should(); 
chai.use(chaiHttp);

describe('Get /staff/read',()=>{
    it('it should get all data',(done)=>{
        chai.request(server)
        .get('/staff/read')
        .end((err,response)=>{
            response.should.have.status(200);
            response.body.should.be.a('array');
            // response.body.length.should.be.eq(3);
        done();
        })
    });
    it("It should NOT GET all the tasks", (done) => {
        chai.request(server)
            .get("/staff/reads")
            .end((err, response) => {
                response.should.have.status(404);
            done();
            });
    });


});
describe("GET /staff/read/:id", () => {
    it("It should GET a task by ID", (done) => {
        const taskId = "60cfa741b9cc9c42709cbd59";
        chai.request(server)                
            .get("/staff/read/" + taskId)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('_id');
                response.body.should.have.property('name');
            done();
            });
    }),
    it("It should NOT GET a task by ID", (done) => {
        const taskId = "12355984589748";
        chai.request(server)                
            .get("/staff/read/" + taskId)
            .end((err, response) => {
                response.should.have.status(404);
            done();
            });
    });

});
describe("POST /staff/create", () => {
    it("It should POST a new task", (done) => {
        const task = {
            name: "Task 4",
            empid: 20,
            designation: "owner",
            salary: 500,
            age: 50
        };
        chai.request(server)                
            .post("/staff/create")
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
 describe("PUT /staff/update/:name", () => {
    it("It should PUT an existing task", (done) => {
        const taskId = "60d246cb6d38af4e5809f2e5";
        const task = {
            name: "Task 5",
            empid: 20,
            designation: "owner",
             salary: 500,
             age: 50
        };
        chai.request(server)                
            .put("/staff/update/" + taskId)
            .send(task)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('_id').eq("60d246cb6d38af4e5809f2e5");
            done();
            });
    });

    it("It should NOT PUT ", (done) => {
        const taskId = "60d2e7";
        const task = {
            name: "Task 6",
            empid: 20,
            designation: "ownerddd",
             salary: 500,
             age: 50
        };
        chai.request(server)                
            .put("/staff/update/" + taskId)
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
describe("DELETE /staff/delete/:id", () => {
    it("It should DELETE an existing task", (done) => {
        const taskId = "60d24630e962ea4bf8befe12";
        chai.request(server)                
            .delete("/staff/delete/" + taskId)
            .end((err, response) => {
                response.should.have.status(200);
            done();
            });
    });

    it("It should NOT DELETE a task that is not in the database", (done) => {
        const taskId = "60d246cb09f2e9";
        chai.request(server)                
            .delete("/staff/delet/" + taskId)
            .end((err, response) => {
                response.should.have.status(404);
            done();
            });
    });

});


});


